<template>
  <component
    ref="el"
    class="drag-container"
    :class="{[ghostClass]: dragging}"
    :is="tag"
    :draggable="draggable"
    @dragstart.self="dragstart"
    @dragenter.prevent.stop="dragenter"
    @dragover.prevent
    @drop="drop"
    @dragend="dragend"
  >
    <slot />
    <div v-if="dragging && hasDragImageSlot" class="drag-image" ref="dragImageEl">
      <slot name="drag-image" :data="dataTransfer" />
    </div>
  </component>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'DragItem',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    droppable: {
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
      default: 'drag-item-ghost'
    },
    disabled: Boolean
  },
  setup(props, {emit, slots}) {
    const el = ref(null)
    const dragging = ref(false)
    const dragImageEl = ref(null)
    const hasDragImageSlot = Object.keys(slots).includes('drag-image')
    function documentDragover(e) {
      e.preventDefault()
      dragImageEl.value.style.position = 'fixed'
      dragImageEl.value.style.left = e.clientX + 'px'
      dragImageEl.value.style.top = e.clientY + 'px'
      dragImageEl.value.style.transform = 'translate(-50%, -50%)'
      // fix bug on firefox: drag event always return mouse position 0, 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=505521
      el.value.dispatchEvent(new MouseEvent('drag', e))
    }
    function dragstart (e) {
      dragging.value = true
      if (hasDragImageSlot) {
        // add dragover event for handling drag image position compatible with firefox
        // and prevent drag end move back animation when drop outside of dropable element
        document.addEventListener('dragover', documentDragover)
        // remove default drag image
        // BUG in safari: must use empty GIF image instead of creating a div element or safari will fire dragend immediately
        const defaultImg = new Image()
        defaultImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //transparent gif, resolves issue with Safari that otherwise does not allow dragging
        defaultImg.style.visibility = 'hidden'
        e.dataTransfer.setDragImage(defaultImg, 0, 0)
      }
      e.dataTransfer.effectAllowed = props.effectsAllowed
      e.dataTransfer.dropEffect = props.dropEffect
      e.dataTransfer.setData('text', JSON.stringify(props.dataTransfer))
      emit('dragstarted', props.dataTransfer)
    }

    function dragenter (e) {
      // const offset = this.getOffset()
      // if (e.clientY > offset.top && e.clientY < offset.bottom && e.clientX > offset.left && e.clientX < offset.right)
      // this.$emit('asd', {from: draggingData, to: this.dataTransfer})
      // use dispatchEvent because emit causes laggy
      el.value.dispatchEvent(new CustomEvent('dragentered', {detail:{...props.dataTransfer, ref: el.value}}))
    }

    function drop (e) {
      if (!props.droppable) return
      const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
      emit('dropped', {event: e, from: dataTransfer, to: props.dataTransfer})
    }

    function dragend () {
      dragging.value = false
      if (hasDragImageSlot) document.removeEventListener('dragover', documentDragover)
    }
    return {el, dragImageEl, dragging, hasDragImageSlot, dragstart, dragenter, drop, dragend}
  }
  // methods: {
  //   onDrag (e) {
  //     e.dataTransfer.effectAllowed = this.effectsAllowed
  //     e.dataTransfer.dropEffect = this.dropEffect
  //     e.dataTransfer.setData('text', JSON.stringify(this.dataTransfer))
  //     if (this.mode === 'cut') this.$emit('remove', this.dataTransfer)
  //     this.$emit('dragstarted', this.dataTransfer)
  //   },
  //   onDrop (e) {
  //     const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
  //     this.$emit('dropped', {event: e, from: dataTransfer, to: this.dataTransfer})
  //   },
  //   dragEntered(e) {
  //     const offset = this.getOffset()
  //     // if (e.clientY > offset.top && e.clientY < offset.bottom && e.clientX > offset.left && e.clientX < offset.right)
  //       // this.$emit('asd', {from: draggingData, to: this.dataTransfer})
  //       this.$emit('dragentered', {...this.dataTransfer, ref: this.$el})
  //   },
  //   dragLeave (e) {
  //     // this.$emit('drag-leave')
  //   },
  //   dragEnd (e) {
  //     // this.$emit('drag-end')
  //   },
  //   getOffset () {
  //     const top = this.$el.getBoundingClientRect().top + this.offset.top
  //     const bottom = this.$el.getBoundingClientRect().bottom - this.offset.bottom
  //     const left = this.$el.getBoundingClientRect().left + this.offset.left
  //     const right = this.$el.getBoundingClientRect().right - this.offset.right
  //     return {top, bottom, left, right}
  //   }
  // }
}
</script>

<style scoped>
.drag-container {
  position: relative;
}
.drag-image {
  position: absolute;
  top: 0;
  left: 0;
  will-change: top, left;
  z-index: 999;
  pointer-events: none; 
}
</style>