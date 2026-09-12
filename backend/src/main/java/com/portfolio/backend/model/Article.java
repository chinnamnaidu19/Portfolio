package com.portfolio.backend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articles", indexes = {
        @Index(name = "idx_article_slug", columnList = "slug", unique = true),
        @Index(name = "idx_article_published", columnList = "published")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @Column(nullable = false, length = 500)
    private String description;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String content;

    @Column(length = 50)
    private String readTime;

    @Column(length = 500)
    private String coverImage;

    @Column(nullable = false)
    @Builder.Default
    private boolean published = true;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "article_tags", joinColumns = @JoinColumn(name = "article_id"))
    @Column(name = "tag", length = 50)
    @Builder.Default
    private List<String> tags = new ArrayList<>();

    @Column(nullable = false)
    @Builder.Default
    private long viewsCount = 0;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
