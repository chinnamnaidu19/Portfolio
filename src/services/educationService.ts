import { apiRequest } from './apiClient';
import type { EducationItem } from '../types/portfolio';

export interface EducationDTO {
  id?: number;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  displayOrder?: number;
  coursework?: string[];
}

export const educationService = {
  async getEducation(): Promise<EducationItem[]> {
    const response = await apiRequest<EducationItem[]>('/education');
    return response.data || [];
  },

  async createEducation(dto: EducationDTO): Promise<EducationItem> {
    const response = await apiRequest<EducationItem>('/education', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async updateEducation(id: number, dto: EducationDTO): Promise<EducationItem> {
    const response = await apiRequest<EducationItem>(`/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async deleteEducation(id: number): Promise<void> {
    await apiRequest<void>(`/education/${id}`, {
      method: 'DELETE',
    });
  }
};
