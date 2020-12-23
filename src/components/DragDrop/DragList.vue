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
          ref="feedback"
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
        @dragstarted="dragstarted"
      >
        <slot name="item" :item="item" :ind="index" />
      </DragItem>
    </template>
  </transition-group>
</template>
<script>
import {ref, onMounted, getCurrentInstance, watch, computed} from 'vue'
import {dragEnter} from './DragState'
import DragItem from './DragItem'
export default {
  props: {
    list: Array,
    tag: String,
    childProps: Object
  },
  components: {DragItem},
  setup(props, ctx) {
    const dragging = ref(false)
    const instance = getCurrentInstance()
    const enteringIndex = ref(-1)
    function test(val) {
      console.log('test', val)
    }
    const draggingIndex = ref(-1)
    function dragstarted(payload) {
      draggingIndex.value = payload.index
    }
    function dragentered(payload) {
      if (draggingIndex.value === payload.index)
      requestAnimationFrame(() => {

        if (enteringIndex.value === payload.index) {
          if (payload.index === itemsBeforeFeedback.value.length) {
            console.log('ins1', payload.index, itemsBeforeFeedback.value.length)
             movingRD.value = true
            return
          }
          if (payload.index === itemsBeforeFeedback.value.length - 1) {
            console.log('ins2', payload.index, itemsBeforeFeedback.value.length)
             movingRD.value = false
            return
          }
          return
        }
      })
      enteringIndex.value = payload.index
    }
    const feedback = ref(null)
    const movingRD = ref(null)
    const insertingIndex = ref(-1)
    watch(enteringIndex, (newVal, oldVal) => {
      if (oldVal < newVal) {
        movingRD.value = true
        insertingIndex.value = newVal + 1
      } else {
        movingRD.value = false
        insertingIndex.value = newVal
      }
    })
    const itemsBeforeFeedback = computed(() => {
      const directionValue = movingRD.value ? 1 : 0
      return props.list.slice(0, enteringIndex.value + directionValue)
      // const numb = insertingIndex.value
    })
    const itemsAfterFeedback = computed(() => {
      const directionValue = movingRD.value ? 1 : 0
      return props.list.slice(enteringIndex.value + directionValue)
      // const numb = insertingIndex.value'
    })
    const dragstart = () => {
      dragging.value = true
    }
    const dragend = () => {
      dragging.value = false
    }
    return {dragstarted, enteringIndex, dragging, dragentered, feedback, dragstart, dragend, itemsBeforeFeedback, itemsAfterFeedback}
  }
}
</script>
<style>
.drag-list--move {
  transition: transform 0.1s ease;
}
</style>