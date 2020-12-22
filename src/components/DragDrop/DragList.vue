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
        <p ref="feedback" key="feedback" class="bg-green-300 p-2 font-normal shadow-xs bg-">feeeed backkk</p>
      </slot>
    <DragItem
      v-for="(item, index) in itemsAfterFeedback"
      :key="index + itemsBeforeFeedback.length"
      :data-transfer="{ index: index + itemsBeforeFeedback.length }"
      @dragentered="dragentered"
    >
      <slot name="item" :item="item" :ind="index + itemsBeforeFeedback.length" />
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
    function dragentered(payload) {
      console.log('dragentered' , payload)
      enteringIndex.value = payload.index
    }
    const feedback = ref(null)

    const itemsBeforeFeedback = computed(() => {
      console.log('before', props.list.slice(0, enteringIndex.value + 1))
      return props.list.slice(0, enteringIndex.value + 1)
    })
    const itemsAfterFeedback = computed(() => {
      console.log('after', props.list.slice(enteringIndex.value + 1))
      return props.list.slice(enteringIndex.value + 1)
    })
    const dragstart = () => {
      dragging.value = true
    }
    const dragend = () => {
      dragging.value = false
    }
    return {enteringIndex, dragging, dragentered, feedback, dragstart, dragend, itemsBeforeFeedback, itemsAfterFeedback}
  }
}
</script>

<style>
.drag-list--move {
  transition: transform 0.1s ease;
}
</style>