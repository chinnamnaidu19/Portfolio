package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.entity.Experience;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.ExperienceRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experience")
@RequiredArgsConstructor
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Experience>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(experienceRepository.findAllByOrderByDisplayOrderAsc()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Experience>> create(@Valid @RequestBody Experience experience) {
        Experience saved = experienceRepository.save(experience);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Experience added successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Experience>> update(@PathVariable Long id, @Valid @RequestBody Experience update) {
        Experience exp = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        exp.setRole(update.getRole());
        exp.setCompany(update.getCompany());
        exp.setCompanyUrl(update.getCompanyUrl());
        exp.setLocation(update.getLocation());
        exp.setType(update.getType());
        exp.setPeriod(update.getPeriod());
        exp.setIsCurrent(update.getIsCurrent());
        exp.setSummary(update.getSummary());
        exp.setDisplayOrder(update.getDisplayOrder());
        exp.setHighlights(update.getHighlights());
        exp.setTechnologies(update.getTechnologies());
        return ResponseEntity.ok(ApiResponse.success("Experience updated successfully", experienceRepository.save(exp)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        if (!experienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Experience not found with id: " + id);
        }
        experienceRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Experience deleted successfully", null));
    }
}
