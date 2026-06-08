import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { apiRequest } from '../services/api'
import type { User } from '../types/auth'

interface ApiUser {
  id: string
  username: string
  name: string
  role: string
  is_staff: boolean
  is_superuser: boolean
}

interface AuthResponse {
  token: string
  user: ApiUser
}

const tokenStorageKey = 'shelter_auth_token'
const userStorageKey = 'shelter_auth_user'

const mapApiUser = (user: ApiUser): User => ({
  id: user.id,
  username: user.username,
  name: user.name,
  role: user.role,
  isStaff: user.is_staff,
  isSuperuser: user.is_superuser,
})

const readStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(userStorageKey)

  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as User
  } catch {
    localStorage.removeItem(userStorageKey)
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(tokenStorageKey))
  const user = ref<User | null>(readStoredUser())
  const isLoggedIn = computed(() => Boolean(token.value && user.value))

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await apiRequest<AuthResponse>('/api/auth/token/', {
        method: 'POST',
        body: { username, password },
      })
      const authenticatedUser = mapApiUser(response.user)

      token.value = response.token
      user.value = authenticatedUser
      localStorage.setItem(tokenStorageKey, response.token)
      localStorage.setItem(userStorageKey, JSON.stringify(authenticatedUser))

      return true
    } catch {
      logout()
      return false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem(tokenStorageKey)
    localStorage.removeItem(userStorageKey)
  }

  return {
    token,
    user,
    isLoggedIn,
    login,
    logout,
  }
})
