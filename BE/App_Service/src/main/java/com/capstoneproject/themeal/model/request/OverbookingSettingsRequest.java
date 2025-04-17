package com.capstoneproject.themeal.model.request;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OverbookingSettingsRequest {
    private Long id;
    private Boolean enabled;
    private List<ThresholdRuleRequest> thresholds;
    private List<TimeSlotOverrideRequest> overrides;
}
