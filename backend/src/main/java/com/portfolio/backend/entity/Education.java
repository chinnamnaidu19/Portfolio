package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "education", indexes = {
    @Index(name = "idx_edu_institution", columnList = "institution")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education extends BaseAuditableEntity {

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(name = "field_of_study", nullable = false, length = 150)
    private String field;

    @Column(nullable = false, length = 200)
    private String institution;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(nullable = false, length = 100)
    private String period;

    @Column(nullable = false, length = 100)
    private String grade;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "education_coursework",
        joinColumns = @JoinColumn(name = "education_id", foreignKey = @ForeignKey(name = "fk_edu_course_education"))
    )
    @Column(name = "course_name", nullable = false, length = 150)
    @Builder.Default
    private List<String> coursework = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "education_highlights",
        joinColumns = @JoinColumn(name = "education_id", foreignKey = @ForeignKey(name = "fk_edu_hl_education"))
    )
    @Column(name = "highlight_text", nullable = false, length = 500)
    @Builder.Default
    private List<String> highlights = new ArrayList<>();
}
