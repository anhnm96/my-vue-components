<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { provide, ref } from 'vue'
import { TabsKey } from './symbols'
export default {
  name: 'Tabs',
  setup() {
    const activeId = ref()
    const activateTab = (id: string) => (activeId.value = id)

    provide(TabsKey, {
      activeId,
      activateTab,
    })
  },
}
</script>

<!-- <script lang="ts" setup>
import { provide, ref } from 'vue'
import { TabsKey } from './symbols'

const activeId = ref()
const activateTab = (id: string) => (activeId.value = id)

provide(TabsKey, {
  activeId,
  activateTab,
})
</script> -->
