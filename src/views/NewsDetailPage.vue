<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNewsStore } from '../stores/news'

const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()

const newsItem = ref(null)
const isLoading = ref(true)
const formattedDate = ref('')

onMounted(async () => {
  const newsId = route.params.id
  
  if (!newsId) {
    router.push('/noticias')
    return
  }

  await newsStore.fetchNewsItem(newsId)
  newsItem.value = newsStore.currentNewsItem
  
  if (!newsItem.value) {
    router.push('/noticias')
    return
  }
  
  // Format date
  const dateObj = new Date(newsItem.value.date)
  formattedDate.value = new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(dateObj)
  
  isLoading.value = false
})

const goBack = () => {
  router.push('/noticias')
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- News Article -->
      <div v-else class="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <!-- Featured Image -->
        <div class="relative">
          <img 
            :src="newsItem.imageUrl" 
            :alt="newsItem.title" 
            class="w-full h-80 object-cover"
          />
          <button 
            @click="goBack"
            class="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 md:p-8">
          <div class="flex items-center text-sm text-secondary-500 mb-4">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formattedDate }}
            </span>
            <span class="mx-2">•</span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {{ newsItem.author }}
            </span>
          </div>

          <h1 class="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">{{ newsItem.title }}</h1>
          
          <div class="prose max-w-none text-secondary-700" v-html="newsItem.content"></div>

          <!-- Tags -->
          <div class="mt-8 flex flex-wrap gap-2">
            <span 
              v-for="tag in newsItem.tags" 
              :key="tag"
              class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Share Buttons -->
          <div class="mt-10 pt-6 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-secondary-800 mb-3">Compartilhar</h3>
            <div class="flex space-x-4">
              <button class="text-blue-600 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </button>
              <button class="text-sky-500 hover:text-sky-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </button>
              <button class="text-green-600 hover:text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.4 3.799l-8.5 17.6-13.1-12.8 21.6-4.8zm.3-.8h-1.8l-18.6 4.1c-.9.2-1.6 1.1-1.5 2 0 .5.2 1 .6 1.4l12.2 11.9c.9.9 2.3.9 3.2 0 .3-.3.5-.7.6-1.1l7.4-15.2c.4-.9.2-2-.6-2.7-.3-.3-.7-.4-1.1-.4z"/>
                </svg>
              </button>
              <button class="text-blue-800 hover:text-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related News -->
      <div v-if="!isLoading && newsStore.relatedNews.length > 0" class="max-w-4xl mx-auto mt-12">
        <h2 class="text-2xl font-bold text-secondary-800 mb-6">Notícias Relacionadas</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="item in newsStore.relatedNews" 
            :key="item.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="viewNewsDetails(item.id)"
          >
            <img :src="item.imageUrl" :alt="item.title" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold text-secondary-800 mb-2 line-clamp-2">{{ item.title }}</h3>
              <p class="text-sm text-secondary-500 mb-2">{{ item.date }}</p>
              <p class="text-sm text-secondary-600 line-clamp-2">{{ item.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>