import { apiRequest } from './apiClient';
import type { ProjectItem } from '../types/portfolio';

export interface ProjectDTO {
  id?: number;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  longDescription?: string;
  image?: string;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  displayOrder?: number;
  technologies?: string[];
  features?: string[];
}

export const projectService = {
  async getProjects(): Promise<ProjectItem[]> {
    const response = await apiRequest<ProjectItem[]>('/projects');
    return response.data || [];
  },

  async getProjectBySlug(slug: string): Promise<ProjectItem | null> {
    const response = await apiRequest<ProjectItem>(`/projects/slug/${slug}`);
    return response.data || null;
  },

  async createProject(dto: ProjectDTO): Promise<ProjectItem> {
    const response = await apiRequest<ProjectItem>('/projects', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async updateProject(id: number, dto: ProjectDTO): Promise<ProjectItem> {
    const response = await apiRequest<ProjectItem>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await apiRequest<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }
};
