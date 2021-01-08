<template>
  <transition-group move-class="drag-list--move" :tag="tag" ref="listEl"
        @dragleave="dragleave" @dragend="dragend" @drop="drop" @transitionstart="lock = true" @transitionend="lock =false">
    <template v-if="showPlaceholderMove">
      <DragItem
        v-for="(item, index) in itemsBeforeFeedback"
        :key="item"
        :data-transfer="{ index, value: item }"
        @dragentered="dragentered"
      >
        <template #default="{dragging}">
          <slot name="item" :item="item" :index="index" :inProgress="dragging" />
        </template>
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </DragItem>
      <DragItem key="drag-item--placeholder--move">
        <slot name="placeholder-move" :data="draggingItem.data" />
      </DragItem>
      <DragItem key="drag-item--placeholder--add">
        <slot name="placeholder-add" />
      </DragItem>
      <DragItem
        v-for="(item, index) in itemsAfterFeedback"
        :key="item"
        :data-transfer="{ index: index + itemsBeforeFeedback.length, value: item }"
        @dragentered="dragentered"
      >
        <template #default="{dragging}">
          <slot
            name="item"
            :item="item"
            :index="index + itemsBeforeFeedback.length"
            :inProgress="dragging"
          />
        </template>
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
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
      <template v-for="name of Object.keys($slots)" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
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
    const draggingItem = reactive({inProgress: false, originalIndex: -1, currentIndex: -1, data: null, dragLeft: null})
    // index of hovering element
    const enteringIndex = ref(-1)
    const hasPlaceholderMoveSlot = Object.keys(slots).includes('placeholder-move')
    const hasPlaceholderAddSlot = Object.keys(slots).includes('placeholder-add')
    // item events
    const dragstart = (e) => {
      const payload = JSON.parse(e.dataTransfer.getData('text'))
      // dragging.value = true
      // draggingIndex.value = payload.index
      // originalIndex = payload.index

      Object.assign(draggingItem, {inProgress: true, originalIndex: payload.index, currentIndex: payload.index, data: payload, dragLeft: false})
      console.log(draggingItem.data)
    }
    // this is used when outside components trigger dragenter
    const hovering = ref(false)
    const movingRD = ref(null)
    function dragentered({detail: payload}) {
      console.log('dragentered', payload)
      // stop if element is in transitioning
      if (payload.ref.classList.contains('drag-list--move')) {console.log('lock', lock.value);return}
      if (lock.value) return
      // if (!dragging.value) hovering.value = true
      hovering.value = true
      if (draggingItem.inProgress) draggingItem.dragLeft = false
      if (hasPlaceholderMoveSlot && draggingItem.inProgress) {
        if (enteringIndex.value === payload.index) {
          console.log('equal')
          movingRD.value = !movingRD.value
          return
        }
        enteringIndex.value = payload.index
      }
      if (!hasPlaceholderMoveSlot && draggingItem.inProgress) {
        console.log('immediate',draggingItem.currentIndex, payload.index)
        array_move(props.list, draggingItem.currentIndex, payload.index, false)
        // update index of dragging element
        draggingItem.currentIndex = payload.index
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
    const showPlaceholderMove = computed(() => {
      return hasPlaceholderMoveSlot && draggingItem.inProgress && !draggingItem.dragLeft
    })
    // list events
    function dragend() {
      dragging.value = false
    }
    // handle swap in lazy mode
    function drop (e) {
      if (hovering.value && !draggingItem.inProgress) {
        console.log('add', hovering.value)
        const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
        const clone = props.list
        const directionValue = movingRD.value ? 1 : 0
        clone.splice(enteringIndex.value + directionValue, 0, dataTransfer.value)
        emit('update:list', clone)
        hovering.value = false
      }
      if (showPlaceholderMove.value) {
        console.log('drop lazy')
        array_move(props.list, draggingItem.currentIndex, enteringIndex.value, false)
        draggingItem.inProgress = false
      }
    }
    const lock = ref(false)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    function dragleave (e) {
      if (lock.value) {console.log(listEl.value.$el.classList.contains('drag-list--move'), 'move');return}
      // move back to original if drag out of list
      // safari always return relatedTarget as null so we use elementFromPoint instead
      if (isSafari) {
        const mouseEl = document.elementFromPoint(e.clientX, e.clientY)
        if (!draggingItem.dragLeft && (listEl.value.$el === mouseEl || !listEl.value.$el.contains(mouseEl))) {
          array_move(props.list, draggingItem.currentIndex, draggingItem.originalIndex, false)
          draggingItem.currentIndex = draggingItem.originalIndex
          hovering.value = false
          draggingItem.dragLeft = true
          console.log('leave', e, mouseEl,showPlaceholderMove.value, props.list[0])
        }
        return
      }
      if (!draggingItem.dragLeft && (listEl.value.$el === e.relatedTarget || !listEl.value.$el.contains(e.relatedTarget))) {
        array_move(props.list, draggingItem.currentIndex, draggingItem.originalIndex, false)
        draggingItem.currentIndex = draggingItem.originalIndex
        hovering.value = false
        draggingItem.dragLeft = true
        console.log('leave', e, showPlaceholderMove.value, props.list[0])
      }
    }
    return { lock, draggingItem, hovering, drop, showPlaceholderMove, listEl, enteringIndex, dragentered, dragstart, dragleave, dragend, itemsBeforeFeedback, itemsAfterFeedback}
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
.drag-list-hover {
  outline: 1px solid red;
}
</style>