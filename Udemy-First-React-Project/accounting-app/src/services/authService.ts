import apiClient from './apiClient'
import type { LoginCredentials, AuthResponse } from '@/types'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
    // return response.data
    //for test in real below code must be comment
    if (credentials.username === 'admin' && credentials.password === '1234') {
      return {
        token: 'mock-jwt-token-12345',
        user: {
          id: '1',
          username: 'admin',
          email: 'admin@accoflow.com',
          fullName: 'مدیر سیستم',
          role: 'admin',
        },
      }
    }
    throw new Error('Invalid credentials')
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/auth/refresh', {
      refreshToken,
    })
    return response.data
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
}
