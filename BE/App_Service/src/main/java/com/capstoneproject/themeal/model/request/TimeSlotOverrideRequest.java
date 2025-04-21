package com.capstoneproject.themeal.model.request;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlotOverrideRequest {
    private Long id;
    private String start;
    private String end;
    private Integer maxExtra;
}
