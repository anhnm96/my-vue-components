<template>
  <transition-group
    move-class="drag-list--move"
    tag="div"
    @dragstart="dragstart"
    @dragend="dragend"
  >
    <template v-if="dragging && enteringIndex > -1">
      <DragItem
        v-for="(item, index) in itemsBeforeFeedback"
        :key="index"
        :data-transfer="{ index }"
        @dragentered="dragentered"
      >
        <slot name="item" :item="item" :ind="index" />
      </DragItem>
      <slot name="feedback">
        <p
          key="feedback"
          class="p-2 font-normal bg-green-300 shadow-xs bg-"
        >
          feeeed backkk
        </p>
      </slot>
      <DragItem
        v-for="(item, index) in itemsAfterFeedback"
        :key="index + itemsBeforeFeedback.length"
        :data-transfer="{ index: index + itemsBeforeFeedback.length }"
        @dragentered="dragentered"
      >
        <slot
          name="item"
          :item="item"
          :ind="index + itemsBeforeFeedback.length"
        />
      </DragItem>
    </template>
    <template v-else>
      <DragItem
        v-for="(item, index) in list"
        :key="index"
        :data-transfer="{ index }"
        @dragentered="dragentered"
      >
        <slot name="item" :item="item" :ind="index" />
      </DragItem>
    </template>
  </transition-group>
</template>
<script>
import {ref, onMounted, watch, computed} from 'vue'
import {dragEnter} from './DragState'
import DragItem from './DragItem'
export default {
  props: {
    list: Array,
    tag: String
  },
  components: {DragItem},
  setup(props, ctx) {
    const dragging = ref(false)
    const dragstart = () => {
      dragging.value = true
    }
    const dragend = () => {
      dragging.value = false
    }
    const enteringIndex = ref(-1)
    function dragentered(payload) {
      if (payload.ref.classList.contains('drag-list--move')) return
      if (enteringIndex.value === payload.index) {
        movingRD.value = !movingRD.value
        return
      }
      enteringIndex.value = payload.index
    }
    const movingRD = ref(null)
    watch(enteringIndex, (newVal, oldVal) => {
      if (oldVal < newVal) movingRD.value = true
      else movingRD.value = false
    })
    const itemsBeforeFeedback = computed(() => {
      const directionValue = movingRD.value ? 1 : 0
      return props.list.slice(0, enteringIndex.value + directionValue)
    })
    const itemsAfterFeedback = computed(() => {
      const directionValue = movingRD.value ? 1 : 0
      return props.list.slice(enteringIndex.value + directionValue)
    })
    
    return {enteringIndex, dragging, dragentered, dragstart, dragend, itemsBeforeFeedback, itemsAfterFeedback}
  }
}
</script>
<style scoped>
.drag-list--move {
  transition: transform 0.1s ease;
}
</style>