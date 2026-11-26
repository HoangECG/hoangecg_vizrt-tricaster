# hoangecg: vizrt tricaster

### Setup

In Companion 4.1 or later, enter the TriCaster's address, LivePanel username and password. Select **Digest** for both command requests and status notifications. HTTP and WebSocket both default to port 80. If commands work but tally stays stale, check which WebSocket port your firmware uses. Enable **DataLink Variables** if you need those values in Companion.

Module điều khiển TriCaster Vizion qua REST API và theo dõi thay đổi qua WebSocket. Bản local này hỗ trợ LivePanel Password.

### Cấu hình

- Nhập IP hoặc hostname của TriCaster.
- HTTP API Port mặc định `80`.
- WebSocket Port mặc định `80`. Nếu REST đã kết nối nhưng không nhận cập nhật trạng thái, thử `5951`.
- Nhập LivePanel Username và Password. Username mặc định là `admin`; password được giữ trong trường bí mật của Companion.
- Giữ Authentication Type là `Digest` (khuyến nghị). Chọn `Basic` hoặc `None` chỉ khi cấu hình thiết bị cần.
- Để nhận variables từ DataLink, bật **DataLink Variables**.

Không cần tắt LivePanel Password trên TriCaster. Module yêu cầu Companion 4.1 trở lên (Module API 1.13).

### Actions, Feedbacks, Variables và Presets

- Actions: Take, Auto transition, chọn nguồn Preview/Program/M/E/DSK, điều khiển media, macros, record, stream, mix output, DataLink và custom shortcuts.
- Feedbacks: tally Program/Preview, media playing, recording, streaming và DSK on-air.
- Variables: thông tin sản phẩm/phiên, nguồn Program/Preview, trạng thái recording/streaming và DataLink.
- Presets: chọn nguồn PGM/PVW/M/E, Take, Auto, Record Toggle và Streaming.
