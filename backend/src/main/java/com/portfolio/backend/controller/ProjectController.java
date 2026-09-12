package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ApiResponse;
import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDTO>> createProject(@Valid @RequestBody ProjectDTO projectDTO) {
        ProjectDTO created = projectService.createProject(projectDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Project created successfully", created));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getAllProjects(
            @RequestParam(required = false) String category
    ) {
        List<ProjectDTO> projects = (category != null && !category.equalsIgnoreCase("All"))
                ? projectService.getProjectsByCategory(category)
                : projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success(projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectById(@PathVariable Long id) {
        ProjectDTO project = projectService.getProjectById(id);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectBySlug(@PathVariable String slug) {
        ProjectDTO project = projectService.getProjectBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(project));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDTO>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDTO projectDTO
    ) {
        ProjectDTO updated = projectService.updateProject(id, projectDTO);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }
}
