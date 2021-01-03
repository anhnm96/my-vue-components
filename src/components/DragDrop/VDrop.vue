<template>
  <component
    :is="tag"
    @dragover.prevent
    @dragenter.prevent="dragenter"
    @dragleave="dragleave"
    @drop="drop"
    :class="clazz"
  >
    <slot />
  </component>
</template>

<script>
import {dragging, dataTransfer} from './DragState'
export default {
  name: 'VDrop',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    dropable: {
      type: Boolean,
      default: true
    },
    offset: Object, // {top: 0, bottom: 0, left: 0, right: 0}
    acceptData: {
      type: Function,
      default: (val) => val !== null
    },
    allowClass: {
      type: String,
      default: 'drop-allowed'
    },
    forbiddenClass: {
      type: String,
      default: 'drop-forbidden'
    },
    hoverClass: {
      type: String,
      default: 'drop-hover'
    }
  },
  computed: {
    clazz() {
      const allowed = this.acceptData(dataTransfer)
      return {
        [this.allowClass]: dragging.value && allowed,
        [this.forbiddenClass]: dragging.value && !allowed,
      }
    },
    getOffset() {
      if (!this.offset) return null
      const top = this.$el.getBoundingClientRect().top + this.offset.top
      const bottom = this.$el.getBoundingClientRect().bottom - this.offset.bottom
      const left = this.$el.getBoundingClientRect().left + this.offset.left
      const right = this.$el.getBoundingClientRect().right - this.offset.right
      return {top, bottom, left, right}
    }
  },
  methods: {
    drop (e) {
      // const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
      this.$emit('dropped', {event: e, data: dataTransfer})
    },
    dragenter(e) {
      const handler = () => {
        this.$el.classList.add(this.hoverClass)
        this.$emit('dragentered', {...this.dataTransfer, ref: this.$el})
      }
      if (!this.offset) handler()
      else {
        const offset = this.getOffset()
        if (e.clientY > offset.top && e.clientY < offset.bottom && e.clientX > offset.left && e.clientX < offset.right) {
          handler()
        }
      }
    },
    dragleave() {
      this.$el.classList.remove(this.hoverClass)
    }
  }
}
</script>

<style>
</style>