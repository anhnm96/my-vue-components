<template>
  <component
    :is="tag"
    :draggable="draggable"
    @dragstart.self="dragstart"
    @dragenter.prevent="dragenter"
    @dragover.prevent
    @dragend="dragend"
    class="drag-container"
    :class="{[ghostClass]: localDragging}"
    ref="el"
  >
    <slot />
    <div v-show="localDragging && hasDragImgSlot" class="drag-image" ref="dragImageWrapper">
      <slot name="drag-image" :data="dataTransfer" />
    </div>
    <!-- <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
        </template> -->
  </component>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {setDragging, setDataTransfer} from './DragState'
import {createDragImage} from './createDragImage'
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
      dragImageWrapper.value.style.position = 'fixed'
      dragImageWrapper.value.style.left = e.clientX + 'px'
      dragImageWrapper.value.style.top = e.clientY + 'px'
      dragImageWrapper.value.style.transform = 'translate(-50%, -50%)'
      // fix bug on firefox: drag event always return mouse position 0, 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=505521
      el.value.dispatchEvent(new MouseEvent('drag', e))
    }
    const hasDragImgSlot = Object.keys(slots).includes('drag-image')
    function dragstart (e) {
      console.log('start');
      // add dragover event for handling drag image position 
      // and prevent drag end move back animation when drop outside of dropable element
      document.addEventListener('dragover', dragover)
      localDragging.value = true
      setDragging(true)
      setDataTransfer(props.dataTransfer)
      // e.dataTransfer.effectAllowed = props.effectsAllowed
      // e.dataTransfer.dropEffect = props.dropEffect

      // create drag image if there's no drag-image slot
      if (dragImageWrapper.value.childElementCount) {
        // remove default drag image
        // BUG in safari: must use empty GIF image instead of creating a div element or safari will fire dragend immediately
        const defaultImg = new Image()
        defaultImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" //transparent gif, resolves issue with Safari that otherwise does not allow dragging
        defaultImg.style.visibility = 'hidden'
        e.dataTransfer.setDragImage(defaultImg, 0, 0)
        // dragImage = createDragImage(el.value)
        // dragImageWrapper.value.appendChild(dragImage)
      }
      e.dataTransfer.setData('text', JSON.stringify(props.dataTransfer))
      emit('dragstarted', props.dataTransfer)
    }
    function dragenter (e) {
      e.payload = props.dataTransfer
      emit('dragentered', e)
    }
    function dragend () {
      console.log('end');
      localDragging.value = false
      setDragging(false)
      emit('dragended', props.dataTransfer)
      // remove created dragImage
      // if (dragImage) dragImageWrapper.value.removeChild(dragImage)
      // dragImageWrapper.value.style.position = ''
      // dragImageWrapper.value.style.left = ''
      // dragImageWrapper.value.style.top = ''
      // dragImageWrapper.value.style.transform = ''
      document.removeEventListener('dragover', dragover)
    }

    return {hasDragImgSlot, dragenter, dragImageWrapper, el, localDragging, dragstart, dragend}
  }
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