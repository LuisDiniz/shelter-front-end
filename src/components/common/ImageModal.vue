<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

interface Props {
  isOpen: boolean
  imageUrl: string
  altText?: string
}

const props = withDefaults(defineProps<Props>(), {
  altText: ''
})

const emit = defineEmits<{
  close: []
}>()

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

const handleOverlayClick = () => {
  emit('close')
}

const handleImageClick = (e: MouseEvent) => {
  e.stopPropagation()
}

onMounted(() => {
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      @click="handleOverlayClick"
    >
      <div class="relative max-w-4xl max-h-[90vh] mx-4 flex flex-col">
        <!-- Close Button -->
        <button
          @click="emit('close')"
          class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Image -->
        <img
          :src="imageUrl"
          :alt="altText"
          class="w-full h-full object-contain rounded-lg"
          @click="handleImageClick"
        />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
