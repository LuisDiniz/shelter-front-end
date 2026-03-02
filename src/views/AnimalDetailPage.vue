<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimalsStore } from '../stores/animals'
import ImageCarousel from '../components/animals/ImageCarousel.vue'

const route = useRoute()
const router = useRouter()
const animalsStore = useAnimalsStore()

const isLoading = ref(true)

const animal = computed(() => animalsStore.currentAnimal)

const animalGender = computed(() => {
  return animal.value?.gender === 'male' ? 'Macho' : 'Fêmea'
})

const animalType = computed(() => {
  return animal.value?.type === 'dog' ? 'Cão' : 'Gato'
})

const carouselImages = computed(() => {
  return animal.value?.images || [animal.value?.imageUrl || '']
})

onMounted(async () => {
  const animalId = route.params.id as string

  if (!animalId) {
    router.push('/animais')
    return
  }

  await animalsStore.fetchAnimal(animalId)

  if (!animal.value) {
    router.push('/animais')
    return
  }

  isLoading.value = false
})

const goBack = () => {
  router.push('/animais')
}

const adoptAnimal = () => {
  router.push(`/adotar/${animal.value?.id}`)
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <div v-else class="max-w-4xl mx-auto">
        <button
          @click="goBack"
          class="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          aria-label="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <ImageCarousel :images="carouselImages" :alt-text="animal?.name || 'Animal'" />

          <div class="p-6 md:p-8">
            <div class="flex items-start justify-between mb-4 gap-4">
              <div class="flex-1">
                <h1 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-3">{{ animal?.name }}</h1>
                <p class="text-gray-600 text-lg">{{ animal?.breed }}</p>
              </div>
              <div class="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium">
                {{ animalType }}
              </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="text-sm text-gray-600 mb-1">Sexo</p>
                <p class="text-lg font-semibold text-secondary-800">{{ animalGender }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">Idade</p>
                <p class="text-lg font-semibold text-secondary-800">{{ animal?.age }} {{ animal?.age === 1 ? 'ano' : 'anos' }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-1">Raça</p>
                <p class="text-lg font-semibold text-secondary-800">{{ animal?.breed }}</p>
              </div>
            </div>

            <div class="mb-8">
              <h2 class="text-xl font-bold text-secondary-800 mb-3">Sobre</h2>
              <p class="text-secondary-700 leading-relaxed text-lg">
                {{ animal?.description }}
              </p>
            </div>

            <button
              @click="adoptAnimal"
              class="btn btn-primary w-full md:w-auto md:px-12 py-3 text-lg"
            >
              Adoptar ou Apadrinhar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
