import { apiRequest } from './apiClient';

export interface AnalyticsStats {
  totalPageViews: number;
  totalProjectViews: number;
  totalArticleViews: number;
  totalResumeDownloads: number;
  totalContactSubmissions: number;
  topViewedProjects?: Record<string, number>;
  topViewedArticles?: Record<string, number>;
}

export const analyticsService = {
  async trackEvent(
    eventType: 'PAGE_VIEW' | 'PROJECT_VIEW' | 'ARTICLE_VIEW' | 'RESUME_DOWNLOAD' | 'CONTACT_SUBMISSION',
    resourceIdentifier?: string,
    pageUrl?: string
  ): Promise<void> {
    try {
      await apiRequest<void>('/analytics/track', {
        method: 'POST',
        body: JSON.stringify({
          eventType,
          resourceIdentifier: resourceIdentifier || window.location.pathname,
          pageUrl: pageUrl || window.location.href,
        })
      });
    } catch {
      // Silent error for privacy & non-blocking client analytics
    }
  },

  async getStats(): Promise<AnalyticsStats | null> {
    try {
      const response = await apiRequest<AnalyticsStats>('/analytics/stats');
      return response.data || null;
    } catch {
      return null;
    }
  }
};
