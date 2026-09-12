package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleDTO {
    private Long id;

    @NotBlank(message = "Article title is required")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    private String slug;

    @NotBlank(message = "Article description is required")
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Article content is required")
    private String content;

    private String readTime;
    private String coverImage;
    private boolean published;
    private List<String> tags;
    private long viewsCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
