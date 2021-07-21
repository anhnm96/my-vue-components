<template>
  <div
    ref="el"
    class="relative w-full overflow-hidden"
  >
    <ul
      class="flex transition-transform duration-300"
      :class="[wrapperClass]"
      :style="`transform: translateX(${translation}px)`"
    >
      <slot />
    </ul>
    <slot
      name="controls"
      :index="activeIndex"
      :prev="prev"
      :next="next"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  computed,
  ref,
  provide,
  inject,
} from 'vue'
import { CarouselListKey, CarouselListContentKey } from './symbols'

export default defineComponent({
  name: 'CarouselListContent',
  props: {
    wrapperClass: {
      type: String,
      default: '',
    },
    itemsToList: {
      type: Number,
      default: Infinity,
    },
    repeat: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // provide context
    const carouselItems = ref<HTMLElement[]>([])
    provide(CarouselListContentKey, {
      carouselItems,
    })

    const el = ref()
    const activeIndex = ref(0)
    const itemWidth = ref(0)

    const itemsToShow = computed(() => {
      return Math.round(
        el.value.getBoundingClientRect().width / itemWidth.value
      )
    })

    function prev() {
      if (activeIndex.value === 0 && props.repeat) {
        activeIndex.value = carouselItems.value.length - itemsToShow.value
        return
      }

      const gap =
        props.itemsToList === Infinity ? itemsToShow.value : props.itemsToList
      activeIndex.value -= gap
      if (activeIndex.value < 0) activeIndex.value = 0
    }

    function next() {
      const lastAllowIndex = carouselItems.value.length - itemsToShow.value

      if (activeIndex.value === lastAllowIndex && props.repeat) {
        activeIndex.value = 0
        return
      }

      const gap =
        props.itemsToList === Infinity ? itemsToShow.value : props.itemsToList
      const nextActiveIndex = activeIndex.value + gap
      // make sure we don't over translateX
      if (nextActiveIndex > lastAllowIndex) {
        activeIndex.value = lastAllowIndex
        return
      }
      activeIndex.value = nextActiveIndex
    }

    // expose these data to parent CarouselList
    const parentData = inject(CarouselListKey)
    Object.assign(parentData, { activeIndex, prev, next })

    function refresh() {
      itemWidth.value = carouselItems.value[0].getBoundingClientRect().width
      // make sure we don't over translateX
      if (activeIndex.value > carouselItems.value.length - itemsToShow.value)
        activeIndex.value = carouselItems.value.length - itemsToShow.value
    }

    // use resizeObserver to recalculate CarouselItem width
    let observer: ResizeObserver
    onMounted(() => {
      observer = new ResizeObserver(refresh)
      observer.observe(el.value)
    })

    onBeforeUnmount(() => {
      observer.disconnect()
    })

    const translation = computed(() => {
      return -(activeIndex.value * itemWidth.value)
    })

    return { el, prev, next, translation, activeIndex }
  },
})
</script>

<style>
</style>
