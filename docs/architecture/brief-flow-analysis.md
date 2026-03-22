# Phân Tích Luồng Brief v1

## 1. Tóm tắt mục tiêu
- Mục tiêu MVP: cho phép người dùng quét QR để check-in cảm xúc nhanh, không cần đăng nhập.
- Hệ thống phải cung cấp dashboard thống kê và export báo cáo.
- Vai trò chính: `Người dùng` (check-in) và `Admin` (quản trị điểm check-in, theo dõi dữ liệu).

## 2. Luồng nghiệp vụ chính

### 2.1 Public check-in flow
1. Người dùng quét QR tại điểm check-in.
2. Mở trang `public-checkin` với `pointCode` từ QR.
3. Hệ thống kiểm tra điểm check-in có đang hoạt động hay không (isActive + activeFrom/activeTo).
4. Người dùng chọn duy nhất 1 emotion zone.
5. Người dùng gửi check-in (note optional).
6. Hệ thống áp rule giới hạn 1 lần/ngày theo `checkin_point + client_hash`.
7. Trả kết quả thành công và điều hướng sang trang cảm ơn.

### 2.2 Admin flow
1. Admin tạo điểm check-in.
2. Hệ thống cấp `pointCode` và sinh QR URL.
3. Admin xem dashboard theo khoảng thời gian.
4. Admin xuất CSV báo cáo.

## 3. Rule mapping từ brief
- Rule chọn 1 cảm xúc: enforced bằng DTO + UI chỉ cho phép chọn một tile.
- Rule 1 lần/ngày: enforced ở backend qua bảng `emotion_checkins`.
- Không đăng nhập: API admin/public hiện không auth cho đúng phạm vi brief MVP.

## 4. KPI mapping
- KPI check-in/ngày: `dashboard.dailyTrend`.
- KPI tỷ lệ cảm xúc: `dashboard.emotions` (count + percentage).

## 5. Kiến trúc kỹ thuật đã chọn
- Backend: NestJS + TypeORM + MySQL.
- Frontend: Angular standalone + mobile-first SCSS.
- Deployment: Docker Compose (`app + mysql`), backend serve static GUI.

## 6. Rủi ro và hướng xử lý
- Không auth admin trong MVP: chỉ dùng môi trường nội bộ, có thể thêm Basic Auth/JWT ở phase 2.
- Rule 1 lần/ngày phụ thuộc fingerprint: hiện dùng `x-client-id` fallback IP + user-agent.
- Migrations chưa chi tiết: dùng `DB_SYNC=true` cho dev; phase sau thêm migration chuẩn.
