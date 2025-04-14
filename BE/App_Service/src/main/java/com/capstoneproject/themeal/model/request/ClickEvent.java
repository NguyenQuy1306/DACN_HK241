package com.capstoneproject.themeal.model.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClickEvent {
    private Long userId;
    private Long restaurantId;
    private String timestamp;
}
