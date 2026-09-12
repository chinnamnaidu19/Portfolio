/**
 * Public API Client for Portfolio Communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8088/api/v1';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json().catch(() => ({
      success: response.ok,
      message: response.statusText,
      data: null as unknown as T
    }));

    if (!response.ok) {
      throw new ApiError(data.message || `Request failed with status ${response.status}`, response.status, data.data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error or backend unavailable',
      0
    );
  }
};
