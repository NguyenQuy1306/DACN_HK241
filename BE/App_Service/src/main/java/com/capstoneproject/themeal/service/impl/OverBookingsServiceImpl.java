package com.capstoneproject.themeal.service.impl;

import com.capstoneproject.themeal.exception.NotFoundException;
import com.capstoneproject.themeal.model.entity.*;
import com.capstoneproject.themeal.model.request.OverbookingSettingsRequest;
import com.capstoneproject.themeal.model.request.ThresholdRuleRequest;
import com.capstoneproject.themeal.model.request.TimeSlotOverrideRequest;
import com.capstoneproject.themeal.repository.*;
import com.capstoneproject.themeal.service.OverbookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
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
    @Autowired
    private WeeklyOverbookingRateRepository weeklyOverbookingRateRepository;
    @Autowired
    private OrderTableRepository orderTableRepository;

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

    @Override
    public void updateOverbookingRateForAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();  // Lấy danh sách tất cả nhà hàng

        for (Restaurant restaurant : restaurants) {
            updateOverbookingRateForRestaurant(restaurant.getMaSoNhaHang());
        }
    }

    public void updateOverbookingRateAndMax(Long restaurantId, int dayOfWeek, Double overbookingRate, Long overbookingMax) {
        // Kiểm tra xem nhà hàng và ngày trong tuần đã có tỷ lệ overbooking hay chưa
        WeeklyOverbookingRate existingRate = weeklyOverbookingRateRepository
                .findByRestaurantIdAndDayOfWeek(restaurantId, dayOfWeek);

        if (existingRate != null) {
            // Nếu đã có, cập nhật lại tỷ lệ overbooking
            existingRate.setOverbookingRate(overbookingRate);
            weeklyOverbookingRateRepository.save(existingRate);  // Cập nhật vào cơ sở dữ liệu
        } else {
            // Nếu chưa có, tạo mới một bản ghi tỷ lệ overbooking
            WeeklyOverbookingRate newRate = new WeeklyOverbookingRate();
            newRate.setRestaurantId(restaurantId);
            newRate.setDayOfWeek(dayOfWeek);
            newRate.setOverbookingRate(overbookingRate);
            newRate.setMaxoverbooking(overbookingMax);

            weeklyOverbookingRateRepository.save(newRate);  // Lưu vào cơ sở dữ liệu
        }
    }

    public void updateOverbookingRateForRestaurant(Long restaurantId) {
        for (int dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
            LocalTime startTime = LocalTime.of(0, 0);  // 00:00
            LocalTime endTime = LocalTime.of(23, 59, 59, 999999999);  // 24:00

            // Đếm tổng số đơn
            Long totalBookings = orderTableRepository.countOrdersByWeekdayAndTimeSlot(
                    restaurantId, dayOfWeek, startTime, endTime);

            // Đếm đơn bị huỷ hoặc no-show
            Long canceledOrNoShowBookings = orderTableRepository.countCanceledOrNoShowOrdersByWeekdayAndTimeSlot(
                    restaurantId, dayOfWeek, startTime, endTime);

            // Tính overbookingRate %
            Double overbookingRate = 0.0;
            if (totalBookings > 0) {
                overbookingRate = (canceledOrNoShowBookings.doubleValue() / totalBookings.doubleValue()) * 100;
            }

            // --- Thêm phần tính overbookingMax ---
            // Lấy số lượng bàn available của tuần sau cho đúng dayOfWeek
            Restaurant restaurant = restaurantRepository.findById(restaurantId).get();
            Long overbookingMax = null;

            Long soLuongBan = restaurant.getMaxTable(); // available.getSoLuong() là Long

            // Công thức tính overbookingMax
            overbookingMax = (long) Math.ceil((soLuongBan + 1L) * (1 + overbookingRate / 100.0));


            // Cập nhật tỷ lệ overbooking và số lượng max vào cơ sở dữ liệu
            updateOverbookingRateAndMax(restaurantId, dayOfWeek, overbookingRate, overbookingMax);
        }
    }


}
