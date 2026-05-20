import apiClient from './apiClient'
import type { Bank, BankFormData, PaginatedResponse } from '@/types'

export const banksService = {
  getAll: async (page = 1, pageSize = 20, search?: string): Promise<PaginatedResponse<Bank>> => {
    const response = await apiClient.get<PaginatedResponse<Bank>>('/banks', {
      params: { page, pageSize, search },
    })
    return response.data
  },

  getById: async (id: string): Promise<Bank> => {
    const response = await apiClient.get<Bank>(`/banks/${id}`)
    return response.data
  },

  create: async (data: BankFormData): Promise<Bank> => {
    const response = await apiClient.post<Bank>('/banks', data)
    return response.data
  },

  update: async (id: string, data: BankFormData): Promise<Bank> => {
    const response = await apiClient.put<Bank>(`/banks/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/banks/${id}`)
  },
}
