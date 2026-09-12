package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillDTO {

    private Long id;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private String categoryName;

    @NotBlank(message = "Skill name is required")
    private String name;

    @Builder.Default
    private String level = "INTERMEDIATE";

    @Builder.Default
    private Boolean highlight = false;

    @Builder.Default
    private Integer displayOrder = 0;
}
