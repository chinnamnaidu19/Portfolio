package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "experience", indexes = {
    @Index(name = "idx_exp_company", columnList = "company_name"),
    @Index(name = "idx_exp_order", columnList = "display_order")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience extends BaseAuditableEntity {

    @Column(name = "job_role", nullable = false, length = 150)
    private String role;

    @Column(name = "company_name", nullable = false, length = 150)
    private String company;

    @Column(name = "company_url")
    private String companyUrl;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(name = "employment_type", nullable = false, length = 50)
    private String type;

    @Column(nullable = false, length = 100)
    private String period;

    @Column(name = "is_current", nullable = false)
    @Builder.Default
    private Boolean isCurrent = false;

    @Lob
    @Column(nullable = false)
    private String summary;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "experience_highlights",
        joinColumns = @JoinColumn(name = "experience_id", foreignKey = @ForeignKey(name = "fk_exp_hl_experience"))
    )
    @Column(name = "highlight_text", nullable = false, length = 500)
    @OrderColumn(name = "display_order")
    @Builder.Default
    private List<String> highlights = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "experience_technologies",
        joinColumns = @JoinColumn(name = "experience_id", foreignKey = @ForeignKey(name = "fk_exp_tech_experience"))
    )
    @Column(name = "technology_name", nullable = false, length = 100)
    @Builder.Default
    private Set<String> technologies = new HashSet<>();
}
