# Ý Tưởng UX/UI - Emotion Check-in System

## 1. Design direction
- Phong cách: tối giản, thân thiện, giàu cảm xúc nhưng không nặng nề.
- Tone màu: nền giấy ấm (beige), điểm nhấn xanh ngọc + cam đất.
- Typography: `Sora` cho heading, `DM Sans` cho nội dung.

## 2. Luồng màn hình
1. `Public Check-in`: 1 chạm chọn cảm xúc, ghi chú optional, nút gửi rõ ràng.
2. `Thank You`: xác nhận hoàn thành nhanh.
3. `Dashboard`: card KPI + thanh tỷ lệ + trend theo ngày.
4. `Emotion Statistics`: bảng chi tiết tỷ lệ từng vùng cảm xúc.
5. `QR Management`: tạo điểm check-in, bật/tắt điểm, sinh QR preview.

## 3. UX principle
- Mobile-first: layout 1 cột ưu tiên thao tác ngón tay.
- One-tap action: emotion tile lớn, feedback selected rõ.
- Progressive disclosure: chỉ hiện thông tin nâng cao ở màn admin.
- Error clarity: lỗi API hiển thị text ngắn, dễ hiểu.

## 4. Accessibility baseline
- Tương phản màu đủ cao cho text chính.
- Vùng bấm nút lớn, border rõ.
- Form có label rõ ràng.

## 5. Component system
- `EmotionTile`: chọn cảm xúc.
- `StatCard`: card KPI.
- `Topbar`: điều hướng nhanh dashboard/admin.

## 6. Responsive behavior
- Desktop: dashboard chia card 2 cột.
- Mobile: tất cả về 1 cột, ưu tiên scroll dọc.
