package com.portfolio.backend.service;

import com.portfolio.backend.dto.ProjectDTO;

import java.util.List;

public interface ProjectService {
    ProjectDTO createProject(ProjectDTO projectDTO);
    ProjectDTO getProjectById(Long id);
    ProjectDTO getProjectBySlug(String slug);
    List<ProjectDTO> getAllProjects();
    List<ProjectDTO> getProjectsByCategory(String category);
    ProjectDTO updateProject(Long id, ProjectDTO projectDTO);
    void deleteProject(Long id);
}
