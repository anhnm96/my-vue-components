<template>
  <component
    ref="el"
    class="drag-container"
    :class="clazz"
    :is="tag"
    :draggable="draggable && !handleLock"
    @dragstart.self="dragstart"
    @dragenter.prevent="dragenter"
    @dragover.prevent
    @dragleave="dragleave"
    @drop="drop"
    @dragend="dragend"
  >
    <slot :dragging="dragging" />
    <div v-if="dragging && hasDragImageSlot" class="drag-image" ref="dragImageEl">
      <slot name="drag-image" :data="dataTransfer" :width="width" :height="height" />
    </div>
  </component>
</template>

<script>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue'
import {DnDState} from './DnDStore'
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
    hoverClass: {
      type: String,
      default: 'drop-hover'
    },
    handle: String,
    dragType: String,
    acceptData: {
      type: Function,
      default: () => {}
    },
    allowClass: {
      type: String,
      default: 'drop-allowed'
    },
    forbiddenClass: {
      type: String,
      default: 'drop-forbidden'
    }
  },
  setup(props, {emit, slots}) {
    const el = ref(null)
    const dragging = ref(false)
    const dragImageEl = ref(null)
    const hasDragImageSlot = Object.keys(slots).includes('drag-image')
    const width = ref(0)
    const height = ref(0)
    // handle's stuffs
    let handleEl
    const handleLock = ref(false)
    function handleMouseDown () {
      handleLock.value = false
    }

    function handleMouseUp () {
      handleLock.value = true
      console.log('mous up')
    }

    onMounted(() => {
      // for drag-image slot
       const rect = el.value.getBoundingClientRect()
       width.value = rect.width
       height.value = rect.height
      // handle handle
       if (props.handle) {
        handleLock.value = true
        handleEl = el.value.querySelector(props.handle)
        handleEl.addEventListener('mousedown', handleMouseDown)
        handleEl.addEventListener('mouseup', handleMouseUp)
       }
    })
    onBeforeUnmount(() => {
      // it's ok if handlEl was removed before removeEventlistener
      // leave garbage collector to do the job
      handleEl?.removeEventListener('mousedown', handleMouseDown)
      handleEl?.removeEventListener('mouseup', handleMouseUp)
    })
    function documentDragover(e) {
      e.preventDefault()
      dragImageEl.value.style.position = 'fixed'
      dragImageEl.value.style.left = e.clientX + 'px'
      dragImageEl.value.style.top = e.clientY + 'px'
      dragImageEl.value.style.transform = 'translate(-50%, -50%)'
      // fix bug on firefox: drag event always return mouse position 0, 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=505521
      el.value.dispatchEvent(new MouseEvent('customdrag', e))
    }

    const dataAllowed = computed(() => {
      return props.acceptData(DnDState.data)
    })

    // class style during dragging for drop components
    const clazz = computed(() => {
      if (!DnDState.inProgress || !props.droppable) return null
      if (DnDState.dragType !== props.dragType) return null
      if (dataAllowed.value === undefined) return null
      return {
        [props.allowClass]: dataAllowed.value,
        [props.forbiddenClass]: !dataAllowed.value,
      }
    })

    function dragstart (e) {
      dragging.value = true
      Object.assign(DnDState, {ref: el.value, inProgress: true, data: props.dataTransfer, dragType: props.dragType, success: false})
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
    }
    function dragenter (e) {
      if (!props.droppable || dataAllowed.value === false || DnDState.dragType !== props.dragType) return
      // use dispatchEvent because emit causes laggy
      el.value?.dispatchEvent(new CustomEvent('dragentered', {detail:{event: e, ...props.dataTransfer, ref: el.value}}))
      // only add hoverClass on droppable components
      if (props.droppable)
        el.value?.classList.add(props.hoverClass)
    }

    function dragleave () {
      if (props.droppable) {
        //remove hover class
        // optional value in case of placeholder in drag list disappear
        el.value?.classList.remove(props.hoverClass)
      }
    }

    function drop (e) {
      if (!props.droppable || dataAllowed.value === false || DnDState.dragType !== props.dragType) return
      Object.assign(DnDState, {success: true})
      //remove hover class
      el.value.classList.remove(props.hoverClass)
      const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
      emit('dropped', {event: e, from: dataTransfer, to: props.dataTransfer})
    }

    function dragend () {
      if (handleEl) {
        handleLock.value = true
      }
      dragging.value = false
      Object.assign(DnDState, {inProgress: false, data: null, dragType: null, ref: null, dropdId: '', success: false})
      if (hasDragImageSlot) document.removeEventListener('dragover', documentDragover)
    }

    return { clazz, handleLock, el, width, height, dragImageEl, dragging, hasDragImageSlot, dragstart, dragenter, dragleave, drop, dragend}
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