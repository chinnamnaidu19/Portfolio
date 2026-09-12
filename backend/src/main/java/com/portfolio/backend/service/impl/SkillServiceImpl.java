package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.SkillCategoryDTO;
import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.entity.SkillCategory;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.SkillCategoryRepository;
import com.portfolio.backend.repository.SkillRepository;
import com.portfolio.backend.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillCategoryRepository skillCategoryRepository;

    @Override
    @Transactional
    public SkillDTO createSkill(SkillDTO dto) {
        log.info("Creating skill: {} under category id: {}", dto.getName(), dto.getCategoryId());
        
        SkillCategory category = skillCategoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Skill category not found with id: " + dto.getCategoryId()));

        Skill.ProficiencyLevel level = Skill.ProficiencyLevel.INTERMEDIATE;
        if (dto.getLevel() != null) {
            try {
                level = Skill.ProficiencyLevel.valueOf(dto.getLevel().toUpperCase());
            } catch (IllegalArgumentException ignored) {}
        }

        Skill skill = Skill.builder()
                .category(category)
                .name(dto.getName())
                .level(level)
                .isHighlighted(dto.getHighlight() != null ? dto.getHighlight() : false)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        Skill saved = skillRepository.save(skill);
        return mapToDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public SkillDTO getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
        return mapToDTO(skill);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillCategoryDTO> getAllSkillsGroupedByCategory() {
        return skillCategoryRepository.findAllWithSkillsOrdered().stream()
                .map(cat -> SkillCategoryDTO.builder()
                        .id(cat.getId())
                        .category(cat.getName())
                        .description(cat.getDescription())
                        .displayOrder(cat.getDisplayOrder())
                        .skills(cat.getSkills().stream()
                                .map(this::mapToDTO)
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillDTO> getSkillsByCategory(Long categoryId) {
        return skillRepository.findByCategoryIdOrderByDisplayOrderAsc(categoryId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SkillDTO updateSkill(Long id, SkillDTO dto) {
        log.info("Updating skill id: {}", id);
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));

        if (dto.getCategoryId() != null && !dto.getCategoryId().equals(skill.getCategory().getId())) {
            SkillCategory newCategory = skillCategoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Skill category not found with id: " + dto.getCategoryId()));
            skill.setCategory(newCategory);
        }

        skill.setName(dto.getName());
        if (dto.getLevel() != null) {
            try {
                skill.setLevel(Skill.ProficiencyLevel.valueOf(dto.getLevel().toUpperCase()));
            } catch (IllegalArgumentException ignored) {}
        }
        if (dto.getHighlight() != null) skill.setIsHighlighted(dto.getHighlight());
        if (dto.getDisplayOrder() != null) skill.setDisplayOrder(dto.getDisplayOrder());

        Skill updated = skillRepository.save(skill);
        return mapToDTO(updated);
    }

    @Override
    @Transactional
    public void deleteSkill(Long id) {
        log.info("Deleting skill id: {}", id);
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill not found with id: " + id);
        }
        skillRepository.deleteById(id);
    }

    private SkillDTO mapToDTO(Skill entity) {
        return SkillDTO.builder()
                .id(entity.getId())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : null)
                .name(entity.getName())
                .level(entity.getLevel().name())
                .highlight(entity.getIsHighlighted())
                .displayOrder(entity.getDisplayOrder())
                .build();
    }
}
