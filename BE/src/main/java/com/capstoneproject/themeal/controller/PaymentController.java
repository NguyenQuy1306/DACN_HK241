package com.capstoneproject.themeal.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.payos.PayOS;
import vn.payos.type.CheckoutResponseData;
import vn.payos.type.ItemData;
import vn.payos.type.PaymentData;

import java.time.Instant;

@RestController
@RequestMapping("/api/payments")


public class PaymentController {
    private final PayOS payOS;

    public PaymentController() {
        String clientId = "c52168d1-0b63-47b4-ab92-09a6138f05b5";
        String apiKey = "265ad092-714c-4684-982f-7906eea50584";
        String checksumKey = "bdc07e1452e175a62a5f439e1640faf1103e2188545d16050dab43c73f65a070";
        this.payOS = new PayOS(clientId, apiKey, checksumKey);
    }

    @GetMapping("/create-payment-link")
    public ResponseEntity<?> createPaymentLink() {
        try {
            String domain = "http://localhost:3000"; // Đường dẫn FE
            Long orderCode = Instant.now().getEpochSecond(); // Mã đơn hàng

            ItemData itemData = ItemData.builder()
                    .name("Mỳ tôm Hảo Hảo ly")
                    .quantity(1)
                    .price(100000)
                    .build();

            PaymentData paymentData = PaymentData.builder()
                    .orderCode(orderCode)
                    .amount(100000)
                    .description("Thanh toán đơn hàng")
                    .returnUrl(domain + "/home") // Đường dẫn trả về
                    .cancelUrl(domain + "/cancel") // Đường dẫn hủy
                    .item(itemData)
                    .build();

            CheckoutResponseData result = payOS.createPaymentLink(paymentData);

            return ResponseEntity.ok(result.getCheckoutUrl()); // Trả về URL thanh toán
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi tạo liên kết thanh toán: " + e.getMessage());
        }
    }
}
