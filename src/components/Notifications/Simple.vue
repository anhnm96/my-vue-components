<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <!-- <div class="flex flex-col items-center w-full space-y-4 sm:items-end"> -->
    <div class="relative w-full h-full">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="opacity-0 sm:translate-x-full"
        enter-to-class="opacity-100 sm:translate-x-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div
          v-if="show"
          class="absolute max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
          :class="positionClass"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="w-6 h-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">{{ title }}</p>
                <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
              </div>
              <div class="flex flex-shrink-0 ml-4">
                <button
                  @click="() => onClose(position, id, 'payload')"
                  class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                >
                  <span class="sr-only">Close</span>
                  <XIcon class="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'
import { PropType, defineComponent } from 'vue'
import { Position } from './types'

export default defineComponent({
  name: 'Simple',
  components: {
    CheckCircleIcon,
    XIcon,
  },
  emits: ['update:show'],
  props: {
    show: {
      type: Boolean,
      default: true
    },
    id: Number,
    title: {
      type: String,
      default: 'Successfully!'
    },
    description: {
      type: String,
      default: 'Anyone with a link can now view this file'
    },
    onClose: Function,
    position: {
      type: String as PropType<Position>,
      default: 'top-right'
    },
    timeout: {
      type: Number,
      default: 5000
    }
  },
  setup(props) {
    let positionClass
    switch (props.position) {
      case 'top-right':
        positionClass = 'top-0 right-0'
        break
      case 'top-left':
        positionClass = 'top-0 left-0'
        break
      case 'top-center':
        positionClass = 'top-0 left-1/2 transform -translate-x-1/2'
        break
      case 'bottom-right':
        positionClass = 'bottom-0 right-0'
        break
      case 'bottom-left':
        positionClass = 'bottom-0 left-0'
        break
      case 'bottom-center':
        positionClass = 'bottom-0 left-1/2 transform -translate-x-1/2'
        break
    }
    return { positionClass }
  },
  beforeUnmount() {
    console.log('beforeUnmount', this.id)
  }
})
</script>
