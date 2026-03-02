<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true
  },
  altText: {
    type: String,
    required: true
  }
})

const currentImageIndex = ref(0)

const currentImage = computed(() => {
  return props.images[currentImageIndex.value]
})

const canGoPrevious = computed(() => {
  return currentImageIndex.value > 0
})

const canGoNext = computed(() => {
  return currentImageIndex.value < props.images.length - 1
})

const previousImage = () => {
  if (canGoPrevious.value) {
    currentImageIndex.value--
  }
}

const nextImage = () => {
  if (canGoNext.value) {
    currentImageIndex.value++
  }
}

const goToImage = (index: number) => {
  currentImageIndex.value = index
}
</script>

<template>
  <div class="relative w-full">
    <div class="relative overflow-hidden bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
      <img
        :src="currentImage"
        :alt="altText"
        class="w-full h-full object-cover"
      />

      <button
        v-if="props.images.length > 1"
        @click="previousImage"
        :disabled="!canGoPrevious"
        class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-all duration-200 z-10"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        v-if="props.images.length > 1"
        @click="nextImage"
        :disabled="!canGoNext"
        class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-all duration-200 z-10"
        aria-label="Próximo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <div v-if="props.images.length > 1" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(_image, index) in props.images"
        :key="index"
        @click="goToImage(index)"
        class="transition-all duration-200"
        :class="[
          'w-3 h-3 rounded-full',
          currentImageIndex === index ? 'bg-primary-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
        ]"
        :aria-label="`Imagem ${index + 1}`"
      />
    </div>
  </div>
</template>
