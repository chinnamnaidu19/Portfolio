package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.AnalyticsStatsDTO;
import com.portfolio.backend.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @PostMapping("/track")
    public ResponseEntity<ApiResponse<Void>> trackEvent(
            @RequestBody Map<String, String> payload,
            HttpServletRequest request
    ) {
        String eventType = payload.getOrDefault("eventType", "PAGE_VIEW");
        String resourceIdentifier = payload.get("resourceIdentifier");
        String pageUrl = payload.get("pageUrl");
        String referrer = request.getHeader("Referer");
        String userAgent = request.getHeader("User-Agent");

        analyticsService.trackEvent(eventType, resourceIdentifier, pageUrl, referrer, userAgent);
        return ResponseEntity.ok(ApiResponse.success("Event tracked", null));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<AnalyticsStatsDTO>> getStats() {
        AnalyticsStatsDTO stats = analyticsService.getAnalyticsSummary();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
