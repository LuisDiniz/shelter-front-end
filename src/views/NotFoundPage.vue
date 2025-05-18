<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="bg-gray-50 py-16 min-h-[80vh] flex items-center">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-lg mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-secondary-400 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        <h1 class="text-6xl font-bold text-secondary-800 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-secondary-700 mb-6">Página não encontrada</h2>
        
        <p class="text-lg text-secondary-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        
        <button @click="goHome" class="btn btn-primary">
          Voltar para a página inicial
        </button>
      </div>
    </div>
  </div>
</template>