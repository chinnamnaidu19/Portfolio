package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.entity.Certification;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.CertificationRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certifications")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationRepository certificationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Certification>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success(certificationRepository.findAllByOrderByDisplayOrderAsc()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Certification>> create(@Valid @RequestBody Certification cert) {
        Certification saved = certificationRepository.save(cert);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Certification added successfully", saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Certification>> update(@PathVariable Long id, @Valid @RequestBody Certification update) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
        cert.setTitle(update.getTitle());
        cert.setIssuer(update.getIssuer());
        cert.setIssueDate(update.getIssueDate());
        cert.setExpiryDate(update.getExpiryDate());
        cert.setCredentialId(update.getCredentialId());
        cert.setCredentialUrl(update.getCredentialUrl());
        cert.setBadgeText(update.getBadgeText());
        cert.setDisplayOrder(update.getDisplayOrder());
        cert.setSkills(update.getSkills());
        return ResponseEntity.ok(ApiResponse.success("Certification updated successfully", certificationRepository.save(cert)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification not found with id: " + id);
        }
        certificationRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Certification deleted successfully", null));
    }
}
