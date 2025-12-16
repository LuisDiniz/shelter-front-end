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
    name: 'Léo',
    type: 'cat',
    gender: 'male',
    age: 5,
    description: 'Max é um cão muito carinhoso e brincalhão. Ele adora correr e brincar com bolas. É muito sociável com pessoas e outros cães.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765832946/Leo_ywbenz.jpg'
  },
  {
    id: '2',
    name: 'Malvadinha',
    type: 'cat',
    gender: 'female',
    age: 8,
    description: 'Luna é uma gata muito calma e afetuosa. Ela adora deitar no colo e receber carinho. Está à procura de um lar tranquilo.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765832945/Malvadinha_wi7n6z.jpg'
  },
  {
    id: '3',
    name: 'Dentuças',
    type: 'cat',
    gender: 'female',
    age: 5,
    description: 'Rex é um cão de guarda muito leal e protetor. Ele precisa de um dono experiente que o ajude a canalizar a sua energia.',
    breed: 'Pastor Alemão',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765875774/Dentuc%CC%A7as_egitih.jpg'
  },  
  {
    id: '4',
    name: 'Palhacinho',
    type: 'cat',
    gender: 'male',
    age: 8,
    description: 'Thor é um cão muito forte e energético. Ele adora fazer caminhadas e correr. Precisa de espaço para se exercitar.',
    breed: 'Husky',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765875774/Palhacinho_fhrbhq.jpg'
  },
  {
    id: '5',
    name: 'Manny',
    type: 'cat',
    gender: 'male',
    age: 3,
    description: 'Nina é uma gata muito independente mas carinhosa. Ela gosta de ter o seu espaço, mas também adora receber atenção.',
    breed: 'Ragdoll',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765876377/Manny_ccbyjz.jpg'
  },
  {
    id: '6',
    name: 'Malhadinha',
    type: 'cat',
    gender: 'female',
    age: 3,
    description: 'Nina é uma gata muito independente mas carinhosa. Ela gosta de ter o seu espaço, mas também adora receber atenção.',
    breed: 'Ragdoll',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765876375/Malhadinha_trulge.jpg'
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