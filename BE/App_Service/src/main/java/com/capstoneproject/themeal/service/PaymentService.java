package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.entity.OrderTable;
import com.capstoneproject.themeal.model.request.CreateOrderRequest;
import com.capstoneproject.themeal.model.request.PaymentCallbackRequest;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

public interface PaymentService {

    ObjectNode createPaymentLink(Integer deposit, CreateOrderRequest request, String returnUrl,
                                 Boolean isRefund, OrderTable orderTable);

    ObjectNode getOrderById(Long orderId);

    ObjectNode cancelOrder(int orderId);

    ObjectNode confirmWebhook(Map<String, String> requestBody);

    boolean processPaymentCallback(PaymentCallbackRequest callbackRequest);

    public void sendOrderEvent(Long orderId, Double distanceKm);

    public void updateOrderStatusAfterPayment(Long orderId, boolean isSuccess, String paymentCode);


}