# BRIEF ĐẶC TẢ HỆ THỐNG

## Ứng dụng Check-in Cảm Xúc bằng QR (Không phân quyền người dùng)

---

## 1. Mục tiêu hệ thống

Xây dựng ứng dụng cho phép người dùng quét QR để check-in cảm xúc nhanh
chóng, đồng thời hệ thống tổng hợp và thống kê theo các vùng cảm xúc.

---

## 2. Phạm vi MVP

- Tạo điểm check-in và QR
- Người dùng quét QR và chọn cảm xúc
- Lưu dữ liệu check-in
- Dashboard thống kê
- Xuất báo cáo

---

## 3. Mô hình cảm xúc

- Màu Đỏ: Giận dữ / Áp lực
- Màu Xanh Dương: Bình yên / Tập trung
- Màu Vàng: Hào hứng
- Màu Xám: Mệt mỏi

---

## 4. User Flow

### Người dùng

1.  Quét QR
2.  Mở trang check-in
3.  Chọn cảm xúc
4.  Gửi
5.  Thành công

### Admin

1.  Tạo điểm check-in
2.  Sinh QR
3.  Xem dashboard
4.  Xuất báo cáo

---

## 5. Chức năng chính

### 5.1 Điểm check-in

- Tên
- QR link
- Thời gian hoạt động

### 5.2 Check-in

- Chọn 1 cảm xúc
- Ghi chú (optional)

### 5.3 Dashboard

- Tổng check-in
- \% từng cảm xúc
- Biểu đồ theo ngày

### 5.4 Báo cáo

- Xuất CSV / Excel

---

## 6. Quy tắc

- Mỗi lượt chỉ chọn 1 cảm xúc
- Có thể giới hạn 1 lần/ngày
- Không yêu cầu đăng nhập

---

## 7. Database (gợi ý)

### emotion_zones

- id, name, color

### checkin_points

- id, name, qr_url

### emotion_checkins

- id
- checkin_point_id
- emotion_zone_id
- note
- created_at

---

## 8. UI yêu cầu

- Mobile-first
- 1 chạm chọn cảm xúc
- Giao diện đơn giản

---

## 9. KPI

- Số lượt check-in/ngày
- Tỷ lệ từng vùng cảm xúc

---

## 10. Điều kiện nghiệm thu

- Quét QR → check-in thành công
- Dashboard hiển thị đúng dữ liệu
- Xuất được báo cáo

---

## 11. Lộ trình

- Phase 1: Check-in + dashboard
- Phase 2: báo cáo + filter
- Phase 3: nâng cao
