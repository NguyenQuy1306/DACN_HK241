package com.capstoneproject.themeal.SessionAuthenticationFilter;

import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionRegistry {
    private final Map<String, SessionInfo> activeSessions = new ConcurrentHashMap<>();

    public void registerSession(String sessionId, Long userId) {
        // Invalidate existing sessions for this user
        invalidateUserSessions(userId);

        // Register new session
        activeSessions.put(sessionId, new SessionInfo(userId, LocalDateTime.now()));
    }

    public boolean isSessionValid(String sessionId) {
        SessionInfo info = activeSessions.get(sessionId);
        if (info == null)
            return false;

        // Check if session has expired (30 minutes)
        if (info.getLastAccessTime().plusMinutes(30).isBefore(LocalDateTime.now())) {
            activeSessions.remove(sessionId);
            return false;
        }

        return true;
    }

    public void updateLastAccessTime(String sessionId) {
        SessionInfo info = activeSessions.get(sessionId);
        if (info != null) {
            info.setLastAccessTime(LocalDateTime.now());
        }
    }

    public void invalidateSession(String sessionId) {
        activeSessions.remove(sessionId);
    }

    private void invalidateUserSessions(Long userId) {
        activeSessions.entrySet().removeIf(entry -> entry.getValue().getUserId().equals(userId));
    }

    @Scheduled(fixedRate = 30000) // Run every 30 second
    public void cleanupExpiredSessions() {
        activeSessions.entrySet()
                .removeIf(entry -> entry.getValue().getLastAccessTime().plusMinutes(5).isBefore(LocalDateTime.now()));
    }
}

@Data
@AllArgsConstructor
class SessionInfo {
    private Long userId;
    private LocalDateTime lastAccessTime;

    public void setLastAccessTime(LocalDateTime time) {
        this.lastAccessTime = time;
    }
}