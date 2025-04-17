package com.capstoneproject.themeal.service;

import com.capstoneproject.themeal.model.request.OverbookingSettingsRequest;
import com.capstoneproject.themeal.model.request.ThresholdRuleRequest;
import com.capstoneproject.themeal.model.request.TimeSlotOverrideRequest;

public interface OverbookingService {
    public OverbookingSettingsRequest getSettings(Long restaurantId);

    public OverbookingSettingsRequest saveSettings(OverbookingSettingsRequest dto);

    public ThresholdRuleRequest addThreshold(ThresholdRuleRequest dto);

    public ThresholdRuleRequest updateThreshold(Long id, ThresholdRuleRequest dto);

    public TimeSlotOverrideRequest addOverride(TimeSlotOverrideRequest dto);

    public TimeSlotOverrideRequest updateOverride(Long id, TimeSlotOverrideRequest dto);

    public void deleteOverride(Long id);

    public void deleteThreshold(Long id);
}
