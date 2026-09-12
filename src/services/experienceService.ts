import { apiRequest } from './apiClient';
import type { ExperienceItem } from '../types/portfolio';

export interface ExperienceDTO {
  id?: number;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: string;
  period: string;
  isCurrent?: boolean;
  summary: string;
  displayOrder?: number;
  highlights?: string[];
  technologies?: string[];
}

export const experienceService = {
  async getExperiences(): Promise<ExperienceItem[]> {
    const response = await apiRequest<ExperienceItem[]>('/experience');
    return response.data || [];
  },

  async createExperience(dto: ExperienceDTO): Promise<ExperienceItem> {
    const response = await apiRequest<ExperienceItem>('/experience', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async updateExperience(id: number, dto: ExperienceDTO): Promise<ExperienceItem> {
    const response = await apiRequest<ExperienceItem>(`/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async deleteExperience(id: number): Promise<void> {
    await apiRequest<void>(`/experience/${id}`, {
      method: 'DELETE',
    });
  }
};
