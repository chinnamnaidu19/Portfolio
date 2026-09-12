package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.ArticleDTO;
import com.portfolio.backend.exception.DuplicateResourceException;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.model.Article;
import com.portfolio.backend.repository.ArticleRepository;
import com.portfolio.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ArticleDTO> getAllPublishedArticles() {
        return articleRepository.findByPublishedTrueOrderByCreatedAtDesc().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleDTO getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));
        return toDTO(article);
    }

    @Override
    @Transactional(readOnly = true)
    public ArticleDTO getArticleBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "slug", slug));
        return toDTO(article);
    }

    @Override
    @Transactional
    public ArticleDTO createArticle(ArticleDTO dto) {
        String slug = dto.getSlug() != null && !dto.getSlug().trim().isEmpty()
                ? generateSlug(dto.getSlug())
                : generateSlug(dto.getTitle());

        if (articleRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        Article article = Article.builder()
                .title(dto.getTitle())
                .slug(slug)
                .description(dto.getDescription())
                .content(dto.getContent())
                .readTime(dto.getReadTime() != null ? dto.getReadTime() : calculateReadTime(dto.getContent()))
                .coverImage(dto.getCoverImage())
                .published(dto.isPublished())
                .tags(dto.getTags() != null ? new java.util.ArrayList<>(dto.getTags()) : new java.util.ArrayList<>())
                .viewsCount(0)
                .build();

        Article saved = articleRepository.save(article);
        log.info("Created new technical article: {} with slug: {}", saved.getTitle(), saved.getSlug());
        return toDTO(saved);
    }

    @Override
    @Transactional
    public ArticleDTO updateArticle(Long id, ArticleDTO dto) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article", "id", id));

        article.setTitle(dto.getTitle());
        if (dto.getSlug() != null && !dto.getSlug().trim().isEmpty() && !dto.getSlug().equals(article.getSlug())) {
            String newSlug = generateSlug(dto.getSlug());
            if (!newSlug.equals(article.getSlug()) && articleRepository.existsBySlug(newSlug)) {
                throw new DuplicateResourceException("Article", "slug", newSlug);
            }
            article.setSlug(newSlug);
        }
        article.setDescription(dto.getDescription());
        article.setContent(dto.getContent());
        article.setReadTime(dto.getReadTime() != null ? dto.getReadTime() : calculateReadTime(dto.getContent()));
        article.setCoverImage(dto.getCoverImage());
        article.setPublished(dto.isPublished());
        if (dto.getTags() != null) {
            article.setTags(new java.util.ArrayList<>(dto.getTags()));
        }

        Article updated = articleRepository.save(article);
        log.info("Updated article id: {}", updated.getId());
        return toDTO(updated);
    }

    @Override
    @Transactional
    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Article", "id", id);
        }
        articleRepository.deleteById(id);
        log.info("Deleted article id: {}", id);
    }

    @Override
    @Transactional
    public void incrementViews(Long id) {
        articleRepository.findById(id).ifPresent(article -> {
            article.setViewsCount(article.getViewsCount() + 1);
            articleRepository.save(article);
        });
    }

    private String generateSlug(String input) {
        if (input == null) return "article-" + System.currentTimeMillis();
        return input.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-");
    }

    private String calculateReadTime(String content) {
        if (content == null || content.isEmpty()) return "3 min read";
        int wordCount = content.split("\\s+").length;
        int minutes = Math.max(1, (int) Math.ceil(wordCount / 200.0));
        return minutes + " min read";
    }

    private ArticleDTO toDTO(Article article) {
        return ArticleDTO.builder()
                .id(article.getId())
                .title(article.getTitle())
                .slug(article.getSlug())
                .description(article.getDescription())
                .content(article.getContent())
                .readTime(article.getReadTime())
                .coverImage(article.getCoverImage())
                .published(article.isPublished())
                .tags(article.getTags())
                .viewsCount(article.getViewsCount())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .build();
    }
}
