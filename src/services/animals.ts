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
  images: string[]
  cover_image_url: string
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
  images: ApiAnimalImageManifest[]
  medical_history: string
  vaccinations: string
}

interface ApiAnimalImageManifest {
  url?: string
  file_key?: string
  is_cover: boolean
}

const defaultAnimalImageUrl = new URL('../assets/logo.png', import.meta.url).href

const mapApiAnimal = (animal: ApiAnimal): Animal => {
  const images = (animal.images || []).filter(Boolean)
  const coverImageUrl = animal.cover_image_url || images[0] || defaultAnimalImageUrl

  return {
    id: animal.id.toString(),
    name: animal.name,
    species: animal.species,
    gender: animal.gender,
    age: animal.age,
    description: animal.description || '',
    breed: animal.breed || '',
    coverImageUrl,
    images,
    medicalHistory: animal.medical_history || '',
    vaccinations: animal.vaccinations || '',
    admissionDate: animal.admission_date,
  }
}

const mapAnimalPayload = (animal: Partial<AnimalPayload>): Partial<ApiAnimalPayload> => {
  const payload: Partial<ApiAnimalPayload> = {}

  if (animal.name !== undefined) payload.name = animal.name
  if (animal.species !== undefined) payload.species = animal.species
  if (animal.breed !== undefined) payload.breed = animal.breed
  if (animal.age !== undefined) payload.age = animal.age
  if (animal.gender !== undefined) payload.gender = animal.gender
  if (animal.description !== undefined) payload.description = animal.description
  if (animal.medicalHistory !== undefined) payload.medical_history = animal.medicalHistory
  if (animal.vaccinations !== undefined) payload.vaccinations = animal.vaccinations

  return payload
}

const buildAnimalRequestBody = (animal: Partial<AnimalPayload>): Partial<ApiAnimalPayload> | FormData => {
  const images = animal.images || []
  const hasImageFiles = images.some(image => 'file' in image)
  const imageManifest: ApiAnimalImageManifest[] = images.map((image, index) => {
    if ('file' in image) {
      return {
        file_key: `image_${index}`,
        is_cover: image.isCover,
      }
    }

    return {
      url: image.url,
      is_cover: image.isCover,
    }
  })

  if (!hasImageFiles) {
    const payload = mapAnimalPayload(animal)

    if (animal.images !== undefined) {
      payload.images = imageManifest
    }

    return payload
  }

  const payload = {
    ...mapAnimalPayload(animal),
    images: imageManifest,
  }
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return

    if (key === 'images') {
      formData.append(key, JSON.stringify(value))
      return
    }

    formData.append(key, String(value))
  })

  images.forEach((image, index) => {
    if ('file' in image) {
      formData.append(`image_${index}`, image.file)
    }
  })

  return formData
}

export const fetchAnimals = async (): Promise<Animal[]> => {
  const animals = await apiRequest<ApiAnimal[]>('/api/animals')
  return animals.map(mapApiAnimal)
}

export const fetchAnimal = async (id: string): Promise<Animal> => {
  const animal = await apiRequest<ApiAnimal>(`/api/animals/${id}`)
  return mapApiAnimal(animal)
}

export const createAnimal = async (animal: AnimalPayload, token: string): Promise<Animal> => {
  const createdAnimal = await apiRequest<ApiAnimal>('/api/animals', {
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
  const updatedAnimal = await apiRequest<ApiAnimal>(`/api/animals/${id}`, {
    method: 'PATCH',
    body: buildAnimalRequestBody(animal),
    token,
  })

  return mapApiAnimal(updatedAnimal)
}

export const deleteAnimal = async (id: string, token: string): Promise<void> => {
  await apiRequest<void>(`/api/animals/${id}`, {
    method: 'DELETE',
    token,
  })
}
