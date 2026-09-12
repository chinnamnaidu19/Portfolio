package com.portfolio.backend.service;

import com.portfolio.backend.dto.SkillCategoryDTO;
import com.portfolio.backend.dto.SkillDTO;

import java.util.List;

public interface SkillService {
    SkillDTO createSkill(SkillDTO skillDTO);
    SkillDTO getSkillById(Long id);
    List<SkillCategoryDTO> getAllSkillsGroupedByCategory();
    List<SkillDTO> getSkillsByCategory(Long categoryId);
    SkillDTO updateSkill(Long id, SkillDTO skillDTO);
    void deleteSkill(Long id);
}
