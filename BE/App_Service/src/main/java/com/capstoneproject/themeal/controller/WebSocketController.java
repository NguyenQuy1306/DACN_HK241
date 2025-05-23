package com.capstoneproject.themeal.controller;

import com.capstoneproject.themeal.model.response.OrderTableResponse;
import com.capstoneproject.themeal.model.response.RestaurantInMapsResponse;
import com.capstoneproject.themeal.service.impl.OrderTableServiceImpl;
import com.capstoneproject.themeal.service.impl.RestaurantServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.List;

@Component
@Controller
public class WebSocketController {
    @Autowired
    private OrderTableServiceImpl orderTableService;
    @Autowired
    private RestaurantServiceImpl restaurantService;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public List<OrderTableResponse> handleUpdate(String message) {
        // Xử lý message và gửi lại cho tất cả các client đăng ký topic /topic/updates
        System.out.println(
                "-------------------------------------------------- Message nhận được từ Client -----------------------------------: "
                        + message);
        List<OrderTableResponse> orderTableResponses = orderTableService.getAllOrders();
        System.out.println("DANH SACH DAT BAN CHUAN BI TRA VE CLIENT: " + orderTableResponses);
        return orderTableResponses;
    }

    @MessageMapping("/updateRestaurant")
    @SendTo("/topic/restaurants")
    public List<RestaurantInMapsResponse> updateRestaurant(String message) {
        System.out.println(message);
        return restaurantService.getAll();
    }
}
