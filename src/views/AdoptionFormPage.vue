<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAnimalsStore } from '../stores/animals'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const route = useRoute()
const router = useRouter()
const animalsStore = useAnimalsStore()

const animal = ref(null)
const isLoading = ref(true)
const isSubmitting = ref(false)
const submitSuccess = ref(false)

// Define validation schema
const schema = yup.object({
  fullName: yup.string()
    .required('Nome completo é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres'),
  email: yup.string()
    .required('E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  phone: yup.string()
    .required('Telemóvel é obrigatório')
    .matches(/^\d{9,12}$/, 'Telemóvel deve ter entre 9 e 12 dígitos'),
  requestType: yup.string()
    .required('Por favor, selecione uma opção')
    .oneOf(['adoption', 'sponsorship'], 'Opção inválida')
})

const { handleSubmit, values, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    fullName: '',
    animalName: '',
    email: '',
    phone: '',
    requestType: ''
  }
})

onMounted(async () => {
  const animalId = route.params.id
  
  if (!animalId) {
    router.push('/animais')
    return
  }

  await animalsStore.fetchAnimal(animalId)
  animal.value = animalsStore.currentAnimal
  
  if (animal.value) {
    values.animalName = animal.value.name
  } else {
    router.push('/animais')
  }
  
  isLoading.value = false
})

const requestTypeLabel = computed(() => {
  if (values.requestType === 'adoption') return 'Adoção'
  if (values.requestType === 'sponsorship') return 'Apadrinhamento'
  return ''
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  
  try {
    // In a real app, this would send data to a backend
    console.log('Form submitted:', values)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitSuccess.value = true
    setTimeout(() => {
      resetForm()
      router.push('/animais')
    }, 3000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Loading State -->
        <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p class="mt-4 text-secondary-600">Carregando informações...</p>
        </div>

        <!-- Success Message -->
        <div 
          v-else-if="submitSuccess" 
          class="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <div class="bg-success-500/20 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-secondary-800 mb-2">Pedido enviado com sucesso!</h2>
          <p class="text-secondary-600 mb-6">
            Obrigado pelo seu interesse. Entraremos em contato em breve.
          </p>
          <p class="text-sm text-secondary-500 mb-4">Redirecionando para a página de animais...</p>
        </div>

        <!-- Form -->
        <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-primary-500 p-6 text-white">
            <h1 class="text-2xl font-bold">{{ requestTypeLabel || 'Formulário de Adoção/Apadrinhamento' }}</h1>
            <p class="mt-2">
              Por favor, preencha os dados abaixo para iniciar o processo de {{ requestTypeLabel || 'adoção ou apadrinhamento' }}.
            </p>
          </div>

          <div class="p-6">
            <!-- Animal Information -->
            <div class="mb-8 flex items-center">
              <img 
                :src="animal.imageUrl" 
                :alt="animal.name" 
                class="w-20 h-20 rounded-full object-cover mr-4 border-2 border-primary-500"
              />
              <div>
                <h2 class="text-xl font-semibold text-secondary-800">{{ animal.name }}</h2>
                <p class="text-secondary-600">{{ animal.gender === 'male' ? 'Macho' : 'Fêmea' }} • {{ animal.age }} {{ animal.age === 1 ? 'ano' : 'anos' }}</p>
              </div>
            </div>

            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Full Name -->
              <div>
                <label for="fullName" class="block text-sm font-medium text-secondary-700 mb-1">Nome Completo</label>
                <Field name="fullName" v-slot="{ field, errorMessage, meta }">
                  <input 
                    type="text" 
                    id="fullName"
                    v-bind="field"
                    class="input-field"
                    :class="{ 'border-error-500 focus:ring-error-500': errorMessage, 'border-success-500 focus:ring-success-500': meta.valid && meta.touched }"
                  />
                  <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                </Field>
              </div>

              <!-- Animal Name (Read-only) -->
              <div>
                <label for="animalName" class="block text-sm font-medium text-secondary-700 mb-1">Nome do animal apadrinhado</label>
                <Field name="animalName" v-slot="{ field }">
                  <input 
                    type="text" 
                    id="animalName"
                    v-bind="field"
                    readonly
                    class="input-field bg-gray-50"
                  />
                </Field>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-secondary-700 mb-1">E-mail</label>
                <Field name="email" v-slot="{ field, errorMessage, meta }">
                  <input 
                    type="email" 
                    id="email"
                    v-bind="field"
                    class="input-field"
                    :class="{ 'border-error-500 focus:ring-error-500': errorMessage, 'border-success-500 focus:ring-success-500': meta.valid && meta.touched }"
                  />
                  <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                </Field>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-secondary-700 mb-1">Telemóvel</label>
                <Field name="phone" v-slot="{ field, errorMessage, meta }">
                  <input 
                    type="tel" 
                    id="phone"
                    v-bind="field"
                    class="input-field"
                    :class="{ 'border-error-500 focus:ring-error-500': errorMessage, 'border-success-500 focus:ring-success-500': meta.valid && meta.touched }"
                    maxlength="12"
                  />
                  <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                </Field>
              </div>

              <!-- Request Type -->
              <div>
                <label class="block text-sm font-medium text-secondary-700 mb-1">O que deseja?</label>
                <div class="mt-2 space-y-2">
                  <Field name="requestType" v-slot="{ field, errorMessage }">
                    <div>
                      <label class="flex items-center">
                        <input
                          type="radio"
                          v-bind="field"
                          :value="'adoption'"
                          class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
                        />
                        <span class="ml-2 text-secondary-700">Quero Adotar</span>
                      </label>
                      <label class="flex items-center mt-2">
                        <input
                          type="radio"
                          v-bind="field"
                          :value="'sponsorship'"
                          class="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300"
                        />
                        <span class="ml-2 text-secondary-700">Quero Apadrinhar</span>
                      </label>
                      <p v-if="errorMessage" class="mt-1 text-sm text-error-500">{{ errorMessage }}</p>
                    </div>
                  </Field>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-end">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                  <span v-else>Enviar pedido</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>