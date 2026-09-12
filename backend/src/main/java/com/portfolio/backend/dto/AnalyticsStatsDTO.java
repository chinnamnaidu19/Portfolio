package com.portfolio.backend.dto;

import lombok.*;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsStatsDTO {
    private long totalPageViews;
    private long totalProjectViews;
    private long totalArticleViews;
    private long totalResumeDownloads;
    private long totalContactSubmissions;
    private Map<String, Long> topViewedProjects;
    private Map<String, Long> topViewedArticles;
    private Map<String, Long> recentActivityCounts;
}
