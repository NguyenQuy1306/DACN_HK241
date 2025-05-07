package com.capstoneproject.themeal.repository;

import com.capstoneproject.themeal.model.entity.ThresholdRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThresholdRuleRepository extends JpaRepository<ThresholdRule, Long> {
    List<ThresholdRule> findBySettingsId(Long settingsId);

    @Query("SELECT t FROM ThresholdRule t WHERE t.settings.id = :settingId and t.action=:action")
    ThresholdRule findByOverbookingId(@Param("settingId")Long settingId, @Param("action")String action);

    void deleteBySettingsId(Long settingsId);
}
