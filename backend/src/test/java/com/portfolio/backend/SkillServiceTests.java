package com.portfolio.backend;

import com.portfolio.backend.dto.SkillCategoryDTO;
import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.entity.SkillCategory;
import com.portfolio.backend.repository.SkillCategoryRepository;
import com.portfolio.backend.service.SkillService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class SkillServiceTests {

    @Autowired
    private SkillService skillService;

    @Autowired
    private SkillCategoryRepository skillCategoryRepository;

    @Test
    @DisplayName("5. Test Create Skill")
    void testCreateSkill() {
        SkillCategory category = skillCategoryRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> skillCategoryRepository.save(SkillCategory.builder()
                        .name("Test Category")
                        .description("Test Description")
                        .displayOrder(99)
                        .build()));

        SkillDTO newSkill = SkillDTO.builder()
                .categoryId(category.getId())
                .name("GraphQL")
                .level("ADVANCED")
                .highlight(true)
                .displayOrder(5)
                .build();

        SkillDTO created = skillService.createSkill(newSkill);

        assertNotNull(created.getId());
        assertEquals("GraphQL", created.getName());
        assertEquals("ADVANCED", created.getLevel());
        assertTrue(created.getHighlight());
        assertEquals(category.getId(), created.getCategoryId());
    }

    @Test
    @DisplayName("6. Test Read Skill")
    void testReadSkill() {
        SkillCategory category = skillCategoryRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> skillCategoryRepository.save(SkillCategory.builder()
                        .name("Backend Category")
                        .description("Backend tools")
                        .displayOrder(1)
                        .build()));

        SkillDTO newSkill = SkillDTO.builder()
                .categoryId(category.getId())
                .name("Hibernate ORM")
                .level("EXPERT")
                .highlight(true)
                .build();

        SkillDTO created = skillService.createSkill(newSkill);

        // Read by ID
        SkillDTO retrieved = skillService.getSkillById(created.getId());
        assertNotNull(retrieved);
        assertEquals("Hibernate ORM", retrieved.getName());

        // Read by Category
        List<SkillDTO> skillsInCategory = skillService.getSkillsByCategory(category.getId());
        assertFalse(skillsInCategory.isEmpty());
        assertTrue(skillsInCategory.stream().anyMatch(s -> s.getName().equals("Hibernate ORM")));

        // Read grouped categories
        List<SkillCategoryDTO> grouped = skillService.getAllSkillsGroupedByCategory();
        assertFalse(grouped.isEmpty());
    }
}
