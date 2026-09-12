package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "projects", indexes = {
    @Index(name = "idx_project_slug", columnList = "slug"),
    @Index(name = "idx_project_category", columnList = "category"),
    @Index(name = "idx_project_featured", columnList = "is_featured")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project extends BaseAuditableEntity {

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 255)
    private String tagline;

    @Lob
    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Lob
    @Column(name = "long_description")
    private String longDescription;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "github_url", nullable = false, length = 500)
    private String githubUrl;

    @Column(name = "live_url", length = 500)
    private String liveUrl;

    @Column(name = "is_featured", nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "project_technologies",
        joinColumns = @JoinColumn(name = "project_id", foreignKey = @ForeignKey(name = "fk_proj_tech_project"))
    )
    @Column(name = "technology_name", nullable = false, length = 100)
    @Builder.Default
    private Set<String> technologies = new HashSet<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "project_features",
        joinColumns = @JoinColumn(name = "project_id", foreignKey = @ForeignKey(name = "fk_proj_feat_project"))
    )
    @Column(name = "feature_text", nullable = false, length = 500)
    @OrderColumn(name = "display_order")
    @Builder.Default
    private List<String> features = new ArrayList<>();
}
