package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skill_categories", indexes = {
    @Index(name = "idx_skill_cat_order", columnList = "display_order")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillCategory extends BaseAuditableEntity {

    @Column(name = "category_name", nullable = false, unique = true, length = 50)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Skill> skills = new ArrayList<>();

    public void addSkill(Skill skill) {
        skills.add(skill);
        skill.setCategory(this);
    }

    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setCategory(null);
    }
}
