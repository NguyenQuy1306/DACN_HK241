package com.capstoneproject.themeal.model.request;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ThresholdRuleRequest {
    private Long id;
    private Integer min;
    private Integer max;
    private String action;
}
