import { createHash, randomBytes } from 'node:crypto'

function parseDigestChallenge(header) {
	const scheme = /(?:^|,\s*)Digest\s+/i.exec(header)
	if (!scheme) return undefined

	const params = {}
	const valuePattern = /([a-z][a-z0-9_-]*)\s*=\s*("(?:\\.|[^"])*"|[^,\s]+)/gi
	const challenge = header.slice(scheme.index + scheme[0].length)

	for (const match of challenge.matchAll(valuePattern)) {
		const value = match[2]
		params[match[1].toLowerCase()] = value.startsWith('"') ? value.slice(1, -1).replace(/\\(.)/g, '$1') : value
	}

	return params
}

function quote(value) {
	return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

export function getDigestNonce(header) {
	return parseDigestChallenge(header)?.nonce
}

export function createBasicAuthorization(username, password) {
	return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
}

export function createDigestAuthorization(header, { username, password, method, url, nonceCount }) {
	const challenge = parseDigestChallenge(header)
	if (challenge?.realm === undefined || !challenge.nonce) return undefined

	const algorithm = (challenge.algorithm || 'MD5').toUpperCase()
	const hashName = algorithm.startsWith('SHA-256') ? 'sha256' : algorithm.startsWith('MD5') ? 'md5' : undefined
	if (!hashName || !['MD5', 'MD5-SESS', 'SHA-256', 'SHA-256-SESS'].includes(algorithm)) return undefined

	const qopOptions = challenge.qop?.split(',').map((value) => value.trim().toLowerCase())
	if (qopOptions?.length && !qopOptions.includes('auth')) return undefined

	const qop = qopOptions?.length ? 'auth' : undefined
	const count = Number(nonceCount) || 1
	const nc = count.toString(16).padStart(8, '0')
	const cnonce = randomBytes(16).toString('hex')
	const requestUrl = new URL(url)
	const uri = `${requestUrl.pathname || '/'}${requestUrl.search}`
	const hash = (value) => createHash(hashName).update(value).digest('hex')

	let ha1 = hash(`${username}:${challenge.realm}:${password}`)
	if (algorithm.endsWith('-SESS')) {
		ha1 = hash(`${ha1}:${challenge.nonce}:${cnonce}`)
	}

	const ha2 = hash(`${method}:${uri}`)
	const response = qop
		? hash(`${ha1}:${challenge.nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
		: hash(`${ha1}:${challenge.nonce}:${ha2}`)

	const fields = [
		`username=${quote(username)}`,
		`realm=${quote(challenge.realm)}`,
		`nonce=${quote(challenge.nonce)}`,
		`uri=${quote(uri)}`,
		`response=${quote(response)}`,
	]

	if (challenge.algorithm) fields.push(`algorithm=${challenge.algorithm}`)
	if (challenge.opaque) fields.push(`opaque=${quote(challenge.opaque)}`)
	if (qop) fields.push(`qop=${qop}`, `nc=${nc}`)
	if (qop || algorithm.endsWith('-SESS')) fields.push(`cnonce=${quote(cnonce)}`)

	return `Digest ${fields.join(', ')}`
}
