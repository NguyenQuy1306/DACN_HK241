package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.repository.OrderTableHasFoodRepository;
import com.capstoneproject.themeal.repository.OrderTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OrderTableRepository orderTableRepository;

    public void sendConfirmArrivalEmail(OrderTable orderTable) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String confirmLink = "http://localhost:8080/api/orders/" + orderTable.getMaSoDatBan() + "/confirm-arrival";
            String cancelLink = "http://localhost:8080/api/orders/" + orderTable.getMaSoDatBan() + "/cancel-arrival";

            String htmlContent = "<p>Bạn có chắc chắn sẽ đến nhà hàng lúc <b>" + orderTable.getGio() +
                    "</b> ngày <b>" + orderTable.getNgay() + "</b> không?</p>" +

                    "<a href=\"" + confirmLink + "\" " +
                    "style=\"display:inline-block; margin-right:10px; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;\">" +
                    "Tôi sẽ đến</a>" +

                    "<a href=\"" + cancelLink + "\" " +
                    "style=\"display:inline-block; padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 5px;\">" +
                    "Tôi muốn huỷ</a>";

            orderTable.setEmailConfirmSent(true);
            orderTableRepository.save(orderTable);
            helper.setTo(orderTable.getKhachHang().getEmail());
            helper.setSubject("Xác nhận đặt bàn");
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

            String confirmUrl = "http://localhost:8080/api/orders/refundByOwner/" + orderTable.getMaSoDatBan();
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


