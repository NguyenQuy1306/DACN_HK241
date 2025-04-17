package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.OverbookingSettings;
import com.capstoneproject.themeal.model.entity.Restaurant;
import com.capstoneproject.themeal.model.entity.ThresholdRule;
import com.capstoneproject.themeal.model.entity.TimeSlotOverride;
import com.capstoneproject.themeal.model.request.OverbookingSettingsRequest;
import com.capstoneproject.themeal.model.request.ThresholdRuleRequest;
import com.capstoneproject.themeal.model.request.TimeSlotOverrideRequest;
import com.capstoneproject.themeal.repository.OverbookingSettingsRepository;
import com.capstoneproject.themeal.repository.RestaurantRepository;
import com.capstoneproject.themeal.repository.ThresholdRuleRepository;
import com.capstoneproject.themeal.repository.TimeSlotOverrideRepository;
import com.capstoneproject.themeal.service.OverbookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OverBookingsServiceImpl implements OverbookingService {

    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @Autowired
    private OverbookingSettingsRepository settingsRepository;

    @Autowired
    private ThresholdRuleRepository thresholdRepository;

    @Autowired
    private TimeSlotOverrideRepository overrideRepository;
    @Autowired
    private OverbookingSettingsRepository overbookingSettingsRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;

    public OverbookingSettingsRequest getSettings(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() ->
                new NotFoundException("Restaurant not found"));
        OverbookingSettings settings = overbookingSettingsRepository.findByRestaurantId(restaurantId);
        if (settings == null) {
            settings = new OverbookingSettings();
            settings.setRestaurant(restaurant);
            settings.setEnabled(false);
            settings.setCreatedAt(LocalDateTime.now());
            settings.setUpdatedAt(LocalDateTime.now());
        }

        settings = settingsRepository.save(settings);

        return mapToDto(settings);
    }

    @Transactional
    public OverbookingSettingsRequest saveSettings(OverbookingSettingsRequest dto) {
        // Validate thresholds
        validateThresholds(dto.getThresholds());

        // Validate time slot overrides
        validateTimeSlotOverrides(dto.getOverrides());

        // Get or create settings
        OverbookingSettings settings = overbookingSettingsRepository.findById(dto.getId()).orElseThrow(() -> new NotFoundException("Overbooking settings not found"));
        settings.setEnabled(dto.getEnabled());
        settings = settingsRepository.save(settings);

//        // Clear existing and save new thresholds
//        thresholdRepository.deleteBySettingsId(settings.getId());
//        saveThresholds(dto.getThresholds(), settings);
//
//        // Clear existing and save new overrides
//        overrideRepository.deleteBySettingsId(settings.getId());
//        saveOverrides(dto.getOverrides(), settings);

        return mapToDto(settings);
    }

    @Transactional
    public ThresholdRuleRequest addThreshold(ThresholdRuleRequest dto) {
        validateThreshold(dto);

        OverbookingSettings settings = overbookingSettingsRepository.findById(dto.getId()).orElseThrow(() -> new NotFoundException("OverbookingSettings not found"));


        ThresholdRule rule = new ThresholdRule();
        rule.setMin(dto.getMin());
        rule.setMax(dto.getMax());
        rule.setAction(dto.getAction());
        rule.setSettings(settings);

        rule = thresholdRepository.save(rule);
        return mapToDto(rule);
    }

    @Transactional
    public ThresholdRuleRequest updateThreshold(Long id, ThresholdRuleRequest dto) {
        validateThreshold(dto);

        ThresholdRule rule = thresholdRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Threshold not found"));

        rule.setMin(dto.getMin());
        rule.setMax(dto.getMax());
        rule.setAction(dto.getAction());

        rule = thresholdRepository.save(rule);
        return mapToDto(rule);
    }

    @Transactional
    public void deleteThreshold(Long id) {
        thresholdRepository.deleteById(id);
    }

    @Transactional
    public TimeSlotOverrideRequest addOverride(TimeSlotOverrideRequest dto) {
        validateTimeSlotOverride(dto);

        OverbookingSettings settings = overbookingSettingsRepository.findById(dto.getId()).orElseThrow(() -> new NotFoundException("OverbookingSettings not found"));

        TimeSlotOverride override = new TimeSlotOverride();
        override.setStart(LocalTime.parse(dto.getStart(), TIME_FORMATTER));
        override.setEnd(LocalTime.parse(dto.getEnd(), TIME_FORMATTER));
        override.setMaxExtra(dto.getMaxExtra());
        override.setSettings(settings);

        override = overrideRepository.save(override);
        return mapToDto(override);
    }

    @Transactional
    public TimeSlotOverrideRequest updateOverride(Long id, TimeSlotOverrideRequest dto) {
        validateTimeSlotOverride(dto);

        TimeSlotOverride override = overrideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Time slot override not found"));

        override.setStart(LocalTime.parse(dto.getStart(), TIME_FORMATTER));
        override.setEnd(LocalTime.parse(dto.getEnd(), TIME_FORMATTER));
        override.setMaxExtra(dto.getMaxExtra());

        override = overrideRepository.save(override);
        return mapToDto(override);
    }

    @Transactional
    public void deleteOverride(Long id) {
        overrideRepository.deleteById(id);
    }

    private OverbookingSettings getOrCreateSettings() {
        return settingsRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> settingsRepository.save(new OverbookingSettings()));
    }

    private void validateThresholds(List<ThresholdRuleRequest> thresholds) {
        if (thresholds == null) return;

        thresholds.forEach(this::validateThreshold);
    }

    private void validateThreshold(ThresholdRuleRequest threshold) {
        if (threshold.getMin() == null || threshold.getMax() == null || threshold.getAction() == null) {
            throw new IllegalArgumentException("Min, max, and action are required for thresholds");
        }

        if (threshold.getMin() < 0 || threshold.getMin() > 99) {
            throw new IllegalArgumentException("Min value must be between 0 and 99");
        }

        if (threshold.getMax() < 1 || threshold.getMax() > 100) {
            throw new IllegalArgumentException("Max value must be between 1 and 100");
        }

        if (threshold.getMin() >= threshold.getMax()) {
            throw new IllegalArgumentException("Min value must be less than max value");
        }
    }

    private void validateTimeSlotOverrides(List<TimeSlotOverrideRequest> overrides) {
        if (overrides == null) return;

        overrides.forEach(this::validateTimeSlotOverride);
    }

    private void validateTimeSlotOverride(TimeSlotOverrideRequest override) {
        if (override.getStart() == null || override.getEnd() == null || override.getMaxExtra() == null) {
            throw new IllegalArgumentException("Start time, end time, and max extra are required for overrides");
        }

        LocalTime start = LocalTime.parse(override.getStart(), TIME_FORMATTER);
        LocalTime end = LocalTime.parse(override.getEnd(), TIME_FORMATTER);

        if (start.isAfter(end) || start.equals(end)) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        if (override.getMaxExtra() < 1) {
            throw new IllegalArgumentException("Max extra must be at least 1");
        }
    }

    private void saveThresholds(List<ThresholdRuleRequest> dtos, OverbookingSettings settings) {
        if (dtos == null) return;

        dtos.forEach(dto -> {
            ThresholdRule rule = new ThresholdRule();
            rule.setMin(dto.getMin());
            rule.setMax(dto.getMax());
            rule.setAction(dto.getAction());
            rule.setSettings(settings);
            thresholdRepository.save(rule);
        });
    }

    private void saveOverrides(List<TimeSlotOverrideRequest> dtos, OverbookingSettings settings) {
        if (dtos == null) return;

        dtos.forEach(dto -> {
            TimeSlotOverride override = new TimeSlotOverride();
            override.setStart(LocalTime.parse(dto.getStart(), TIME_FORMATTER));
            override.setEnd(LocalTime.parse(dto.getEnd(), TIME_FORMATTER));
            override.setMaxExtra(dto.getMaxExtra());
            override.setSettings(settings);
            overrideRepository.save(override);
        });
    }

    private OverbookingSettingsRequest mapToDto(OverbookingSettings settings) {
        OverbookingSettingsRequest dto = new OverbookingSettingsRequest();
        dto.setId(settings.getId());
        dto.setEnabled(settings.getEnabled());

        List<ThresholdRule> thresholds = thresholdRepository.findBySettingsId(settings.getId());
        dto.setThresholds(thresholds.stream().map(this::mapToDto).collect(Collectors.toList()));

        List<TimeSlotOverride> overrides = overrideRepository.findBySettingsId(settings.getId());
        dto.setOverrides(overrides.stream().map(this::mapToDto).collect(Collectors.toList()));

        return dto;
    }

    private ThresholdRuleRequest mapToDto(ThresholdRule rule) {
        ThresholdRuleRequest dto = new ThresholdRuleRequest();
        dto.setId(rule.getId());
        dto.setMin(rule.getMin());
        dto.setMax(rule.getMax());
        dto.setAction(rule.getAction());
        return dto;
    }

    private TimeSlotOverrideRequest mapToDto(TimeSlotOverride override) {
        TimeSlotOverrideRequest dto = new TimeSlotOverrideRequest();
        dto.setId(override.getId());
        dto.setStart(override.getStart().format(TIME_FORMATTER));
        dto.setEnd(override.getEnd().format(TIME_FORMATTER));
        dto.setMaxExtra(override.getMaxExtra());
        return dto;
    }

}
