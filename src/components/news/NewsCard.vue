<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const router = useRouter()

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
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    @click="viewDetails"
  >
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="news.imageUrl" 
        :alt="news.title" 
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
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
</template>