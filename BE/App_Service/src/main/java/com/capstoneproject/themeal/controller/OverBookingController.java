package com.capstoneproject.themeal.controller;


import com.capstoneproject.themeal.model.request.OverbookingSettingsRequest;
import com.capstoneproject.themeal.model.request.ThresholdRuleRequest;
import com.capstoneproject.themeal.model.request.TimeSlotOverrideRequest;
import com.capstoneproject.themeal.service.OverbookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/overbooking")
public class OverBookingController {
    @Autowired
    private OverbookingService service;

    @GetMapping("/settings")
    public ResponseEntity<OverbookingSettingsRequest> getSettings(@RequestParam Long restaurantId) {
        try {
            return ResponseEntity.ok(service.getSettings(restaurantId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error fetching settings", e);
        }
    }

    @PostMapping("/settings")
    public ResponseEntity<OverbookingSettingsRequest> saveSettings(@RequestBody OverbookingSettingsRequest dto) {
        try {
            return ResponseEntity.ok(service.saveSettings(dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving settings", e);
        }
    }

    @PostMapping("/thresholds")
    public ResponseEntity<ThresholdRuleRequest> addThreshold(@RequestBody ThresholdRuleRequest dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.addThreshold(dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error adding threshold", e);
        }
    }

    @PutMapping("/thresholds/{id}")
    public ResponseEntity<ThresholdRuleRequest> updateThreshold(@PathVariable Long id, @RequestBody ThresholdRuleRequest dto) {
        try {
            return ResponseEntity.ok(service.updateThreshold(id, dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating threshold", e);
        }
    }

    @DeleteMapping("/thresholds/{id}")
    public ResponseEntity<Void> deleteThreshold(@PathVariable Long id) {
        try {
            service.deleteThreshold(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting threshold", e);
        }
    }

    @PostMapping("/overrides")
    public ResponseEntity<TimeSlotOverrideRequest> addOverride(@RequestBody TimeSlotOverrideRequest dto) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(service.addOverride(dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error adding override", e);
        }
    }

    @PutMapping("/overrides/{id}")
    public ResponseEntity<TimeSlotOverrideRequest> updateOverride(@PathVariable Long id, @RequestBody TimeSlotOverrideRequest dto) {
        try {
            return ResponseEntity.ok(service.updateOverride(id, dto));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error updating override", e);
        }
    }

    @DeleteMapping("/overrides/{id}")
    public ResponseEntity<Void> deleteOverride(@PathVariable Long id) {
        try {
            service.deleteOverride(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting override", e);
        }
    }
}