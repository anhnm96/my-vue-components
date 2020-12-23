<template>
  <component
    :is="tag"
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragenter.prevent="dragEntered"
    @dragover.prevent="dragOver"
    @drop.stop="onDrop"
    @dragleave="dragLeave"
    @dragend="dragEnd"
    @transitionstart="transitionstart"
    @transitionend="transitionend"
  >
    <slot />
  </component>
</template>

<script>
import {isEqual, throttle} from 'lodash-es'
import {dragEnter} from './DragState'
export default {
  name: 'DragItem',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    mode: {
      default: 'cut',
      validator: function (value) {
        return ['cut', 'copy'].includes(value)
      }
    },
    draggable: {
      type: Boolean,
      default: true
    },
    dropable: {
      type: Boolean,
      default: true
    },
    dataTransfer: Object,
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
    offset: {
      type: Object,
      default: () => ({top: 5, bottom: 5, left: 5, right: 5})
    },
    ghostClass: {
      type: String,
      default: 'ghost-item'
    },
    disabled: Boolean
  },
  data() {
    return {
      transitioning: false
    }
  },
  methods: {
    transitionstart() {
      this.transitioning = true
    },
    transitionend() {
      this.transitioning = false
    },
    onDrag (e) {
      e.dataTransfer.effectAllowed = this.effectsAllowed
      e.dataTransfer.dropEffect = this.dropEffect
      e.dataTransfer.setData('text', JSON.stringify(this.dataTransfer))
      if (this.mode === 'cut') this.$emit('remove', this.dataTransfer)
      this.$emit('dragstarted', this.dataTransfer)
    },
    onDrop (e) {
      const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
      this.$emit('dropped', {event: e, from: dataTransfer, to: this.dataTransfer})
      e.dataTransfer.clearData()
    },
    dragEntered(e) {
      console.log('enter')
      if (this.transitioning) return
      const offset = this.getOffset()
      // if (e.clientY > offset.top && e.clientY < offset.bottom && e.clientX > offset.left && e.clientX < offset.right)
        // this.$emit('asd', {from: draggingData, to: this.dataTransfer})
        this.$emit('dragentered', {...this.dataTransfer, ref: this.$el})
      Object.assign(dragEnter, this.dataTransfer, {ref: this.$el})
    },
    dragOver () {
      // this.$emit('drag-over')
    },
    dragLeave (e) {
      // this.$emit('drag-leave')
    },
    dragEnd () {
      // this.$emit('drag-end')
    },
    getOffset () {
      const top = this.$el.getBoundingClientRect().top + this.offset.top
      const bottom = this.$el.getBoundingClientRect().bottom - this.offset.bottom
      const left = this.$el.getBoundingClientRect().left + this.offset.left
      const right = this.$el.getBoundingClientRect().right - this.offset.right
      return {top, bottom, left, right}
    }
  }
}
</script>

<style>
</style>