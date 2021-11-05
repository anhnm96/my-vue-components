<template>
  <component
    :is="as"
    v-show="selected"
    :id="`tab-panel-${tabsId}-${index}`"
    role="tabpanel"
    :tabindex="0"
    :aria-labelledby="`tab-${tabsId}-${index}`"
  >
    <slot />
  </component>
</template>

<script>
import { ref, inject, computed, getCurrentInstance, onMounted } from 'vue'
import { TabsKey } from './symbols'

export default {
  name: 'TabPanel',
  props: {
    as: {
      type: [Object, String],
      default: 'div',
    },
  },
  setup() {
    const { tabsId, activeIndex, panels } = inject(TabsKey)

    const instance = getCurrentInstance()
    const index = ref()
    onMounted(() => {
      index.value = panels.length
      panels.push(instance)
    })

    const selected = computed(() => activeIndex.value === index.value)
    return { selected, tabsId, index }
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
