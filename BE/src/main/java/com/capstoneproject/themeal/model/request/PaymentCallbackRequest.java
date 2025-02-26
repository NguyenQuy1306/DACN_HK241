package com.capstoneproject.themeal.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCallbackRequest {
    private String status;
    private Long orderCode;
}
