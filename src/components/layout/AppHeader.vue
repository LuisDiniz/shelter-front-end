<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (route: string) => {
  router.push(route)
  isMobileMenuOpen.value = false
}

const handleLogin = () => {
  if (authStore.isLoggedIn) {
    authStore.logout()
    router.push('/')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="/src/assets/logo.png" alt="Logo" class="h-12 w-auto mr-2" />
            <div class="text-secondary-800 font-semibold max-w-[200px] sm:max-w-none">
              <span class="text-xs sm:text-sm block leading-tight">Grupo de voluntários no</span>
              <span class="text-sm sm:text-base block leading-tight">Canil-Gatil Municipal do Seixal</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-6 items-center">
          <router-link to="/" class="text-secondary-800 hover:text-primary-500 font-medium transition-colors">
            Início
          </router-link>
          <router-link to="/animais" class="text-secondary-800 hover:text-primary-500 font-medium transition-colors">
            Os Nossos Animais
          </router-link>
          <router-link to="/como-ajudar" class="text-secondary-800 hover:text-primary-500 font-medium transition-colors">
            Como Ajudar
          </router-link>
          <router-link to="/historia" class="text-secondary-800 hover:text-primary-500 font-medium transition-colors">
            História
          </router-link>
          <router-link to="/noticias" class="text-secondary-800 hover:text-primary-500 font-medium transition-colors">
            Notícias
          </router-link>
          <button 
            @click="handleLogin"
            class="btn btn-primary ml-4 text-sm"
          >
            {{ authStore.isLoggedIn ? 'Sair' : 'Iniciar sessão' }}
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            @click="toggleMobileMenu" 
            class="text-secondary-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="isMobileMenuOpen" 
      class="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0"
    >
      <div class="container mx-auto px-4 py-3">
        <div class="flex flex-col space-y-3">
          <button 
            @click="() => navigateTo('/')"
            class="text-secondary-800 hover:text-primary-500 font-medium py-2 text-left"
          >
            Início
          </button>
          <button 
            @click="() => navigateTo('/animais')"
            class="text-secondary-800 hover:text-primary-500 font-medium py-2 text-left"
          >
            Os Nossos Animais
          </button>
          <button 
            @click="() => navigateTo('/como-ajudar')"
            class="text-secondary-800 hover:text-primary-500 font-medium py-2 text-left"
          >
            Como Ajudar
          </button>
          <button 
            @click="() => navigateTo('/historia')"
            class="text-secondary-800 hover:text-primary-500 font-medium py-2 text-left"
          >
            História
          </button>
          <button 
            @click="() => navigateTo('/noticias')"
            class="text-secondary-800 hover:text-primary-500 font-medium py-2 text-left"
          >
            Notícias
          </button>
          <button 
            @click="handleLogin"
            class="btn btn-primary w-full text-sm mt-4"
          >
            {{ authStore.isLoggedIn ? 'Sair' : 'Entrar no sistema' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>