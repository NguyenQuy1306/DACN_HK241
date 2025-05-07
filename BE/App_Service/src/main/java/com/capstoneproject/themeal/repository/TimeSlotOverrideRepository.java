package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.TimeSlotOverride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeSlotOverrideRepository extends JpaRepository<TimeSlotOverride, Long> {
    List<TimeSlotOverride> findBySettingsId(Long settingsId);

    void deleteBySettingsId(Long settingsId);
}
