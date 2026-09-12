package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "coding_profiles", indexes = {
    @Index(name = "idx_cp_platform", columnList = "platform")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodingProfile extends BaseAuditableEntity {

    @Column(nullable = false, unique = true, length = 50)
    private String platform;

    @Column(nullable = false, length = 100)
    private String username;

    @Column(name = "profile_url", nullable = false, length = 500)
    private String profileUrl;

    @Column(nullable = false, length = 255)
    private String headline;

    @Column(name = "rank_or_score", length = 100)
    private String rankOrScore;

    @Column(name = "solved_count", length = 100)
    private String solvedCount;

    @Column(name = "accent_color", nullable = false, length = 20)
    private String accentColor;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "coding_profile_badges",
        joinColumns = @JoinColumn(name = "coding_profile_id", foreignKey = @ForeignKey(name = "fk_cp_badge_cp"))
    )
    @Column(name = "badge_name", nullable = false, length = 100)
    @Builder.Default
    private List<String> badges = new ArrayList<>();
}
