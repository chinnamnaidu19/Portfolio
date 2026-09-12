package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.AnalyticsStatsDTO;
import com.portfolio.backend.model.AnalyticsEvent;
import com.portfolio.backend.repository.AnalyticsEventRepository;
import com.portfolio.backend.repository.ContactMessageRepository;
import com.portfolio.backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsEventRepository analyticsEventRepository;
    private final ContactMessageRepository contactMessageRepository;

    @Async
    @Override
    @Transactional
    public void trackEvent(String eventType, String resourceIdentifier, String pageUrl, String referrer, String userAgent) {
        try {
            AnalyticsEvent event = AnalyticsEvent.builder()
                    .eventType(eventType != null ? eventType.toUpperCase() : "PAGE_VIEW")
                    .resourceIdentifier(resourceIdentifier)
                    .pageUrl(pageUrl)
                    .referrer(referrer)
                    .userAgent(userAgent != null && userAgent.length() > 150 ? userAgent.substring(0, 150) : userAgent)
                    .build();

            analyticsEventRepository.save(event);
            log.debug("Tracked analytics event: {} for resource: {}", eventType, resourceIdentifier);
        } catch (Exception e) {
            log.warn("Failed to record analytics event: {}", e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public AnalyticsStatsDTO getAnalyticsSummary() {
        long pageViews = analyticsEventRepository.countByEventType("PAGE_VIEW");
        long projectViews = analyticsEventRepository.countByEventType("PROJECT_VIEW");
        long articleViews = analyticsEventRepository.countByEventType("ARTICLE_VIEW");
        long resumeDownloads = analyticsEventRepository.countByEventType("RESUME_DOWNLOAD");
        long contactSubmissions = contactMessageRepository.count();

        Map<String, Long> topProjects = new LinkedHashMap<>();
        List<Object[]> projectRows = analyticsEventRepository.findTopProjectViews();
        for (int i = 0; i < Math.min(5, projectRows.size()); i++) {
            Object[] row = projectRows.get(i);
            String resource = row[0] != null ? row[0].toString() : "Unknown";
            Long count = row[1] instanceof Number ? ((Number) row[1]).longValue() : 0L;
            topProjects.put(resource, count);
        }

        Map<String, Long> topArticles = new LinkedHashMap<>();
        List<Object[]> articleRows = analyticsEventRepository.findTopArticleViews();
        for (int i = 0; i < Math.min(5, articleRows.size()); i++) {
            Object[] row = articleRows.get(i);
            String resource = row[0] != null ? row[0].toString() : "Unknown";
            Long count = row[1] instanceof Number ? ((Number) row[1]).longValue() : 0L;
            topArticles.put(resource, count);
        }

        return AnalyticsStatsDTO.builder()
                .totalPageViews(pageViews)
                .totalProjectViews(projectViews)
                .totalArticleViews(articleViews)
                .totalResumeDownloads(resumeDownloads)
                .totalContactSubmissions(contactSubmissions)
                .topViewedProjects(topProjects)
                .topViewedArticles(topArticles)
                .build();
    }
}
