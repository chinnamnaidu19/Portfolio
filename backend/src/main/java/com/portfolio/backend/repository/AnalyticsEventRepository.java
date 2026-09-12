package com.portfolio.backend.repository;

import com.portfolio.backend.model.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {
    long countByEventType(String eventType);

    @Query("SELECT e.resourceIdentifier, COUNT(e) FROM AnalyticsEvent e WHERE e.eventType = 'PROJECT_VIEW' GROUP BY e.resourceIdentifier ORDER BY COUNT(e) DESC")
    List<Object[]> findTopProjectViews();

    @Query("SELECT e.resourceIdentifier, COUNT(e) FROM AnalyticsEvent e WHERE e.eventType = 'ARTICLE_VIEW' GROUP BY e.resourceIdentifier ORDER BY COUNT(e) DESC")
    List<Object[]> findTopArticleViews();
}
