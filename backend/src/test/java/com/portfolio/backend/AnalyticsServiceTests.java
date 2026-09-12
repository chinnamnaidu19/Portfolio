package com.portfolio.backend;

import com.portfolio.backend.dto.AnalyticsStatsDTO;
import com.portfolio.backend.service.AnalyticsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class AnalyticsServiceTests {

    @Autowired
    private AnalyticsService analyticsService;

    @Test
    @DisplayName("1. Test Track Event & Aggregate Stats")
    void testTrackAndAggregate() {
        // Track events
        analyticsService.trackEvent("PAGE_VIEW", "portfolio-home", "/", "https://google.com", "JUnit Test Agent");
        analyticsService.trackEvent("PROJECT_VIEW", "1", "/projects/1", "/", "JUnit Test Agent");
        analyticsService.trackEvent("RESUME_DOWNLOAD", "Alexander_Vance_Resume.pdf", "/resume", "/", "JUnit Test Agent");

        // Retrieve aggregated stats
        AnalyticsStatsDTO stats = analyticsService.getAnalyticsSummary();
        assertNotNull(stats);
        assertTrue(stats.getTotalPageViews() >= 1);
        assertTrue(stats.getTotalProjectViews() >= 1);
        assertTrue(stats.getTotalResumeDownloads() >= 1);
    }
}
