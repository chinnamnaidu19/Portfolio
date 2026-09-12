package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title cannot exceed 150 characters")
    private String title;

    @NotBlank(message = "Slug is required")
    @Size(max = 150, message = "Slug cannot exceed 150 characters")
    private String slug;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Tagline is required")
    private String tagline;

    @NotBlank(message = "Short description is required")
    private String description;

    private String longDescription;
    private String image;

    @NotBlank(message = "GitHub URL is required")
    private String githubUrl;

    private String liveUrl;
    private Boolean featured;
    private Integer displayOrder;

    @NotNull(message = "Technologies list cannot be null")
    private Set<String> technologies;

    private List<String> features;
}
