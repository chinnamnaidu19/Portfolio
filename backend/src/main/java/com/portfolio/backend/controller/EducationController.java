package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.entity.Education;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.EducationRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/education")
@RequiredArgsConstructor
public class EducationController {

    private final EducationRepository educationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Education>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(educationRepository.findAllByOrderByDisplayOrderAsc()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Education>> create(@Valid @RequestBody Education education) {
        Education saved = educationRepository.save(education);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Education added successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Education>> update(@PathVariable Long id, @Valid @RequestBody Education update) {
        Education edu = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education not found with id: " + id));
        edu.setDegree(update.getDegree());
        edu.setField(update.getField());
        edu.setInstitution(update.getInstitution());
        edu.setLocation(update.getLocation());
        edu.setPeriod(update.getPeriod());
        edu.setGrade(update.getGrade());
        edu.setDisplayOrder(update.getDisplayOrder());
        edu.setCoursework(update.getCoursework());
        edu.setHighlights(update.getHighlights());
        return ResponseEntity.ok(ApiResponse.success("Education updated successfully", educationRepository.save(edu)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education not found with id: " + id);
        }
        educationRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Education deleted successfully", null));
    }
}
