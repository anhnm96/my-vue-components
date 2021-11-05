<template>
  <component :is="as" role="tablist" :aria-orientation="orientation">
    <slot />
  </component>
</template>

<script>
import { inject } from 'vue'
import { TabsKey } from './symbols'

export default {
  name: 'TabList',
  props: {
    as: {
      type: [Object, String],
      default: 'div',
    },
  },
  setup() {
    const { orientation } = inject(TabsKey)
    return { orientation }
  },
}
</script>
