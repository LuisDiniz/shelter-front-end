<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '../stores/news'
import NewsCard from '../components/news/NewsCard.vue'

const router = useRouter()
const newsStore = useNewsStore()
const isLoading = ref(true)
const searchQuery = ref('')

onMounted(async () => {
  await newsStore.fetchNews()
  isLoading.value = false
})

const filteredNews = computed(() => {
  if (!searchQuery.value) return newsStore.news
  
  const query = searchQuery.value.toLowerCase()
  return newsStore.news.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.excerpt.toLowerCase().includes(query)
  )
})

const viewNewsDetails = (id: string) => {
  router.push(`/noticias/${id}`)
}
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="max-w-4xl mx-auto text-center mb-10">
        <h1 class="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">Notícias</h1>
        <p class="text-lg text-secondary-600">
          Fique por dentro das novidades e eventos do Canil/Gatil Municipal do Seixal
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- News Grid -->
      <div v-else-if="filteredNews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NewsCard 
          v-for="news in filteredNews" 
          :key="news.id" 
          :news="news"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-lg shadow-md p-8 text-center max-w-xl mx-auto">
        <div class="text-secondary-400 text-6xl mb-4">📰</div>
        <h3 class="text-xl font-semibold text-secondary-800 mb-2">Nenhuma notícia encontrada</h3>
        <p class="text-secondary-600 mb-4">
          Não encontramos nenhuma notícia correspondente à sua busca.
        </p>
        <button 
          @click="searchQuery = ''"
          class="btn btn-secondary"
        >
          Limpar busca
        </button>
      </div>
    </div>
  </div>
</template>