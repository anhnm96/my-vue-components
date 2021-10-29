<template>
  <div
    v-show="isSelected"
    :id="`tab-panel-${name}`"
    role="tabpanel"
    :tabindex="0"
    :aria-labelledby="`tab-${name}`"
  >
    <slot />
  </div>
</template>

<script>
import { inject, computed } from 'vue'
import { TabsKey } from './symbols'

export default {
  name: 'TabPanel',
  props: {
    name: String,
  },
  setup(props) {
    const { activeId } = inject(TabsKey)
    const isSelected = computed(() => {
      return activeId.value === props.name
    })
    return { isSelected }
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
