package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SkillCategoryDTO {

    private Long id;

    @NotBlank(message = "Category name is required")
    private String category;

    private String description;
    private Integer displayOrder;
    private List<SkillDTO> skills;
}
