<template>
  <component
    :is="tag"
    :draggable="draggable"
    @dragstart.self="dragstart"
    @dragenter.prevent
    @dragover.prevent
    @dragend="dragend"
    :class="{[ghostClass]: localDragging}"
  >
    <slot />
  </component>
</template>

<script>
import {ref} from 'vue'
import {setDragging, setDataTransfer} from './DragState'
import logo from '@/assets/logo.png'
export default {
  name: 'VDrag',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    dataTransfer: {
      type: Object,
      required: true
    },
    dropEffect: {
      default: 'move',
      validator: function (value) {
        return ['copy', 'move', 'link', 'none'].includes(value)
      }
    },
    effectsAllowed: {
      default: 'move',
      validator: function (value) {
        return [
          'none', 'copy', 'copyLink', 'copyMove', 'link', 'linkMove', 'move', 'all',
          'uninitialized',
        ].includes(value)
      }
    },
    ghostClass: {
      type: String,
      default: 'drag-item-ghost'
    }
  },
  setup(props, {emit}) {
    const localDragging = ref(false)
    function dragstart (e) {
      localDragging.value = true
      setDragging(true)
      setDataTransfer(props.dataTransfer)
      e.dataTransfer.effectAllowed = props.effectsAllowed
      e.dataTransfer.dropEffect = props.dropEffect
      const image = new Image()
      image.src = logo
      e.dataTransfer.setDragImage(image, 50, 50)
      // e.dataTransfer.setData('text', JSON.stringify(props.dataTransfer))
      emit('dragstarted', props.dataTransfer)
    }
    function dragend () {
      localDragging.value = false
      setDragging(false)
      emit('dragended', props.dataTransfer)
    }
    return {localDragging, dragstart, dragend}
  }
}
</script>

<style>
</style>