import { apiRequest } from './apiClient';
import type { CertificationItem } from '../types/portfolio';

export interface CertificationDTO {
  id?: number;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl: string;
  badgeText?: string;
  displayOrder?: number;
  skills?: string[];
}

export const certificationService = {
  async getCertifications(): Promise<CertificationItem[]> {
    const response = await apiRequest<CertificationItem[]>('/certifications');
    return response.data || [];
  },

  async createCertification(dto: CertificationDTO): Promise<CertificationItem> {
    const response = await apiRequest<CertificationItem>('/certifications', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async updateCertification(id: number, dto: CertificationDTO): Promise<CertificationItem> {
    const response = await apiRequest<CertificationItem>(`/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async deleteCertification(id: number): Promise<void> {
    await apiRequest<void>(`/certifications/${id}`, {
      method: 'DELETE',
    });
  }
};
