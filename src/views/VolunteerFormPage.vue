<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const schema = yup.object({
  fullName: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome não pode ter mais de 100 caracteres'),
  email: yup.string()
    .required('E-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  phone: yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\d{9,12}$/, 'Telefone deve ter entre 9 e 12 dígitos')
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    fullName: '',
    email: '',
    phone: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true

  try {
    const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT_VOLUNTEER

    if (!formEndpoint) {
      throw new Error('Form endpoint not configured')
    }

    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Erro ao enviar formulário')
    }

    submitSuccess.value = true
    setTimeout(() => {
      resetForm()
      router.push('/como-ajudar')
    }, 3000)
  } catch (error) {
    alert('Erro ao enviar pedido.')
    console.log('Error submitting form: ', error)
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto">
        <!-- Success Message -->
        <div
          v-if="submitSuccess"
          class="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <div class="bg-success-500/20 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-secondary-800 mb-2">Inscrição enviada com sucesso!</h2>
          <p class="text-secondary-600 mb-6">
            Obrigado pelo seu interesse em voluntariar. Entraremos em contato em breve.
          </p>
          <p class="text-sm text-secondary-500 mb-4">Redirecionando para a página de ajuda...</p>
        </div>

        <!-- Form -->
        <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-primary-500 p-6 text-white">
            <h1 class="text-2xl font-bold">Inscrição de Voluntário</h1>
            <p class="mt-2">
              Por favor, preencha os dados abaixo para se inscrever como voluntário.
            </p>
          </div>

          <div class="p-6">
            <form @submit.prevent="onSubmit" class="space-y-6">
              <!-- Full Name -->
              <div>
                <label for="fullName" class="block text-sm font-medium text-secondary-700 mb-1">Nome</label>
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
                <label for="phone" class="block text-sm font-medium text-secondary-700 mb-1">Telefone</label>
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
                  <span v-else>Enviar inscrição</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
