import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ApiError } from '../services/api'
import {
  createAnimal as createAnimalRequest,
  deleteAnimal as deleteAnimalRequest,
  fetchAnimal as fetchAnimalRequest,
  fetchAnimals as fetchAnimalsRequest,
  updateAnimal as updateAnimalRequest,
} from '../services/animals'
import type { Animal, AnimalPayload } from '../types/animal'
import { useAuthStore } from './auth'

export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref<Animal[]>([])
  const currentAnimal = ref<Animal | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchAnimals = async () => {
    isLoading.value = true
    error.value = null

    try {
      animals.value = await fetchAnimalsRequest()
    } catch (requestError) {
      error.value = 'Não foi possível carregar os animais.'
      throw requestError
    } finally {
      isLoading.value = false
    }
  }

  const fetchAnimal = async (id: string) => {
    isLoading.value = true
    error.value = null

    try {
      currentAnimal.value = await fetchAnimalRequest(id)
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 404) {
        currentAnimal.value = null
        return
      }

      error.value = 'Não foi possível carregar o animal.'
      throw requestError
    } finally {
      isLoading.value = false
    }
  }

  const createAnimal = async (animal: AnimalPayload) => {
    const createdAnimal = await createAnimalRequest(animal, requireAuthToken())
    animals.value.push(createdAnimal)
  }

  const updateAnimal = async (id: string, updates: Partial<AnimalPayload>) => {
    const updatedAnimal = await updateAnimalRequest(id, updates, requireAuthToken())
    const index = animals.value.findIndex(animal => animal.id === id)

    if (index !== -1) {
      animals.value[index] = updatedAnimal
    }

    if (currentAnimal.value?.id === id) {
      currentAnimal.value = updatedAnimal
    }
  }

  const deleteAnimal = async (id: string) => {
    await deleteAnimalRequest(id, requireAuthToken())
    animals.value = animals.value.filter(animal => animal.id !== id)

    if (currentAnimal.value?.id === id) {
      currentAnimal.value = null
    }
  }

  const requireAuthToken = () => {
    const authStore = useAuthStore()

    if (!authStore.token) {
      throw new Error('Authentication token is required.')
    }

    return authStore.token
  }

  return {
    animals,
    currentAnimal,
    isLoading,
    error,
    fetchAnimals,
    fetchAnimal,
    createAnimal,
    updateAnimal,
    deleteAnimal,
  }
})
