package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.ProjectDTO;
import com.portfolio.backend.entity.Project;
import com.portfolio.backend.exception.ResourceNotFoundException;
import com.portfolio.backend.repository.ProjectRepository;
import com.portfolio.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional
    public ProjectDTO createProject(ProjectDTO dto) {
        log.info("Creating new project with title: {}", dto.getTitle());
        
        if (projectRepository.existsBySlug(dto.getSlug())) {
            throw new IllegalArgumentException("Project with slug '" + dto.getSlug() + "' already exists");
        }

        Project entity = Project.builder()
                .title(dto.getTitle())
                .slug(dto.getSlug())
                .category(dto.getCategory())
                .tagline(dto.getTagline())
                .shortDescription(dto.getDescription())
                .longDescription(dto.getLongDescription() != null ? dto.getLongDescription() : dto.getDescription())
                .imageUrl(dto.getImage())
                .githubUrl(dto.getGithubUrl())
                .liveUrl(dto.getLiveUrl())
                .isFeatured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .technologies(dto.getTechnologies() != null ? new HashSet<>(dto.getTechnologies()) : new HashSet<>())
                .features(dto.getFeatures() != null ? new ArrayList<>(dto.getFeatures()) : new ArrayList<>())
                .build();

        Project saved = projectRepository.save(entity);
        return mapToDTO(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return mapToDTO(project);
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDTO getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + slug));
        return mapToDTO(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDTO> getProjectsByCategory(String category) {
        return projectRepository.findByCategoryOrderByDisplayOrderAsc(category).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProjectDTO updateProject(Long id, ProjectDTO dto) {
        log.info("Updating project id: {}", id);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        // Check if slug changed and is already taken
        if (!project.getSlug().equals(dto.getSlug()) && projectRepository.existsBySlug(dto.getSlug())) {
            throw new IllegalArgumentException("Project slug '" + dto.getSlug() + "' is already taken");
        }

        project.setTitle(dto.getTitle());
        project.setSlug(dto.getSlug());
        project.setCategory(dto.getCategory());
        project.setTagline(dto.getTagline());
        project.setShortDescription(dto.getDescription());
        project.setLongDescription(dto.getLongDescription());
        project.setImageUrl(dto.getImage());
        project.setGithubUrl(dto.getGithubUrl());
        project.setLiveUrl(dto.getLiveUrl());
        if (dto.getFeatured() != null) project.setIsFeatured(dto.getFeatured());
        if (dto.getDisplayOrder() != null) project.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getTechnologies() != null) project.setTechnologies(new HashSet<>(dto.getTechnologies()));
        if (dto.getFeatures() != null) project.setFeatures(new ArrayList<>(dto.getFeatures()));

        Project updated = projectRepository.save(project);
        return mapToDTO(updated);
    }

    @Override
    @Transactional
    public void deleteProject(Long id) {
        log.info("Deleting project id: {}", id);
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    private ProjectDTO mapToDTO(Project entity) {
        return ProjectDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .category(entity.getCategory())
                .tagline(entity.getTagline())
                .description(entity.getShortDescription())
                .longDescription(entity.getLongDescription())
                .image(entity.getImageUrl())
                .githubUrl(entity.getGithubUrl())
                .liveUrl(entity.getLiveUrl())
                .featured(entity.getIsFeatured())
                .displayOrder(entity.getDisplayOrder())
                .technologies(entity.getTechnologies())
                .features(entity.getFeatures())
                .build();
    }
}
