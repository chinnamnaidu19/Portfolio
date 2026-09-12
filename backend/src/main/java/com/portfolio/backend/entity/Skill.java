package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills", indexes = {
    @Index(name = "idx_skill_category", columnList = "category_id"),
    @Index(name = "idx_skill_highlight", columnList = "is_highlighted")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill extends BaseAuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "fk_skills_category"))
    private SkillCategory category;

    @Column(name = "skill_name", nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level", nullable = false, length = 20)
    @Builder.Default
    private ProficiencyLevel level = ProficiencyLevel.INTERMEDIATE;

    @Column(name = "is_highlighted", nullable = false)
    @Builder.Default
    private Boolean isHighlighted = false;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    public enum ProficiencyLevel {
        BEGINNER,
        INTERMEDIATE,
        ADVANCED,
        EXPERT
    }
}
