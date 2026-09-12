package com.portfolio.backend.service;

import com.portfolio.backend.dto.AnalyticsStatsDTO;

public interface AnalyticsService {
    void trackEvent(String eventType, String resourceIdentifier, String pageUrl, String referrer, String userAgent);
    AnalyticsStatsDTO getAnalyticsSummary();
}
