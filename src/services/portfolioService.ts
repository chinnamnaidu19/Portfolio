import { apiRequest } from './apiClient';

export const portfolioService = {
  async getCompletePortfolio(): Promise<Record<string, unknown>> {
    const response = await apiRequest<Record<string, unknown>>('/portfolio');
    return response.data || {};
  },

  notifyDataChanged(): void {
    window.dispatchEvent(new CustomEvent('portfolio:data-changed'));
  },

  onDataChanged(callback: () => void): () => void {
    const handler = () => callback();
    window.addEventListener('portfolio:data-changed', handler);
    return () => window.removeEventListener('portfolio:data-changed', handler);
  }
};
