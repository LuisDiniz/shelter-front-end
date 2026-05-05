<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageModal from '../common/ImageModal.vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const isImageModalOpen = ref(false)

const formattedDate = computed(() => {
  const date = new Date(props.news.date)
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
})

const viewDetails = () => {
  router.push(`/noticias/${props.news.id}`)
}

const openImageModal = (e: MouseEvent) => {
  e.stopPropagation()
  isImageModalOpen.value = true
}

const closeImageModal = () => {
  isImageModalOpen.value = false
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    @click="viewDetails"
  >
    <div class="relative h-48 overflow-hidden group">
      <img
        :src="news.imageUrl"
        :alt="news.title"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <button
        @click="openImageModal"
        class="absolute top-3 right-3 bg-white/90 hover:bg-white text-secondary-800 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:shadow-xl"
        aria-label="Expandir imagem"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6v4m0-4l4-4m-4 4L6 2m4 4h4v4m0-4l4-4m-4 4l4 4M10 18H6v-4m0 4l-4 4m4-4l4 4m8-18h-4v4m0-4l4-4m-4 4l4-4m-4 4h4v4m0-4l4-4m-4 4l4 4" />
        </svg>
      </button>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div class="text-white text-xs font-medium">{{ formattedDate }}</div>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold text-secondary-800 mb-2 line-clamp-2">{{ news.title }}</h3>
      <p class="text-secondary-600 text-sm mb-4 line-clamp-3">{{ news.excerpt }}</p>
      <div class="flex items-center justify-between">
        <div class="text-sm text-secondary-500">
          Por {{ news.author }}
        </div>
        <button 
          class="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          @click.stop="viewDetails"
        >
          Ler mais
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <ImageModal
    :isOpen="isImageModalOpen"
    :imageUrl="news.imageUrl"
    :altText="news.title"
    @close="closeImageModal"
  />
</template>