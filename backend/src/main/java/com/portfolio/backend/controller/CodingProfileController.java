package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.entity.CodingProfile;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.CodingProfileRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coding-profiles")
@RequiredArgsConstructor
public class CodingProfileController {

    private final CodingProfileRepository codingProfileRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CodingProfile>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(codingProfileRepository.findAllByOrderByDisplayOrderAsc()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CodingProfile>> create(@Valid @RequestBody CodingProfile profile) {
        CodingProfile saved = codingProfileRepository.save(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Coding profile added successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CodingProfile>> update(@PathVariable Long id, @Valid @RequestBody CodingProfile update) {
        CodingProfile cp = codingProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Coding profile not found with id: " + id));
        cp.setPlatform(update.getPlatform());
        cp.setUsername(update.getUsername());
        cp.setProfileUrl(update.getProfileUrl());
        cp.setHeadline(update.getHeadline());
        cp.setRankOrScore(update.getRankOrScore());
        cp.setSolvedCount(update.getSolvedCount());
        cp.setAccentColor(update.getAccentColor());
        cp.setDisplayOrder(update.getDisplayOrder());
        cp.setBadges(update.getBadges());
        return ResponseEntity.ok(ApiResponse.success("Coding profile updated successfully", codingProfileRepository.save(cp)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        if (!codingProfileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Coding profile not found with id: " + id);
        }
        codingProfileRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Coding profile deleted successfully", null));
    }
}
