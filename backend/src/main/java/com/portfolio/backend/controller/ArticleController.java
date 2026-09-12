package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.ArticleDTO;
import com.portfolio.backend.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ArticleDTO>>> getPublishedArticles() {
        List<ArticleDTO> articles = articleService.getAllPublishedArticles();
        return ResponseEntity.ok(ApiResponse.success(articles));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleDTO>> getArticleById(@PathVariable Long id) {
        ArticleDTO article = articleService.getArticleById(id);
        articleService.incrementViews(id);
        return ResponseEntity.ok(ApiResponse.success(article));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ArticleDTO>> getArticleBySlug(@PathVariable String slug) {
        ArticleDTO article = articleService.getArticleBySlug(slug);
        articleService.incrementViews(article.getId());
        return ResponseEntity.ok(ApiResponse.success(article));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ArticleDTO>> createArticle(@Valid @RequestBody ArticleDTO dto) {
        ArticleDTO created = articleService.createArticle(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Article created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ArticleDTO>> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleDTO dto
    ) {
        ArticleDTO updated = articleService.updateArticle(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Article updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok(ApiResponse.success("Article deleted successfully", null));
    }
}
