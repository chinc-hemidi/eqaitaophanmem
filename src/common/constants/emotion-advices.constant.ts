import { EmotionCode } from '@/common/enums/emotion-code.enum';

export const DEFAULT_EMOTION_ADVICES: Record<EmotionCode, string[]> = {
  [EmotionCode.RED]: [
    'Bạn đang mang nhiều áp lực. Thử dừng 2 phút, hít sâu 4 nhịp và thả lỏng vai nhé.',
    'Cảm giác bức bối là tín hiệu cơ thể cần nghỉ. Uống một ngụm nước và đi bộ ngắn sẽ giúp đầu óc nhẹ hơn.',
    'Không sao khi hôm nay hơi căng. Chia việc thành từng bước nhỏ để lấy lại nhịp.',
    'Bạn đang cố gắng rất nhiều rồi. Tạm rời màn hình một lát để reset năng lượng nhé.',
    'Nếu thấy nóng nảy, hãy viết nhanh điều làm bạn khó chịu rồi gạch bỏ nó để xả bớt áp lực.',
    'Ưu tiên 1 việc quan trọng nhất lúc này, các việc còn lại có thể để sau.',
    'Khi nhịp tim tăng nhanh, thử thở sâu 4-4-6 để cơ thể bình tĩnh lại.',
    'Bạn không cần hoàn hảo hôm nay. Chỉ cần hoàn thành từng phần một là đủ tốt.',
  ],
  [EmotionCode.BLUE]: [
    'Bạn đang ở trạng thái khá cân bằng. Duy trì một nhịp làm việc sâu để tận dụng sự tập trung này nhé.',
    'Bình yên là lợi thế lớn. Hãy ưu tiên việc quan trọng nhất khi năng lượng đang ổn định.',
    'Trạng thái điềm tĩnh của bạn rất quý. Một checklist ngắn sẽ giúp ngày làm việc trôi mượt hơn.',
    'Bạn đang làm tốt việc giữ nhịp. Tiếp tục từng bước nhỏ và đều để giữ sự nhẹ nhàng.',
    'Khoảng lặng hiện tại rất đẹp. Hãy dùng nó để hoàn thành một việc bạn đã trì hoãn.',
    'Bạn có thể chia sẻ sự bình tĩnh này cho người khác bằng một lời hỏi thăm nhẹ nhàng.',
    'Giữ nhịp chậm mà chắc sẽ giúp bạn đi xa hơn trong cả ngày hôm nay.',
    'Thêm 5 phút tổng kết giữa ngày sẽ giúp bạn giữ sự rõ ràng đến cuối buổi.',
  ],
  [EmotionCode.YELLOW]: [
    'Nguồn năng lượng tích cực của bạn rất đẹp. Hãy bắt đầu với việc khó nhất khi tinh thần đang cao.',
    'Sự hào hứng hôm nay là động lực tốt. Chia sẻ một điều tích cực với đồng đội nhé.',
    'Tâm trạng tốt giúp sáng tạo hơn. Ghi nhanh các ý tưởng đang xuất hiện để không bỏ lỡ.',
    'Bạn đang tràn năng lượng. Nhớ nghỉ ngắn giữa giờ để giữ phong độ đến cuối ngày.',
    'Năng lượng rực rỡ của bạn có thể truyền cảm hứng cho cả nhóm xung quanh.',
    'Hãy tận dụng cảm xúc tốt này để làm một việc bạn muốn bứt phá.',
    'Một bản nhạc yêu thích lúc này có thể giúp bạn giữ đà tích cực lâu hơn.',
    'Đừng quên tự ghi nhận mình: hôm nay bạn đang làm rất tốt.',
  ],
  [EmotionCode.GRAY]: [
    'Cảm giác mệt là bình thường. Cho bản thân một khoảng nghỉ ngắn và thở chậm lại nhé.',
    'Hôm nay có thể hơi nặng nề. Bắt đầu bằng một việc thật nhỏ để lấy lại đà.',
    'Bạn không cần cố quá trong một lúc. Làm từng phần nhỏ cũng đã là tiến bộ rồi.',
    'Khi năng lượng thấp, ưu tiên việc quan trọng và bỏ bớt việc phụ để nhẹ đầu hơn.',
    'Một ly nước ấm và vài phút rời màn hình có thể giúp cơ thể phục hồi nhanh hơn.',
    'Nếu thấy quá tải, hãy nói “để mình xử lý sau” với những việc chưa gấp.',
    'Bạn đã đi qua nhiều ngày khó hơn thế này. Hôm nay cũng sẽ ổn dần thôi.',
    'Nghỉ ngắn không phải chậm lại, đó là cách để bạn bền hơn.',
  ],
};
