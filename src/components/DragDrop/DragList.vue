<template>
  <transition-group move-class="drag-list--move" :tag="tag" ref="listEl"
        @dragleave="dragleave" @dragend="dragend" @drop="drop" @mouseout="focusout">
    <template v-if="showPlaceholder">
      <DragItem
        v-for="(item, index) in itemsBeforeFeedback"
        :key="item"
        :data-transfer="{ index, value: item }"
        @dragentered="dragentered"
      >
        <slot name="item" :item="item" :index="index" />
      </DragItem>
      <DragItem key="drag-item--placeholder">
        <slot name="placeholder" />
      </DragItem>
      <DragItem
        v-for="(item, index) in itemsAfterFeedback"
        :key="item"
        :data-transfer="{ index: index + itemsBeforeFeedback.length, value: item }"
        @dragentered="dragentered"
      >
        <slot
          name="item"
          :item="item"
          :index="index + itemsBeforeFeedback.length"
        />
      </DragItem>
    </template>
    <DragItem
      v-else
      v-for="(item, index) in list"
      :key="item"
      :data-transfer="{ index, value: item }"
      @dragstart="dragstart"
      @dragentered="dragentered"
    >
      <slot name="item" :item="item" :index="index" />
    </DragItem>
  </transition-group>
</template>
<script>
import {ref, watch, computed, reactive} from 'vue'
import DragItem from './DragItem'
export default {
  props: {
    list: Array,
    tag: {
      type: String,
      default: 'div'
    },
    mode: {
      type: String,
      default: 'immediate'
    }
  },
  components: {DragItem},
  setup(props, {emit, slots}) {
    const listEl = ref(null)
    // index of dragging item in list
    const draggingIndex = ref(-1)
    let originalIndex = -1
    const dragging = ref(false)
    // index of hovering element
    const enteringIndex = ref(-1)
    // item events
    const dragstart = (e) => {
      const payload = JSON.parse(e.dataTransfer.getData('text'))
      dragging.value = true
      draggingIndex.value = payload.index
      originalIndex = payload.index
    }
    // this is used when outside components trigger dragenter
    const hovering = ref(false)
    const movingRD = ref(null)
    function dragentered({detail: payload}) {
      console.log('dragentered', payload)
      // stop if element is in transitioning
      if (payload.ref.classList.contains('drag-list--move')) return
      // if (!dragging.value) hovering.value = true
      if (props.mode === 'lazy' || !dragging.value) {
        hovering.value = true
        if (enteringIndex.value === payload.index) {
          console.log('equal')
          movingRD.value = !movingRD.value
          return
        }
        enteringIndex.value = payload.index
      }
      if (props.mode === 'immediate' && dragging.value) {
        console.log('immediate',draggingIndex.value, payload.index)
        array_move(props.list, draggingIndex.value, payload.index, false)
        // update index of dragging element
        draggingIndex.value = payload.index
      }
    }
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
    const hasPlaceholderSlot = Object.keys(slots).includes('placeholder')
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const showPlaceholder = computed(() => {
      // not support safari placeholder due to e.relatedTarget bug
      // if (isSafari) return false
      if (hasPlaceholderSlot) 
        return (props.mode === 'lazy' && dragging.value) || hovering.value
      return false
    })
    // list events
    function dragend() {
      dragging.value = false
    }
    // handle swap in lazy mode
    function drop (e) {
      if (hovering.value) {
        const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
        const clone = props.list
        const directionValue = movingRD.value ? 1 : 0
        clone.splice(enteringIndex.value + directionValue, 0, dataTransfer.value)
        emit('update:list', clone)
        hovering.value = false
      }
      if (props.mode === 'lazy' && dragging.value) {
        array_move(props.list, draggingIndex.value, enteringIndex.value, false)
      }
    }
    function dragleave (e) {
      console.log('leave', e)
      // move back to original if drag out of list
      // safari always return relatedTarget as null
      // if (isSafari) return
      if (hovering.value) {
        e.dragleave = true
        listEl.value.$el.dispatchEvent(new MouseEvent('mouseout', {'detail': 'ok'}))
      }
      /*
      if (listEl.value.$el !== e.relatedTarget && !listEl.value.$el.contains(e.relatedTarget)) {
      // if (listEl.value.$el !== e.relatedTarget && !listEl.value.$el.contains(e.relatedTarget)) {
        array_move(props.list, draggingIndex.value, originalIndex, false)
        draggingIndex.value = originalIndex
        hovering.value = false
      }
      */
    }
    function focusout(e) {
      console.log(e.detail)
      if (e.detail && listEl.value.$el !== e.relatedTarget && !listEl.value.$el.contains(e.relatedTarget)) {
        array_move(props.list, draggingIndex.value, originalIndex, false)
        draggingIndex.value = originalIndex
        hovering.value = false
      }
    }
    return { focusout, hovering, drop, showPlaceholder, listEl, enteringIndex, dragging, dragentered, dragstart, dragleave, dragend, itemsBeforeFeedback, itemsAfterFeedback}
  }
}
function array_move(arr, oldIndex, newIndex, allowNegative = true) {
  if (!allowNegative && (oldIndex < 0 || newIndex < 0)) return
        while (oldIndex < 0) {
            oldIndex += arr.length;
        }
        while (newIndex < 0) {
            newIndex += arr.length;
        }
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr; // for testing purposes
    }
</script>
<style scoped>
.drag-list--move {
  transition: transform 0.2s ease;
}
</style>