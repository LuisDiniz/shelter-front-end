<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimalsStore } from '../stores/animals'
import { useNewsStore } from '../stores/news'
import AnimalCard from '../components/animals/AnimalCard.vue'
import NewsCard from '../components/news/NewsCard.vue'

const router = useRouter()
const animalsStore = useAnimalsStore()
const newsStore = useNewsStore()

const featuredAnimals = ref<typeof animalsStore.animals>([])
const latestNews = ref<typeof newsStore.news>([])

onMounted(async () => {
  // Fetch featured animals and latest news
  await animalsStore.fetchAnimals()
  await newsStore.fetchNews()
  
  featuredAnimals.value = animalsStore.animals.slice(0, 3)
  latestNews.value = newsStore.news.slice(0, 2)
})

const goToPage = (route: string) => {
  router.push(route)
}
</script>

<style scoped>
  .hero-section {
    height: 90vh;
  }
</style>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative hero-section flex items-center justify-center overflow-hidden">
      <!-- Hero Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/dlqmc28to/image/upload/v1765752113/Micas_New_zs3sbh_gr0fna.jpg"
          alt="Happy dog" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <!-- Hero Content -->
      <div class="container relative z-10 text-center text-white px-4">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
          Ajude-nos a transformar <span class="text-primary-400">vidas</span>
        </h1>
        <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
          Adoramos animais de todas as maneiras e feitios (grandes e pequenos, doentes e saudáveis, sossegados e irrequietos) e queremos ajudar os que realmente precisam.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up">
          <router-link to="/animais" class="btn btn-primary text-lg px-8 py-3">
            Conheça os nossos animais
          </router-link>
          <router-link to="/como-ajudar" class="btn bg-white text-secondary-800 hover:bg-gray-100">
            Saiba como ajudar
          </router-link>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-light">
        <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
    
    <!-- Hero Section -->
    <!-- First version
    <section class="relative bg-[#4F4F4F] text-white">
      <div class="absolute inset-0 bg-gradient-to-r from-[#4F4F4F]/90 to-[#4F4F4F]/80"></div>
      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ajude-nos a transformar vidas de animais!
          </h1>
          <p class="text-lg md:text-xl mb-8">
            O Canil/Gatil Municipal do Seixal acolhe animais abandonados e trabalha para encontrar lares permanentes para eles.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button @click="goToPage('/animais')" class="btn btn-primary">
              Conheça nossos animais
            </button>
            <button @click="goToPage('/como-ajudar')" class="btn bg-white text-secondary-800 hover:bg-gray-100">
              Como ajudar
            </button>
          </div>
        </div>
      </div>
    </section> -->

    <!-- Featured Animals Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-secondary-800 mb-2">Os Nossos Animais</h2>
          <p class="text-lg text-secondary-600">
            Conheça alguns dos nossos amigos de quatro patas que aguardam, com esperança no olhar, por uma família que os ame, respeite e cuide como merecem.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimalCard v-for="animal in featuredAnimals" :key="animal.id" :animal="animal" />
        </div>

        <div class="text-center mt-10">
          <button @click="goToPage('/animais')" class="btn btn-secondary">
            Ver todos os animais
          </button>
        </div>
      </div>
    </section>

    <!-- How to Help Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-secondary-800 mb-2">Como Ajudar</h2>
          <p class="text-lg text-secondary-600">
            Existem muitas formas de apoiar o nosso trabalho e fazer a diferença na vida dos animais que cuidamos e protegemos diariamente:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg text-center">
            <div class="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">Donativos</h3>
            <p class="text-secondary-600">
              A sua contribuição financeira permite-nos prestar apoio médico-veterinário aos animais nomeadamente internamentos, cirurgias, consultas, vacinas e medicamentos.
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg text-center">
            <div class="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">Voluntariado</h3>
            <p class="text-secondary-600">
              Ofereça o seu tempo e dedicação. Pode ajudar nas tarefas de limpeza, alimentação, cuidados diários, socialização dos animais e também em ações de sensibilização e apoio em eventos.
            </p>
          </div>

          <div class="bg-gray-50 p-6 rounded-lg text-center">
            <div class="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-secondary-800 mb-2">Apadrinhamento</h3>
            <p class="text-secondary-600">
              Apadrinhe um animal e contribua mensalmente para o seu bem-estar enquanto ele aguarda por uma família definitiva. Receberá actualizações e poderá visitar o seu afilhado.
            </p>
          </div>
        </div>

        <div class="text-center mt-10">
          <button @click="goToPage('/como-ajudar')" class="btn btn-secondary">
            Saiba outras formas de ajudar
          </button>
        </div>
      </div>
    </section>

    <!-- History Section Preview -->
    <section class="py-16 bg-primary-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center gap-8">
          <div class="md:w-1/2">
            <h2 class="text-3xl font-bold text-secondary-800 mb-4">Nossa História</h2>
            <p class="text-lg text-secondary-600 mb-6">
              O Grupo de voluntários no Canil/Gatil Municipal do Seixal tem uma história de dedicação e amor pelos animais.
              Desde a sua fundação, já ajudámos centenas de animais a encontrar um lar amoroso.
            </p>
            <button @click="goToPage('/historia')" class="btn btn-primary">
              Conheça nossa história
            </button>
          </div>
          <div class="md:w-1/2">
            <div class="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
            
              <img src="https://res.cloudinary.com/dlqmc28to/image/upload/v1771242682/PHOTO-2025-09-14-15-31-53_aedog5.jpg" alt="Dogs in Animal Shelter" 
                class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest News Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-secondary-800 mb-2">Últimas Notícias</h2>
          <p class="text-lg text-secondary-600">
            Fique a par das novidades, eventos e iniciativas da nossa associação.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsCard v-for="news in latestNews" :key="news.id" :news="news" />
        </div>

        <div class="text-center mt-10">
          <button @click="goToPage('/noticias')" class="btn btn-secondary">
            Ver todas as notícias
          </button>
        </div>
      </div>
    </section>
  </div>
</template>