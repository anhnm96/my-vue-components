<template>
  <div>
    <slot :activeIndex="activeIndex" />
  </div>
</template>

<script lang="ts">
import { provide, ref, onMounted, computed } from 'vue'
import { TabsKey } from './symbols'
import { getRandomUUID } from '@/helpers'

export default {
  name: 'Tabs',
  props: {
    defaultIndex: {
      type: Number,
      default: 0,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    manual: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tabsId = getRandomUUID()
    const orientation = computed(() =>
      props.vertical ? 'vertical' : 'horizontal'
    )
    const tabs = []
    const panels = []
    const activeIndex = ref(props.defaultIndex)
    const activateTab = (index: number) => {
      activeIndex.value = index
    }

    provide(TabsKey, {
      tabsId,
      orientation,
      tabs,
      panels,
      activeIndex,
      activateTab,
    })

    onMounted(() => {
      // handle inititial tab if defaultIndex is out of bounds
      if (props.defaultIndex < 0) {
        activeIndex.value = 0
      } else if (props.defaultIndex >= tabs.values.length) {
        activeIndex.value = tabs.length - 1
      }
    })

    return { activeIndex }
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
