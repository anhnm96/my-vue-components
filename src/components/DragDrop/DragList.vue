<template>
  <transition-group move-class="drag-list--move" :tag="tag" ref="listEl"
        @dragleave="dragleave" @dragend="dragend" @drop="drop">
    <template v-if="showPlaceholder">
      <DragItem
        v-for="(item, index) in itemsBeforeFeedback"
        :key="item"
        :data-transfer="{ index, value: item }"
        @dragentered="dragentered"
      >
        <slot name="item" :item="item" :ind="index" />
      </DragItem>
      <DragItem key="drag-item--placeholder">
        <slot name="placeholder">
          <p class="p-2 font-normal bg-green-300 shadow-xs bg-">
            feeeed backkk
          </p>
        </slot>
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
          :ind="index + itemsBeforeFeedback.length"
        />
      </DragItem>
    </template>
    <DragItem
      v-else
      v-for="(item, index) in list"
      :key="item"
      :data-transfer="{ index, value: item }"
      @dragstarted="dragstarted"
      @dragentered="dragentered"
    >
      <slot name="item" :item="item" :ind="index" />
    </DragItem>
  </transition-group>
</template>
<script>
import {ref, watch, computed} from 'vue'
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
    // index of dragging item in list
    const draggingIndex = ref(-1)
    let originalIndex = -1
    const dragstarted = (payload) => {
      console.log('dragstarted', payload)
      dragging.value = true
      draggingIndex.value = payload.index
      originalIndex = payload.index
    }
    // index of hovering element
    const dragging = ref(false)
    const enteringIndex = ref(-1)
    // this is used when other components trigger dragenter
    const hovering = ref(false)
    const movingRD = ref(null)
    const listEl = ref(null)
    function dragentered(payload) {
      console.log('dragentered', payload)
      // stop if element is in transitioning
      if (payload.ref.classList.contains('drag-list--move')) return
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
        array_move(props.list, draggingIndex.value, payload.index, false)
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
    const showPlaceholder = computed(() => {
      const hasPlaceholderSlot = Object.keys(slots).includes('placeholder')
      if (hasPlaceholderSlot) 
        return (props.mode === 'lazy' && dragging.value) || hovering.value
      return false
    })
    function dragend() {
      dragging.value = false
    }
    // handle swap in lazy mode
    function drop (e) {
      console.log('drop')
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
      // move back to original if drag out of list
        if (!listEl.value.$el.contains(e.relatedTarget)) {
          array_move(props.list, draggingIndex.value, originalIndex, false)
          draggingIndex.value = originalIndex
          hovering.value = false
        }
    }
    return { hovering, drop, showPlaceholder, listEl, dragleave ,dragstarted, enteringIndex, dragging, dragentered, dragend, itemsBeforeFeedback, itemsAfterFeedback}
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