package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.repository.OrderTableHasFoodRepository;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {
    @Value("${url.server.app}")
    private String urlServerApp;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private OrderTableRepository orderTableRepository;

    public void sendConfirmArrivalEmail(OrderTable orderTable) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String confirmLink = urlServerApp + "/api/orders/" + orderTable.getMaSoDatBan() + "/confirm-arrival";
            String cancelLink = urlServerApp + "/api/orders/" + orderTable.getMaSoDatBan() + "/cancel-arrival";
            String restaurantName = orderTable.getNhaHang().getTen() != null ? orderTable.getNhaHang().getTen() : "Nhà hàng";
            String customerName = orderTable.getKhachHang().getHoTen() != null ? orderTable.getKhachHang().getHoTen() : "Quý khách";

            String htmlContent = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "    <meta charset=\"utf-8\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Xác nhận đặt bàn</title>\n" +
                    "    <style>\n" +
                    "        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }\n" +
                    "        .container { max-width: 600px; margin: 0 auto; padding: 20px; }\n" +
                    "        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }\n" +
                    "        .logo { font-size: 24px; font-weight: bold; color: #d35400; }\n" +
                    "        .content { background-color: #ffffff; padding: 30px; border-left: 1px solid #e9ecef; border-right: 1px solid #e9ecef; }\n" +
                    "        .reservation-details { background-color: #f8f9fa; border-radius: 8px; padding: 15px; margin: 20px 0; }\n" +
                    "        .reservation-item { margin-bottom: 10px; }\n" +
                    "        .label { font-weight: bold; color: #495057; }\n" +
                    "        .value { color: #212529; }\n" +
                    "        .buttons { text-align: center; margin: 25px 0; }\n" +
                    "        .btn { display: inline-block; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px; transition: all 0.3s; }\n" +
                    "        .btn-confirm { background-color: #2ecc71; color: white; }\n" +
                    "        .btn-confirm:hover { background-color: #27ae60; }\n" +
                    "        .btn-cancel { background-color: #e74c3c; color: white; }\n" +
                    "        .btn-cancel:hover { background-color: #c0392b; }\n" +
                    "        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d; border-radius: 0 0 8px 8px; }\n" +
                    "        .note { font-style: italic; font-size: 14px; color: #6c757d; margin-top: 20px; }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "        <div class=\"header\">\n" +
                    "            <div class=\"logo\">TheMeal</div>\n" +
                    "        </div>\n" +
                    "        <div class=\"content\">\n" +
                    "            <h2>Xin chào " + customerName + ",</h2>\n" +
                    "            <p>Cảm ơn bạn đã đặt bàn tại " + restaurantName + ". Chúng tôi rất mong được đón tiếp bạn.</p>\n" +
                    "            \n" +
                    "            <div class=\"reservation-details\">\n" +
                    "                <div class=\"reservation-item\">\n" +
                    "                    <span class=\"label\">Ngày:</span>\n" +
                    "                    <span class=\"value\">" + orderTable.getNgay() + "</span>\n" +
                    "                </div>\n" +
                    "                <div class=\"reservation-item\">\n" +
                    "                    <span class=\"label\">Giờ:</span>\n" +
                    "                    <span class=\"value\">" + orderTable.getGio() + "</span>\n" +
                    "                </div>\n" +
                    "                <div class=\"reservation-item\">\n" +
                    "                    <span class=\"label\">Số khách:</span>\n" +
                    "                    <span class=\"value\">" + orderTable.getSoKhach() + " người</span>\n" +
                    "                </div>\n" +
                    "                <div class=\"reservation-item\">\n" +
                    "                    <span class=\"label\">Mã đặt bàn:</span>\n" +
                    "                    <span class=\"value\">" + orderTable.getMaSoDatBan() + "</span>\n" +
                    "                </div>\n" +
                    "            </div>\n" +
                    "            \n" +
                    "            <p>Vui lòng xác nhận rằng bạn sẽ đến nhà hàng vào thời gian đã đặt:</p>\n" +
                    "            \n" +
                    "            <div class=\"buttons\">\n" +
                    "                <a href=\"" + confirmLink + "\" class=\"btn btn-confirm\">Tôi sẽ đến</a>\n" +
                    "                <a href=\"" + cancelLink + "\" class=\"btn btn-cancel\">Tôi muốn huỷ</a>\n" +
                    "            </div>\n" +
                    "            \n" +
                    "            <p class=\"note\">Lưu ý: Nếu bạn không thể đến, vui lòng huỷ đặt bàn ít nhất 1 giờ trước thời gian đã đặt để nhà hàng có thể sắp xếp cho khách hàng khác.</p>\n" +
                    "        </div>\n" +
                    "        <div class=\"footer\">\n" +
                    "            <p>© 2025 TheMeal. Tất cả các quyền được bảo lưu.</p>\n" +
                    "            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại của nhà hàng.</p>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "</html>";

            orderTable.setEmailConfirmSent(true);
            orderTableRepository.save(orderTable);
            helper.setTo(orderTable.getKhachHang().getEmail());
            helper.setSubject("[Xác nhận đặt bàn] - " + restaurantName);
            helper.setText(htmlContent, true); // true = is HTML

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public void sendRefundEmail(OrderTable orderTable) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String confirmUrl = urlServerApp + "/api/orders/refundByOwner/" + orderTable.getMaSoDatBan();
            String ownerName = orderTable.getNhaHang().getChuNhaHang().getHoTen();
            String customerName = orderTable.getKhachHang().getHoTen();
            String reservationDate = orderTable.getNgay().toString(); // format nếu cần
            String reservationTime = orderTable.getGio().toString(); // format nếu cần
            String numberOfGuests = String.valueOf(orderTable.getSoKhach());
            String note = orderTable.getDanhSachDonDatBanCoMonAn().isEmpty() ? "Không có ghi chú." : "Đặt món ăn trước"; // hoặc lấy từ chỗ khác nếu có

            String htmlContent =
                    "<p>Xin chào <b>" + ownerName + "</b>,</p>\n" +
                            "<p>Bạn vừa nhận được một đơn đặt bàn mới từ hệ thống <b>The Meal</b>.</p>\n" +
                            "<h3>📌 Thông tin đơn hàng:</h3>\n" +
                            "<ul>\n" +
                            "  <li><b>Khách hàng:</b> " + customerName + "</li>\n" +
                            "  <li><b>Ngày:</b> " + reservationDate + "</li>\n" +
                            "  <li><b>Giờ:</b> " + reservationTime + "</li>\n" +
                            "  <li><b>Số lượng khách:</b> " + numberOfGuests + "</li>\n" +
//                            "  <li><b>Số tiền cần hoàn trả:</b> " + numberOfGuests + "</li>\n"
                            "  <li><b>Ghi chú:</b> " + note + "</li>\n" +
                            "</ul>\n" +
                            "<hr />\n" +
                            "<h4>⚠️ Hành động cần thiết:</h4>\n" +
                            "<p>\n" +
                            "  Vui lòng xác nhận đơn đặt này trên hệ thống nếu khách hàng đến nhà hàng đúng giờ.<br />\n" +
                            "  Nếu khách <b>không đến</b> hoặc <b>muốn huỷ</b>, bạn cũng có thể cập nhật trạng thái thủ công tại trang quản lý của bạn.\n" +
                            "</p>\n" +
                            "<p>\n" +
                            "  👉 <a href=\"" + confirmUrl + "\" style=\"background-color: #007bff; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;\">Hoàn tiền cho khách hàng</a>\n" +
                            "</p>\n" +
                            "<p style=\"font-style: italic; color: gray;\">\n" +
                            "  (Email được gửi tự động từ hệ thống The Meal – vui lòng không trả lời lại email này)\n" +
                            "</p>";

            helper.setTo(orderTable.getNhaHang().getChuNhaHang().getEmail());
            helper.setSubject("[Thông báo] Bạn có đơn hàng cần hoàn tiền cho khách hàng");
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}


