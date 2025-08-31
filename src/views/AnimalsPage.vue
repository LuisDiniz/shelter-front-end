<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAnimalsStore } from '../stores/animals'
import AnimalCard from '../components/animals/AnimalCard.vue'

const animalsStore = useAnimalsStore()

const searchQuery = ref('')
const selectedAnimalType = ref('all')
const selectedGender = ref('all')

const animalTypes = ref([
  { value: 'all', label: 'Todos' },
  { value: 'dog', label: 'Cães' },
  { value: 'cat', label: 'Gatos' }
])

const genders = ref([
  { value: 'all', label: 'Todos' },
  { value: 'male', label: 'Macho' },
  { value: 'female', label: 'Fêmea' }
])

onMounted(async () => {
  await animalsStore.fetchAnimals()
})

const filteredAnimals = computed(() => {
  let animals = animalsStore.animals

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    animals = animals.filter(animal => 
      animal.name.toLowerCase().includes(query) || 
      animal.description.toLowerCase().includes(query)
    )
  }

  // Apply animal type filter
  if (selectedAnimalType.value !== 'all') {
    animals = animals.filter(animal => animal.type === selectedAnimalType.value)
  }

  // Apply gender filter
  if (selectedGender.value !== 'all') {
    animals = animals.filter(animal => animal.gender === selectedGender.value)
  }

  return animals
})
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">Os Nossos Animais</h1>
        <p class="text-lg text-secondary-600 max-w-3xl mx-auto">
          Descubra os animais que esperam com esperança por uma família. Adopte ou apadrinhe e transforme a vida de um deles.
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-10">
        <div class="flex flex-col md:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-secondary-700 mb-1">Nome</label>
            <div class="relative">
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                class="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Procurar por nome..."
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-gray-400">
                  🔍
                </span>
              </div>
            </div>
          </div>

          <!-- Animal Type Filter -->
          <div class="flex-1">
            <label for="type" class="block text-sm font-medium text-secondary-700 mb-1">Tipo de Animal</label>
            <div class="relative">
              <select
                id="type"
                v-model="selectedAnimalType"
                class="w-full py-2 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none bg-white pr-10"
              >
                <option v-for="type in animalTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-gray-400">▼</span>
              </div>
            </div>
          </div>

          <!-- Gender Filter -->
          <div class="flex-1">
            <label for="gender" class="block text-sm font-medium text-secondary-700 mb-1">Sexo</label>
            <div class="relative">
              <select
                id="gender"
                v-model="selectedGender"
                class="w-full py-2 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none bg-white pr-10"
              >
                <option v-for="gender in genders" :key="gender.value" :value="gender.value">
                  {{ gender.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-gray-400">▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Animals Grid -->
      <div v-if="filteredAnimals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimalCard v-for="animal in filteredAnimals" :key="animal.id" :animal="animal" />
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-md p-8 text-center">
        <p class="text-secondary-600 mb-4">Nenhum animal encontrado.</p>
        <button 
          @click="() => { searchQuery = ''; selectedAnimalType = 'all'; selectedGender = 'all'; }"
          class="btn btn-secondary"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>