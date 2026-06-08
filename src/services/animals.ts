import type { Animal, AnimalPayload, Gender, Species } from '../types/animal'
import { apiRequest } from './api'

interface ApiAnimal {
  id: number
  name: string
  species: Species
  breed: string | null
  age: number
  gender: Gender
  description: string
  image_url: string
  medical_history: string | null
  vaccinations: string | null
  admission_date: string
}

interface ApiAnimalPayload {
  name: string
  species: Species
  breed: string
  age: number
  gender: Gender
  description: string
  image_url: string
  medical_history: string
  vaccinations: string
}

const defaultAnimalImageUrl = new URL('../assets/logo.png', import.meta.url).href

const mapApiAnimal = (animal: ApiAnimal): Animal => ({
  id: animal.id.toString(),
  name: animal.name,
  species: animal.species,
  gender: animal.gender,
  age: animal.age,
  description: animal.description || '',
  breed: animal.breed || '',
  imageUrl: animal.image_url || defaultAnimalImageUrl,
  medicalHistory: animal.medical_history || '',
  vaccinations: animal.vaccinations || '',
  admissionDate: animal.admission_date,
})

const mapAnimalPayload = (animal: Partial<AnimalPayload>): Partial<ApiAnimalPayload> => {
  const payload: Partial<ApiAnimalPayload> = {}

  if (animal.name !== undefined) payload.name = animal.name
  if (animal.species !== undefined) payload.species = animal.species
  if (animal.breed !== undefined) payload.breed = animal.breed
  if (animal.age !== undefined) payload.age = animal.age
  if (animal.gender !== undefined) payload.gender = animal.gender
  if (animal.description !== undefined) payload.description = animal.description
  if (animal.imageUrl !== undefined) payload.image_url = animal.imageUrl
  if (animal.medicalHistory !== undefined) payload.medical_history = animal.medicalHistory
  if (animal.vaccinations !== undefined) payload.vaccinations = animal.vaccinations

  return payload
}

const buildAnimalRequestBody = (animal: Partial<AnimalPayload>): Partial<ApiAnimalPayload> | FormData => {
  if (!animal.imageFile) {
    return mapAnimalPayload(animal)
  }

  const payload = mapAnimalPayload(animal)
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, String(value))
  })
  formData.append('image_file', animal.imageFile)

  return formData
}

export const fetchAnimals = async (): Promise<Animal[]> => {
  const animals = await apiRequest<ApiAnimal[]>('/api/animals/')
  return animals.map(mapApiAnimal)
}

export const fetchAnimal = async (id: string): Promise<Animal> => {
  const animal = await apiRequest<ApiAnimal>(`/api/animals/${id}/`)
  return mapApiAnimal(animal)
}

export const createAnimal = async (animal: AnimalPayload, token: string): Promise<Animal> => {
  const createdAnimal = await apiRequest<ApiAnimal>('/api/animals/', {
    method: 'POST',
    body: buildAnimalRequestBody(animal),
    token,
  })

  return mapApiAnimal(createdAnimal)
}

export const updateAnimal = async (
  id: string,
  animal: Partial<AnimalPayload>,
  token: string,
): Promise<Animal> => {
  const updatedAnimal = await apiRequest<ApiAnimal>(`/api/animals/${id}/`, {
    method: 'PATCH',
    body: buildAnimalRequestBody(animal),
    token,
  })

  return mapApiAnimal(updatedAnimal)
}

export const deleteAnimal = async (id: string, token: string): Promise<void> => {
  await apiRequest<void>(`/api/animals/${id}/`, {
    method: 'DELETE',
    token,
  })
}
