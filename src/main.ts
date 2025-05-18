import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

// Import routes
import routes from './router'

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Create pinia store
const pinia = createPinia()

// Create and mount app
createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')