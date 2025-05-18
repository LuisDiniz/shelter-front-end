import { defineStore } from 'pinia'
import { ref } from 'vue'

// Types
interface User {
  id: string
  username: string
  name: string
  role: string
}

// Mock user data
const mockUser: User = {
  id: '1',
  username: 'admin',
  name: 'Administrador',
  role: 'admin'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  // Login
  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // For demo purposes, we'll just check if username is 'admin' and password is 'admin123'
    if (username === 'admin' && password === 'admin123') {
      user.value = mockUser
      isLoggedIn.value = true
      return true
    }
    return false
  }

  // Logout
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
  }

  return {
    user,
    isLoggedIn,
    login,
    logout
  }
})