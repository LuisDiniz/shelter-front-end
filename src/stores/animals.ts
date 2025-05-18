import { defineStore } from 'pinia'
import { ref } from 'vue'

// Types
interface Animal {
  id: string
  name: string
  type: 'dog' | 'cat'
  gender: 'male' | 'female'
  age: number
  description: string
  breed: string
  imageUrl: string
}

// Mock data for animals
const mockAnimals: Animal[] = [
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    gender: 'male',
    age: 3,
    description: 'Max é um cão muito carinhoso e brincalhão. Ele adora correr e brincar com bolas. É muito sociável com pessoas e outros cães.',
    breed: 'Labrador',
    imageUrl: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg'
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    gender: 'female',
    age: 2,
    description: 'Luna é uma gata muito calma e afetuosa. Ela adora deitar no colo e receber carinho. Está à procura de um lar tranquilo.',
    breed: 'Siamês',
    imageUrl: 'https://images.pexels.com/photos/1521304/pexels-photo-1521304.jpeg'
  },
  {
    id: '3',
    name: 'Rex',
    type: 'dog',
    gender: 'male',
    age: 5,
    description: 'Rex é um cão de guarda muito leal e protetor. Ele precisa de um dono experiente que o ajude a canalizar a sua energia.',
    breed: 'Pastor Alemão',
    imageUrl: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg'
  },
  {
    id: '4',
    name: 'Mia',
    type: 'cat',
    gender: 'female',
    age: 1,
    description: 'Mia é uma gatinha muito brincalhona e curiosa. Ela adora explorar e brincar com brinquedos. É muito sociável.',
    breed: 'Persa',
    imageUrl: 'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg'
  },
  {
    id: '5',
    name: 'Thor',
    type: 'dog',
    gender: 'male',
    age: 4,
    description: 'Thor é um cão muito forte e energético. Ele adora fazer caminhadas e correr. Precisa de espaço para se exercitar.',
    breed: 'Husky',
    imageUrl: 'https://images.pexels.com/photos/2853422/pexels-photo-2853422.jpeg'
  },
  {
    id: '6',
    name: 'Nina',
    type: 'cat',
    gender: 'female',
    age: 3,
    description: 'Nina é uma gata muito independente mas carinhosa. Ela gosta de ter o seu espaço, mas também adora receber atenção.',
    breed: 'Ragdoll',
    imageUrl: 'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg'
  }
]

export const useAnimalsStore = defineStore('animals', () => {
  const animals = ref<Animal[]>([])
  const currentAnimal = ref<Animal | null>(null)

  // Fetch all animals
  const fetchAnimals = async () => {
    // In a real app, this would be an API call
    animals.value = [...mockAnimals]
  }

  // Fetch a single animal
  const fetchAnimal = async (id: string) => {
    // In a real app, this would be an API call
    const animal = mockAnimals.find(a => a.id === id)
    currentAnimal.value = animal || null
  }

  // Add a new animal
  const addAnimal = async (animal: Omit<Animal, 'id'>) => {
    // In a real app, this would be an API call
    const newAnimal = {
      ...animal,
      id: Date.now().toString()
    }
    animals.value.push(newAnimal)
  }

  // Update an animal
  const updateAnimal = async (id: string, updates: Partial<Animal>) => {
    // In a real app, this would be an API call
    const index = animals.value.findIndex(a => a.id === id)
    if (index !== -1) {
      animals.value[index] = { ...animals.value[index], ...updates }
    }
  }

  // Delete an animal
  const deleteAnimal = async (id: string) => {
    // In a real app, this would be an API call
    animals.value = animals.value.filter(a => a.id !== id)
  }

  return {
    animals,
    currentAnimal,
    fetchAnimals,
    fetchAnimal,
    addAnimal,
    updateAnimal,
    deleteAnimal
  }
})