import { apiRequest } from './apiClient';

export interface ContactMessageDTO {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'UNREAD' | 'READ' | 'RESPONDED' | 'ARCHIVED';
  ipAddress?: string;
  createdAt?: string;
}

export const contactService = {
  async submitContactMessage(dto: { name: string; email: string; subject: string; message: string }): Promise<ContactMessageDTO> {
    const response = await apiRequest<ContactMessageDTO>('/contact', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.data;
  },

  async getAllMessages(): Promise<ContactMessageDTO[]> {
    const response = await apiRequest<ContactMessageDTO[]>('/contact');
    return response.data || [];
  },

  async getMessageById(id: number): Promise<ContactMessageDTO> {
    const response = await apiRequest<ContactMessageDTO>(`/contact/${id}`);
    return response.data;
  },

  async updateMessageStatus(id: number, status: string): Promise<void> {
    await apiRequest<void>(`/contact/${id}/status?status=${encodeURIComponent(status)}`, {
      method: 'PATCH',
    });
  },

  async deleteMessage(id: number): Promise<void> {
    await apiRequest<void>(`/contact/${id}`, {
      method: 'DELETE',
    });
  }
};
