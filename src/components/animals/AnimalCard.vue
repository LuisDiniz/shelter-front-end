<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  animal: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const animalGender = computed(() => {
  return props.animal.gender === 'male' ? 'Macho' : 'Fêmea'
})

const animalType = computed(() => {
  return props.animal.type === 'dog' ? 'Cão' : 'Gato'
})

const adoptOrSponsor = () => {
  router.push(`/adotar/${props.animal.id}`)
}
</script>

<template>
  <div class="card group">
    <div class="relative overflow-hidden h-60">
      <img 
        :src="animal.imageUrl" 
        :alt="animal.name" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute top-0 left-0 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-br-lg">
        {{ animalType }}
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-semibold text-secondary-800">{{ animal.name }}</h3>
        <div class="flex gap-2">
          <span class="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
            {{ animal.age }} {{ animal.age === 1 ? 'ano' : 'anos' }}
          </span>
          <span class="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
            {{ animalGender }}
          </span>
        </div>
      </div>
      <p class="text-secondary-600 mb-4 text-sm line-clamp-2">{{ animal.description }}</p>
      <button @click="adoptOrSponsor" class="btn btn-primary w-full">
        Apadrinhar ou adotar
      </button>
    </div>
  </div>
</template>