<template>
  <component
    :is="as"
    :id="`tab-${tabsId}-${index}`"
    role="tab"
    :aria-controls="`tab-panel-${tabsId}-${index}`"
    :aria-selected="selected"
    :tabindex="selected ? 0 : -1"
    @click="activateTab(index)"
  >
    <slot :selected="selected" />
  </component>
</template>

<script>
import { ref, inject, computed, getCurrentInstance, onMounted } from 'vue'
import { TabsKey } from './symbols'
export default {
  name: 'Tab',
  props: {
    as: {
      type: [Object, String],
      default: 'button',
    },
  },
  setup() {
    const { tabsId, activeIndex, activateTab, tabs } = inject(TabsKey)

    const instance = getCurrentInstance()
    const index = ref()
    onMounted(() => {
      index.value = tabs.length
      tabs.push(instance)
    })

    const selected = computed(() => activeIndex.value === index.value)

    return { selected, activateTab, tabsId, index }
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
