package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.SkillCategoryDTO;
import com.portfolio.backend.dto.SkillDTO;
import com.portfolio.backend.service.SkillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillCategoryDTO>>> getAllSkillsGrouped() {
        List<SkillCategoryDTO> categories = skillService.getAllSkillsGroupedByCategory();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<SkillCategoryDTO>>> getSkillCategories() {
        List<SkillCategoryDTO> categories = skillService.getAllSkillsGroupedByCategory();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SkillDTO>> createSkill(@Valid @RequestBody SkillDTO skillDTO) {
        SkillDTO created = skillService.createSkill(skillDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Skill created successfully", created));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillDTO>> getSkillById(@PathVariable Long id) {
        SkillDTO skill = skillService.getSkillById(id);
        return ResponseEntity.ok(ApiResponse.success(skill));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<SkillDTO>>> getSkillsByCategory(@PathVariable Long categoryId) {
        List<SkillDTO> skills = skillService.getSkillsByCategory(categoryId);
        return ResponseEntity.ok(ApiResponse.success(skills));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillDTO>> updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillDTO skillDTO
    ) {
        SkillDTO updated = skillService.updateSkill(id, skillDTO);
        return ResponseEntity.ok(ApiResponse.success("Skill updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.success("Skill deleted successfully", null));
    }
}
