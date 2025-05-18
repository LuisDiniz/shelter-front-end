<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const loginError = ref('')

// Define validation schema
const schema = yup.object({
  username: yup.string().required('Utilizador é obrigatório'),
  password: yup.string().required('A senha é obrigatória')
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  loginError.value = ''
  
  try {
    const success = await authStore.login(values.username, values.password)
    
    if (success) {
      router.push('/admin')
    } else {
      loginError.value = 'Credenciais inválidas. Por favor, tente novamente.'
    }
  } catch (error) {
    console.error('Error during login:', error)
    loginError.value = 'Ocorreu um erro durante o login. Por favor, tente novamente.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="bg-gray-50 py-12 min-h-[80vh] flex items-center">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-primary-500 p-6 text-white text-center">
            <h1 class="text-2xl font-bold">Entrar no Sistema</h1>
            <p class="mt-2">Acesso para administradores</p>
          </div>

          <div class="p-6">
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Username Field -->
              <div>
                <label for="username" class="block text-sm font-medium text-secondary-700 mb-1">Utilizador</label>
                <Field name="username" v-slot="{ field, errorMessage }">
                  <input 
                    type="text" 
                    id="username"
                    v-bind="field"
                    class="input-field"
                    :class="{ 'border-error-500 focus:ring-error-500': errorMessage }"
                    autocomplete="username"
                  />
                  <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                </Field>
              </div>

              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-medium text-secondary-700 mb-1">Senha</label>
                <Field name="password" v-slot="{ field, errorMessage }">
                  <input 
                    type="password" 
                    id="password"
                    v-bind="field"
                    class="input-field"
                    :class="{ 'border-error-500 focus:ring-error-500': errorMessage }"
                    autocomplete="current-password"
                  />
                  <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                </Field>
              </div>

              <!-- Login Error -->
              <div v-if="loginError" class="bg-error-100 border border-error-200 text-error-700 px-4 py-3 rounded">
                {{ loginError }}
              </div>

              <!-- Submit Button -->
              <div>
                <button 
                  type="submit" 
                  class="btn btn-primary w-full"
                  :disabled="isLoading"
                >
                  <span v-if="isLoading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                  <span v-else>Entrar</span>
                </button>
              </div>

              <!-- Forgot Password Link -->
              <div class="text-center">
                <a href="#" class="text-sm text-primary-600 hover:text-primary-700">
                  Esqueceu sua senha?
                </a>
              </div>
            </form>
          </div>
        </div>

        <div class="mt-8 text-center text-sm text-secondary-600">
          <p>Este acesso é restrito aos administradores do canil.</p>
          <p class="mt-2">
            Precisa de ajuda? Entre em contato com 
            <a href="mailto:suporte@canilseixal.pt" class="text-primary-600 hover:text-primary-700">suporte@canilseixal.pt</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>