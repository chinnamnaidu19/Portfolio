import { apiRequest } from './apiClient';
import type { SkillItem } from '../types/portfolio';

export interface SkillCategoryDTO {
  id?: number;
  category: string;
  description: string;
  displayOrder?: number;
  skills: SkillItem[];
}

export interface SkillDTO {
  id?: number;
  categoryId: number;
  name: string;
  level: string;
  highlight?: boolean;
  displayOrder?: number;
}

export const skillService = {
  async getSkillCategories(): Promise<SkillCategoryDTO[]> {
    const response = await apiRequest<SkillCategoryDTO[]>('/skills/categories');
    return response.data || [];
  },

  async getAllSkills(): Promise<SkillItem[]> {
    const response = await apiRequest<SkillItem[]>('/skills');
    return response.data || [];
  },

  async createSkill(dto: SkillDTO): Promise<SkillItem> {
    const response = await apiRequest<SkillItem>('/skills', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async updateSkill(id: number, dto: SkillDTO): Promise<SkillItem> {
    const response = await apiRequest<SkillItem>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async deleteSkill(id: number): Promise<void> {
    await apiRequest<void>(`/skills/${id}`, {
      method: 'DELETE',
    });
  }
};
