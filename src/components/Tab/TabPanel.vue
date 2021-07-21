<template>
  <div
    v-show="activeTab === id"
    :id="`tab-panel-${id}`"
  >
    <slot />
  </div>
</template>

<script>
import { useTabs } from './Tabs'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { activeTab } = useTabs()
    return {
      activeTab,
    }
  },
}
</script>

<style module></style>
