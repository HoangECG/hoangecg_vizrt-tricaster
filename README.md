# hoangecg: vizrt tricaster

Control a Vizrt TriCaster Vizion from Bitfocus Companion using LivePanel credentials. The module sends commands over HTTP and receives status notifications over WebSocket.

Requires Companion 4.1 or later. To install a packaged release, open **Modules → Import module package**, select the release’s `.tgz`, then add **hoangecg: vizrt tricaster** in **Connections**. Enter the address and LivePanel credentials of your switcher. [Configuration and supported controls](./companion/HELP.md)

To build from source with Node.js 22.12 or later in the 22.x series, run `corepack yarn install --immutable` and `corepack yarn package` in the repository root.

## Publishing

For a GitHub release, tag the tested commit `v1.0.0` and attach `hoangecg-vizrt-tricaster-1.0.0.tgz` to the release. For the first Companion listing, request a connection repository with the ID `hoangecg-vizrt-tricaster`. Once Bitfocus assigns the repository, push the source and tag there and submit the tag for review. [Bitfocus release guide](https://companion.free/for-developers/module-development/module-lifecycle/releasing-your-module/)

## Changelog

### v1.0.0

Initial release with LivePanel Digest and Basic authentication. The module ID is `hoangecg-vizrt-tricaster`.

## Development Documentation

- [Vizrt Automation, Integration & Control Guide](https://cms.vizrt.com/wp-content/uploads/2025/12/Automation-and-Integration-Guide.pdf)
