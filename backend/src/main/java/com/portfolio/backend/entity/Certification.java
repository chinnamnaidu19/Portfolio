package com.portfolio.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "certifications", indexes = {
    @Index(name = "idx_cert_issuer", columnList = "issuer")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certification extends BaseAuditableEntity {

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 150)
    private String issuer;

    @Column(name = "issue_date", nullable = false, length = 50)
    private String issueDate;

    @Column(name = "expiry_date", length = 50)
    private String expiryDate;

    @Column(name = "credential_id", length = 100)
    private String credentialId;

    @Column(name = "credential_url", nullable = false, length = 500)
    private String credentialUrl;

    @Column(name = "badge_text", length = 100)
    private String badgeText;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "certification_skills",
        joinColumns = @JoinColumn(name = "certification_id", foreignKey = @ForeignKey(name = "fk_cert_skill_cert"))
    )
    @Column(name = "skill_name", nullable = false, length = 100)
    @Builder.Default
    private List<String> skills = new ArrayList<>();
}
