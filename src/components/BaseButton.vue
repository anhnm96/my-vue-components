<template>
  <component
    :is="as"
    class="inline-flex items-center px-4 py-2 text-sm font-medium border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1"
    :class="[color]"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    as: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'default'
    }
  },
  // eslint-disable-next-line
  setup({ variant }) {
    let color = ''

    switch (variant) {
      case 'default':
        color = 'transition bg-white text-gray-700 active:bg-gray-200 hover:bg-gray-50 focus:ring-indigo-500 border-gray-300 disabled:bg-white'
        break
      case 'link':
        color = 'text-blue-700 bg-white active:text-blue-900'
        break
      default:
        color = `transition text-white bg-${variant}-600 active:bg-${variant}-700 hover:bg-${variant}-500 focus:ring-${variant}-500 disabled:bg-${variant}-600`
    }

    return { color }
  }
})
</script>
<style scoped>
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
