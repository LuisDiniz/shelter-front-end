<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAnimalsStore } from '../stores/animals'
import { useNewsStore } from '../stores/news'

const router = useRouter()
const authStore = useAuthStore()
const animalsStore = useAnimalsStore()
const newsStore = useNewsStore()

// Navigation
const activeTab = ref('animals')

// Animal form
const animalForm = ref({
  id: '',
  name: '',
  type: 'dog',
  gender: 'male',
  age: 1,
  description: '',
  breed: '',
  imageUrl: ''
})

// News form
const newsForm = ref({
  id: '',
  title: '',
  excerpt: '',
  content: '',
  author: authStore.user?.name || '',
  imageUrl: '',
  tags: ''
})

// State management
const isAddingAnimal = ref(false)
const isEditingAnimal = ref(false)
const isAddingNews = ref(false)
const isEditingNews = ref(false)
const isLoading = ref(true)

// Computed properties for form validation
const isAnimalFormValid = computed(() => {
  const form = animalForm.value
  return form.name && form.description && form.imageUrl && form.breed
})

const isNewsFormValid = computed(() => {
  const form = newsForm.value
  return form.title && form.excerpt && form.content && form.imageUrl
})

// Authentication check
onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login')
    return
  }

  // Fetch data
  await Promise.all([
    animalsStore.fetchAnimals(),
    newsStore.fetchNews()
  ])

  isLoading.value = false
})

// Tab switching
const setActiveTab = (tab: string) => {
  activeTab.value = tab
  resetForms()
}

// Form management
const resetForms = () => {
  animalForm.value = {
    id: '',
    name: '',
    type: 'dog',
    gender: 'male',
    age: 1,
    description: '',
    breed: '',
    imageUrl: ''
  }
  
  newsForm.value = {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: authStore.user?.name || '',
    imageUrl: '',
    tags: ''
  }
  
  isAddingAnimal.value = false
  isEditingAnimal.value = false
  isAddingNews.value = false
  isEditingNews.value = false
}

// Animal CRUD
const startAddAnimal = () => {
  resetForms()
  isAddingAnimal.value = true
}

const startEditAnimal = (animal: typeof animalsStore.animals[0]) => {
  animalForm.value = { ...animal }
  isEditingAnimal.value = true
  isAddingAnimal.value = false
}

const saveAnimal = async () => {
  if (!isAnimalFormValid.value) return

  const animalData = {
    ...animalForm.value,
    type: animalForm.value.type as 'dog' | 'cat',
    gender: animalForm.value.gender as 'male' | 'female'
  }

  if (isAddingAnimal.value) {
    const { id, ...animalWithoutId } = animalData
    await animalsStore.addAnimal(animalWithoutId)
  } else if (isEditingAnimal.value) {
    await animalsStore.updateAnimal(animalForm.value.id, animalData)
  }

  resetForms()
}

const deleteAnimal = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir este animal?')) {
    await animalsStore.deleteAnimal(id)
  }
}

// News CRUD
const startAddNews = () => {
  resetForms()
  isAddingNews.value = true
}

const startEditNews = (news: typeof newsStore.news[0]) => {
  const formattedNews = {
    ...news,
    tags: news.tags.join(', ')
  }
  newsForm.value = formattedNews
  isEditingNews.value = true
  isAddingNews.value = false
}

const saveNews = async () => {
  if (!isNewsFormValid.value) return
  
  // Format tags as array
  const formData = {
    ...newsForm.value,
    tags: newsForm.value.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
  }
  
  if (isAddingNews.value) {
    await newsStore.addNews(formData)
  } else if (isEditingNews.value) {
    await newsStore.updateNews(formData.id, formData)
  }
  
  resetForms()
}

const deleteNews = async (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta notícia?')) {
    await newsStore.deleteNews(id)
  }
}

// Logout
const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="bg-gray-50 py-8 min-h-screen">
    <div class="container mx-auto px-4">
      <!-- Admin Panel Header -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="mb-4 md:mb-0">
            <h1 class="text-2xl font-bold text-secondary-800">Painel Administrativo</h1>
            <p class="text-secondary-600">Gerencie animais, notícias e conteúdo do site</p>
          </div>
          <div class="flex items-center">
            <div class="mr-4">
              <span class="text-sm text-secondary-600">Logado como</span>
              <span class="font-medium text-secondary-800 ml-1">{{ authStore.user?.name }}</span>
            </div>
            <button @click="handleLogout" class="btn btn-secondary text-sm">
              Sair
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-lg shadow-md p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p class="mt-4 text-secondary-600">Carregando dados...</p>
      </div>

      <div v-else>
        <!-- Tab Navigation -->
        <div class="bg-white rounded-lg shadow-md mb-8">
          <div class="flex border-b">
            <button 
              @click="setActiveTab('animals')" 
              class="px-6 py-4 text-secondary-800 font-medium"
              :class="{ 'border-b-2 border-primary-500 text-primary-600': activeTab === 'animals' }"
            >
              Gerenciar Animais
            </button>
            <button 
              @click="setActiveTab('news')" 
              class="px-6 py-4 text-secondary-800 font-medium"
              :class="{ 'border-b-2 border-primary-500 text-primary-600': activeTab === 'news' }"
            >
              Gerenciar Notícias
            </button>
          </div>
        </div>

        <!-- Animals Tab -->
        <div v-if="activeTab === 'animals'">
          <!-- Animal Form (Add/Edit) -->
          <div v-if="isAddingAnimal || isEditingAnimal" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold text-secondary-800 mb-4">
              {{ isAddingAnimal ? 'Adicionar Novo Animal' : 'Editar Animal' }}
            </h2>
            
            <form @submit.prevent="saveAnimal" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-secondary-700 mb-1">Nome</label>
                  <input 
                    id="name"
                    v-model="animalForm.name"
                    type="text"
                    class="input-field"
                    required
                  />
                </div>

                <!-- Breed -->
                <div>
                  <label for="breed" class="block text-sm font-medium text-secondary-700 mb-1">Raça</label>
                  <input 
                    id="breed"
                    v-model="animalForm.breed"
                    type="text"
                    class="input-field"
                    required
                  />
                </div>

                <!-- Type -->
                <div>
                  <label for="type" class="block text-sm font-medium text-secondary-700 mb-1">Tipo</label>
                  <select 
                    id="type"
                    v-model="animalForm.type"
                    class="input-field"
                    required
                  >
                    <option value="dog">Cão</option>
                    <option value="cat">Gato</option>
                  </select>
                </div>

                <!-- Gender -->
                <div>
                  <label for="gender" class="block text-sm font-medium text-secondary-700 mb-1">Sexo</label>
                  <select 
                    id="gender"
                    v-model="animalForm.gender"
                    class="input-field"
                    required
                  >
                    <option value="male">Macho</option>
                    <option value="female">Fêmea</option>
                  </select>
                </div>

                <!-- Age -->
                <div>
                  <label for="age" class="block text-sm font-medium text-secondary-700 mb-1">Idade (anos)</label>
                  <input 
                    id="age"
                    v-model.number="animalForm.age"
                    type="number"
                    min="0"
                    max="30"
                    class="input-field"
                    required
                  />
                </div>

                <!-- Image URL -->
                <div>
                  <label for="imageUrl" class="block text-sm font-medium text-secondary-700 mb-1">URL da Imagem</label>
                  <input 
                    id="imageUrl"
                    v-model="animalForm.imageUrl"
                    type="url"
                    class="input-field"
                    placeholder="https://..."
                    required
                  />
                </div>

                <!-- Description (full width) -->
                <div class="md:col-span-2">
                  <label for="description" class="block text-sm font-medium text-secondary-700 mb-1">Descrição</label>
                  <textarea 
                    id="description"
                    v-model="animalForm.description"
                    rows="4"
                    class="input-field"
                    required
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button 
                  type="button"
                  @click="resetForms"
                  class="btn bg-white border border-gray-300 text-secondary-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  class="btn btn-primary"
                  :disabled="!isAnimalFormValid"
                >
                  {{ isAddingAnimal ? 'Adicionar Animal' : 'Salvar Alterações' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Animals List -->
          <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center">
              <h2 class="text-xl font-semibold text-secondary-800">Lista de Animais</h2>
              <button @click="startAddAnimal" class="btn btn-primary">
                Adicionar Animal
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Imagem
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Raça
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Sexo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Idade
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="animal in animalsStore.animals" :key="animal.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <img :src="animal.imageUrl" :alt="animal.name" class="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-secondary-800">{{ animal.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        :class="animal.type === 'dog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'">
                        {{ animal.type === 'dog' ? 'Cão' : 'Gato' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {{ animal.breed }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {{ animal.gender === 'male' ? 'Macho' : 'Fêmea' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {{ animal.age }} {{ animal.age === 1 ? 'ano' : 'anos' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button @click="startEditAnimal(animal)" class="text-primary-600 hover:text-primary-900 mr-3">
                        Editar
                      </button>
                      <button @click="deleteAnimal(animal.id)" class="text-error-600 hover:text-error-900">
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div v-if="animalsStore.animals.length === 0" class="p-8 text-center">
              <p class="text-secondary-600 mb-4">Nenhum animal cadastrado.</p>
              <button @click="startAddAnimal" class="btn btn-primary">
                Adicionar o primeiro animal
              </button>
            </div>
          </div>
        </div>

        <!-- News Tab -->
        <div v-if="activeTab === 'news'">
          <!-- News Form (Add/Edit) -->
          <div v-if="isAddingNews || isEditingNews" class="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 class="text-xl font-semibold text-secondary-800 mb-4">
              {{ isAddingNews ? 'Adicionar Nova Notícia' : 'Editar Notícia' }}
            </h2>
            
            <form @submit.prevent="saveNews" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Title -->
                <div>
                  <label for="title" class="block text-sm font-medium text-secondary-700 mb-1">Título</label>
                  <input 
                    id="title"
                    v-model="newsForm.title"
                    type="text"
                    class="input-field"
                    required
                  />
                </div>

                <!-- Author -->
                <div>
                  <label for="author" class="block text-sm font-medium text-secondary-700 mb-1">Autor</label>
                  <input 
                    id="author"
                    v-model="newsForm.author"
                    type="text"
                    class="input-field"
                    required
                  />
                </div>

                <!-- Image URL -->
                <div>
                  <label for="newsImageUrl" class="block text-sm font-medium text-secondary-700 mb-1">URL da Imagem</label>
                  <input 
                    id="newsImageUrl"
                    v-model="newsForm.imageUrl"
                    type="url"
                    class="input-field"
                    placeholder="https://..."
                    required
                  />
                </div>

                <!-- Tags -->
                <div>
                  <label for="tags" class="block text-sm font-medium text-secondary-700 mb-1">Tags (separadas por vírgula)</label>
                  <input 
                    id="tags"
                    v-model="newsForm.tags"
                    type="text"
                    class="input-field"
                    placeholder="adoção, evento, campanha"
                  />
                </div>

                <!-- Excerpt -->
                <div class="md:col-span-2">
                  <label for="excerpt" class="block text-sm font-medium text-secondary-700 mb-1">Resumo</label>
                  <textarea 
                    id="excerpt"
                    v-model="newsForm.excerpt"
                    rows="2"
                    class="input-field"
                    required
                  ></textarea>
                </div>

                <!-- Content -->
                <div class="md:col-span-2">
                  <label for="content" class="block text-sm font-medium text-secondary-700 mb-1">Conteúdo</label>
                  <textarea 
                    id="content"
                    v-model="newsForm.content"
                    rows="10"
                    class="input-field"
                    required
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button 
                  type="button"
                  @click="resetForms"
                  class="btn bg-white border border-gray-300 text-secondary-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  class="btn btn-primary"
                  :disabled="!isNewsFormValid"
                >
                  {{ isAddingNews ? 'Publicar Notícia' : 'Salvar Alterações' }}
                </button>
              </div>
            </form>
          </div>

          <!-- News List -->
          <div v-else class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b flex justify-between items-center">
              <h2 class="text-xl font-semibold text-secondary-800">Lista de Notícias</h2>
              <button @click="startAddNews" class="btn btn-primary">
                Adicionar Notícia
              </button>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Imagem
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Autor
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="news in newsStore.news" :key="news.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <img :src="news.imageUrl" :alt="news.title" class="h-10 w-10 rounded object-cover" />
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm font-medium text-secondary-800">{{ news.title }}</div>
                      <div class="text-xs text-secondary-500 line-clamp-1">{{ news.excerpt }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {{ new Date(news.date).toLocaleDateString('pt-PT') }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                      {{ news.author }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button @click="startEditNews(news)" class="text-primary-600 hover:text-primary-900 mr-3">
                        Editar
                      </button>
                      <button @click="deleteNews(news.id)" class="text-error-600 hover:text-error-900">
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Empty State -->
            <div v-if="newsStore.news.length === 0" class="p-8 text-center">
              <p class="text-secondary-600 mb-4">Nenhuma notícia cadastrada.</p>
              <button @click="startAddNews" class="btn btn-primary">
                Adicionar a primeira notícia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>