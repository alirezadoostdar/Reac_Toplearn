// ─── Auth ────────────────────────────────────────────────────────────────────
export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  refreshToken?: string
  user: User
}

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: 'admin' | 'accountant' | 'viewer'
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  type: 'customer' | 'supplier' | 'both'
  address?: string
  city?: string
  country?: string
  taxId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  type: 'customer' | 'supplier' | 'both'
  address?: string
  city?: string
  country?: string
  taxId?: string
  notes?: string
}

// ─── Bank ────────────────────────────────────────────────────────────────────
export interface Bank {
  id: string
  name: string
  accountNumber: string
  iban?: string
  swift?: string
  currency: string
  branch?: string
  balance: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface BankFormData {
  name: string
  accountNumber: string
  iban?: string
  swift?: string
  currency: string
  branch?: string
  balance: number
  isActive: boolean
}

// ─── API ─────────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}
