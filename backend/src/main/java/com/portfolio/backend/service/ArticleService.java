package com.portfolio.backend.service;

import com.portfolio.backend.dto.ArticleDTO;

import java.util.List;

public interface ArticleService {
    List<ArticleDTO> getAllPublishedArticles();
    ArticleDTO getArticleById(Long id);
    ArticleDTO getArticleBySlug(String slug);
    ArticleDTO createArticle(ArticleDTO dto);
    ArticleDTO updateArticle(Long id, ArticleDTO dto);
    void deleteArticle(Long id);
    void incrementViews(Long id);
}
