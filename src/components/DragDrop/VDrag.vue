<template>
  <component
    :is="tag"
    :draggable="draggable"
    @dragstart.self="dragstart"
    @drag="drag"
    @dragenter.prevent
    @dragover.prevent
    @dragend="dragend"
    :class="{[ghostClass]: localDragging}"
    ref="el"
  >
    <slot />
    <div v-show="localDragging" class="drag-image" ref="dragImageWrapper">
      <slot name="drag-image" :data="dataTransfer" />
    </div>
    <!-- <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
        </template> -->
  </component>
</template>

<script>
import {ref} from 'vue'
import {setDragging, setDataTransfer} from './DragState'
import {createDragImage} from './createDragImage'
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
  setup(props, {emit, slots}) {
    const localDragging = ref(false)
    const el = ref(null)
    const dragImageWrapper = ref(null)
    let dragImage
    function dragover(e) {
      e.preventDefault()
    }
    function dragstart (e) {
      document.addEventListener('dragover', dragover)
      localDragging.value = true
      setDragging(true)
      setDataTransfer(props.dataTransfer)
      // e.dataTransfer.effectAllowed = props.effectsAllowed
      // e.dataTransfer.dropEffect = props.dropEffect
      // remove default drag image
      let defaultImg = document.createElement('div')
      defaultImg.style.visibility = 'hidden'
      e.dataTransfer.setDragImage(defaultImg, 0, 0)

      // create drag image if there's no drag-image slot
      if (!dragImageWrapper.value.childElementCount) {
        dragImage = createDragImage(el.value)
        dragImageWrapper.value.appendChild(dragImage)
      }
      // e.dataTransfer.setData('text', JSON.stringify(props.dataTransfer))
      emit('dragstarted', props.dataTransfer)
    }
    function dragend () {
      console.log('end');
      localDragging.value = false
      setDragging(false)
      emit('dragended', props.dataTransfer)
      // remove created dragImage
      if (dragImage) dragImageWrapper.value.removeChild(dragImage)
      dragImageWrapper.value.style.left = ''
      dragImageWrapper.value.style.top = ''
      dragImageWrapper.value.style.transform = ''
      document.removeEventListener('dragover', dragover)
    }
    function drag(e) {
      dragImageWrapper.value.style.left = e.clientX + 'px'
      dragImageWrapper.value.style.top = e.clientY + 'px'
      dragImageWrapper.value.style.transform = 'translate(-50%, -50%)'
    }

    return {dragImageWrapper, el, drag, localDragging, dragstart, dragend}
  }
}
</script>

<style>
.drag-image {
  position: fixed;
  will-change: top, left;
}
</style>