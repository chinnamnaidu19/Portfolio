package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final SkillCategoryRepository skillCategoryRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCompletePortfolio() {
        Map<String, Object> data = new HashMap<>();
        data.put("skillCategories", skillCategoryRepository.findAllWithSkillsOrdered());
        data.put("projects", projectRepository.findAllByOrderByDisplayOrderAsc());
        data.put("experience", experienceRepository.findAllByOrderByDisplayOrderAsc());
        data.put("education", educationRepository.findAllByOrderByDisplayOrderAsc());
        data.put("certifications", certificationRepository.findAllByOrderByDisplayOrderAsc());

        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
