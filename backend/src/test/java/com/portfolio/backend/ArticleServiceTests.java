package com.portfolio.backend;

import com.portfolio.backend.dto.ArticleDTO;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.service.ArticleService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class ArticleServiceTests {

    @Autowired
    private ArticleService articleService;

    @Test
    @DisplayName("1. Test Create Article")
    void testCreateArticle() {
        ArticleDTO dto = ArticleDTO.builder()
                .title("Zero-Downtime Database Migrations with Flyway")
                .slug("zero-downtime-db-migrations-flyway")
                .description("Step-by-step blue-green schema migration strategies in MySQL & Spring Boot.")
                .content("Detailed markdown technical guide on expand-and-contract pattern...")
                .readTime("7 min read")
                .coverImage("https://example.com/cover.png")
                .published(true)
                .tags(Arrays.asList("Java", "MySQL", "Flyway", "DevOps"))
                .build();

        ArticleDTO created = articleService.createArticle(dto);

        assertNotNull(created.getId());
        assertEquals("Zero-Downtime Database Migrations with Flyway", created.getTitle());
        assertEquals("zero-downtime-db-migrations-flyway", created.getSlug());
        assertTrue(created.getTags().contains("Flyway"));
        assertEquals(0L, created.getViewsCount());
    }

    @Test
    @DisplayName("2. Test Read Article and Increment Views")
    void testReadArticleAndViews() {
        ArticleDTO dto = ArticleDTO.builder()
                .title("Tuning Virtual Threads in Java 21")
                .slug("tuning-virtual-threads-java-21")
                .description("Under-the-hood benchmark analysis of carrier threads and carrier pinning.")
                .content("In Java 21, virtual threads provide lightweight concurrency...")
                .readTime("5 min read")
                .published(true)
                .tags(Arrays.asList("Java", "Performance"))
                .build();

        ArticleDTO created = articleService.createArticle(dto);
        assertNotNull(created.getId());

        // Increment view count
        articleService.incrementViews(created.getId());

        ArticleDTO fetched = articleService.getArticleById(created.getId());
        assertNotNull(fetched);
        assertEquals(1L, fetched.getViewsCount());
    }

    @Test
    @DisplayName("3. Test Update and Delete Article")
    void testUpdateAndDeleteArticle() {
        ArticleDTO dto = ArticleDTO.builder()
                .title("Draft Architecture Article")
                .slug("draft-architecture-article")
                .description("Initial summary")
                .content("Draft content")
                .published(false)
                .build();

        ArticleDTO created = articleService.createArticle(dto);
        Long id = created.getId();

        // Update
        created.setTitle("Published Architecture Article");
        created.setPublished(true);
        ArticleDTO updated = articleService.updateArticle(id, created);
        assertEquals("Published Architecture Article", updated.getTitle());
        assertTrue(updated.isPublished());

        // Delete
        articleService.deleteArticle(id);
        assertThrows(ResourceNotFoundException.class, () -> articleService.getArticleById(id));
    }
}
