<template>
  <section>
    <slot
      name="header"
      :index="childData.activeIndex"
      :prev="childData.prev"
      :next="childData.next"
    />
    <slot />
  </section>
</template>

<script lang="ts">
// https://www.w3.org/TR/wai-aria-practices/examples/carousel/carousel-1.html
// https://w3c.github.io/aria-practices/examples/carousel/carousel-2-tablist.html#
import { defineComponent, reactive, provide } from 'vue'
import { CarouselListKey } from './symbols'

export default defineComponent({
  name: 'CarouselList',
  setup() {
    const childData = reactive({
      activeIndex: 0,
      prev: () => ({}),
      next: () => ({}),
    })
    provide(CarouselListKey, childData)
    return { childData }
  },
})
</script>
