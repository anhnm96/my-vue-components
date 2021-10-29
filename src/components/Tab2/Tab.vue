<template>
  <button
    :id="`tab-${name}`"
    role="tab"
    :aria-controls="`tab-panel-${name}`"
    :aria-selected="isSelected"
    :tabindex="isSelected ? 0 : -1"
    @click="activateTab(name)"
  >
    <slot />
  </button>
</template>

<script>
import { inject, computed } from 'vue'
import { TabsKey } from './symbols'
export default {
  name: 'Tab',
  props: {
    name: String,
  },
  setup(props) {
    const { activeId, activateTab } = inject(TabsKey)
    const isSelected = computed(() => {
      return activeId.value === props.name
    })

    return { isSelected, activateTab }
  },
}
</script>

<!-- <script lang="ts" setup>
import { inject, computed } from 'vue'
import { TabsKey } from './symbols'

const props = defineProps({
  name: String,
})
const { activeId, activateTab } = inject(TabsKey)
const isSelected = computed(() => {
  return activeId === props.name
})
</script> -->
