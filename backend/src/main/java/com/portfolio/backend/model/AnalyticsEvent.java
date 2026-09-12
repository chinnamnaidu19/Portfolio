package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events", indexes = {
        @Index(name = "idx_analytics_type", columnList = "event_type"),
        @Index(name = "idx_analytics_resource", columnList = "resource_identifier"),
        @Index(name = "idx_analytics_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type", nullable = false, length = 50)
    private String eventType; // PAGE_VIEW, PROJECT_VIEW, ARTICLE_VIEW, RESUME_DOWNLOAD, CONTACT_SUBMISSION

    @Column(name = "resource_identifier", length = 150)
    private String resourceIdentifier; // e.g., "/projects/1", "resume.pdf", "contact-form"

    @Column(length = 255)
    private String pageUrl;

    @Column(length = 100)
    private String referrer;

    @Column(length = 150)
    private String userAgent;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
