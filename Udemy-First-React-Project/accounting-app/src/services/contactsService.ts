import apiClient from './apiClient'
import type { Contact, ContactFormData, PaginatedResponse } from '@/types'

export const contactsService = {
  getAll: async (page = 1, pageSize = 20, search?: string): Promise<PaginatedResponse<Contact>> => {
    const response = await apiClient.get<PaginatedResponse<Contact>>('/contacts', {
      params: { page, pageSize, search },
    })
    return response.data
  },

  getById: async (id: string): Promise<Contact> => {
    const response = await apiClient.get<Contact>(`/contacts/${id}`)
    return response.data
  },

  create: async (data: ContactFormData): Promise<Contact> => {
    const response = await apiClient.post<Contact>('/contacts', data)
    return response.data
  },

  update: async (id: string, data: ContactFormData): Promise<Contact> => {
    const response = await apiClient.put<Contact>(`/contacts/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/contacts/${id}`)
  },
}
