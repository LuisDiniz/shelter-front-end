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
  images?: string[]
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
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/c_crop,g_custom/Leo_ywbenz.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/c_crop,g_custom/Leo_ywbenz.jpg']
  },
  {
    id: '2',
    name: 'Malvadinha',
    type: 'cat',
    gender: 'female',
    age: 8,
    description: 'Luna é uma gata muito calma e afetuosa. Ela adora deitar no colo e receber carinho. Está à procura de um lar tranquilo.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/c_crop,g_custom/v1765832945/Malvadinha_wi7n6z.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/c_crop,g_custom/v1765832945/Malvadinha_wi7n6z.jpg']
  },
  {
    id: '3',
    name: 'Dentuças',
    type: 'cat',
    gender: 'female',
    age: 5,
    description: 'Dentuças foi diagnosticada com carcinoma na mandíbula. Dentuças mantém a doença controlada com medicação, segue ativa, brincalhona e cheia de vida, lembrando a todos que viver com esperança é uma forma de vencer todos os dias.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1765875774/Dentuc%CC%A7as_egitih.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/v1765875774/Dentuc%CC%A7as_egitih.jpg']
  },
  {
    id: '4',
    name: 'Palhacinho',
    type: 'cat',
    gender: 'male',
    age: 8,
    description: 'Palhacinho enfrenta um linfoma nos intestinos, faz quimioterapia de 15 em 15 dias e toma corticoide diariamente. Mesmo nos dias mais frágeis, mantém o olhar brilhante e a vontade de dar alegria a quem está por perto. É a prova que coragem e ternura podem andar de mãos dadas.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/IMG_1655_kqeqel',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/IMG_1655_kqeqel','https://res.cloudinary.com/dlqmc28to/image/upload/v1765875774/Palhacinho_fhrbhq.jpg']
  },
  {
    id: '5',
    name: 'Manny',
    type: 'cat',
    gender: 'male',
    age: 3,
    description: 'Manny tem um problema ósseo numa patinha que pode levar à amputação. Ainda assim, não perde a alegria nem a vontade de brincar. Mostra que a verdadeira coragem é seguir em frente, mesmo diante das incertezas.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771244812/IMG_1657_gsuvtg.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/v1771244812/IMG_1657_gsuvtg.jpg','https://res.cloudinary.com/dlqmc28to/image/upload/v1765876377/Manny_ccbyjz.jpg']
  },
  {
    id: '6',
    name: 'Malhadinha',
    type: 'cat',
    gender: 'female',
    age: 3,
    description: 'Nina é uma gata muito independente mas carinhosa. Ela gosta de ter o seu espaço, mas também adora receber atenção.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771370818/Malhadinha_h00xmb.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/v1771370818/Malhadinha_h00xmb.jpg']
  },
  {
    id: '7',
    name: 'Evaristo',
    type: 'cat',
    gender: 'male',
    age: 8,
    description: 'O Evaristo é um lindo e gorducho gatão. Foi adotado em Agosto de 2025, de quem fomos sempre tendo noticias até ao final do ano de 2025, mas infelizmente foi devolvido para a associação magro, pelo branco e olhar triste e teve que ficar internado. O Evaristo é um menino forte temos a certeza que vai recuperar.',
    breed: 'Europeu',
    imageUrl: 'https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-02-15-17-50-10_1_vxruno.jpg',
    images: ['https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-02-15-17-50-10_1_vxruno.jpg']
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