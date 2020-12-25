<template>
  <transition-group
    move-class="drag-list--move"
    tag="div"
    @dragstart="dragstart"
    @dragend="dragend"
    @drop="dropped"
  >
    <template v-if="dragging && enteringIndex > -1">
      <DragItem
        v-for="(item, index) in itemsBeforeFeedback"
        :key="item"
        :data-transfer="{ index }"
        @dragentered="dragentered"
      >
        <slot name="item" :item="item" :ind="index" />
      </DragItem>
      <slot name="feedback">
        <!-- <DragItem key="ad"> -->
        <p key="feedback" class="p-2 font-normal bg-green-300 shadow-xs bg-">
          feeeed backkk
        </p>
        <!-- </DragItem> -->
      </slot>
      <DragItem
        v-for="(item, index) in itemsAfterFeedback"
        :key="item"
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
        :key="item"
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
      console.log('dragstart')
      dragging.value = true
    }
    const dragend = () => {
      // console.log('dragend')
      dragging.value = false
      array_move(props.list, draggingIndex.value, enteringIndex.value)
    }
    // console.log(ctx.slots.default())
    function array_move(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing purposes
    }
    // index of hovering element
    const enteringIndex = ref(-1)
    function dragentered(payload) {
      // stop if element is in transitioning
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
    const dropped = (val) => {
      console.log('dropped', val)
    }
    const draggingIndex = ref(-1)
    const dragstarted = (payload) => {
      console.log('dragstarted', payload)
      draggingIndex.value = payload.index
    }
    return {dragstarted, dropped, enteringIndex, dragging, dragentered, dragstart, dragend, itemsBeforeFeedback, itemsAfterFeedback}
  }
}
</script>
<style scoped>
.drag-list--move {
  transition: transform 0.2s ease;
}
</style>