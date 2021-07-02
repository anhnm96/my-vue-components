<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
    :class="[`bg-${color}-100 text-${color}-800`, sizeClass]"
  >
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTag',
  props: {
    color: {
      type: String,
      default: 'gray'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  setup(props) {
    let sizeClass = ''

    switch (props.size) {
      case 'lg':
        sizeClass = 'px-3  text-sm'
        break
      default: sizeClass = 'px-2  text-xs'
    }
    return { sizeClass }
  }
})
</script>
<style scoped>
</style>
