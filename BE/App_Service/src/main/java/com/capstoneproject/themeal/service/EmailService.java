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

            String link = "http://localhost:8080/api/orders/" + orderTable.getMaSoDatBan() + "/confirm-arrival";
            String htmlContent = "<p>Bạn có chắc chắn sẽ đến nhà hàng lúc <b>" + orderTable.getGio() +
                    "</b> ngày <b>" + orderTable.getNgay() + "</b> không?</p>" +
                    "<a href=\"" + link + "\" style=\"padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;\">Tôi sẽ đến</a>";
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
}

