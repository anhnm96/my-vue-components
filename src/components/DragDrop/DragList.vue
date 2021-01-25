<template>
  <transition-group :id="id" class="drag-list" move-class="drag-list--move" :tag="tag" ref="listEl" :data-group="dragType"
      @dragleave="dragleave" @dragend="dragend" @drop="drop" @dragover="dragover" @dragstart.stop @dragenter="dragenter"
      @animationstart="setTransitionState(true)" @animationend="setTransitionState(false)"
      @transitionstart="setTransitionState(true)" @transitionend="setTransitionState(false)">
    <div key="dummy-el" ref="dummyEl"></div>
    <template v-if="showPlaceholderMove || showPlaceholderAdd">
      <DragItem
        v-for="(item, index) in itemsBeforePlaceholder"
        :key="idAdapter(item)"
        :data-transfer="{ index, value: item }"
        :data-index="index"
        :data-group="dragType"
        :drag-type="dragType"
        :accept-data="acceptData"
        :trigger-move="triggerMove"
        @dragentered="dragentered"
      >
        <!-- <template #default="{dragging}">
          <slot name="item" :inProgress="dragging" />
        </template> -->
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" :item="item" :index="index" />
        </template>
      </DragItem>
      <DragItem ref="placeholderMoveEl" class="placeholder-move" v-if="showPlaceholderMove" key="drag-item--placeholder--move">
        <slot name="placeholder-move" :data="draggingItem.data" />
      </DragItem>
      <DragItem ref="placeholderAddEl" class="placeholder-add" v-if="showPlaceholderAdd" key="drag-item--placeholder--add">
        <slot name="placeholder-add" :data="draggingItem.data" />
      </DragItem>
      <!-- index + 1 for placeholder -->
      <DragItem
        v-for="(item, index) in itemsAfterPlaceholder"
        :key="idAdapter(item)"
        :data-transfer="{ index: index + 1 + itemsBeforePlaceholder.length, value: item }"
        :data-index="index + 1"
        :data-group="dragType"
        :drag-type="dragType"
        :accept-data="acceptData"
        :trigger-move="triggerMove"
        @dragentered="dragentered"
      >
        <!-- <template #default="{dragging}">
          <slot
            name="item"
            :item="item"
            :index="index + 1 + itemsBeforePlaceholder.length"
            :inProgress="dragging"
          />
        </template> -->
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" :item="item" :index="index + 1 + itemsBeforePlaceholder.length" />
        </template>
      </DragItem>
    </template>
    <DragItem
      v-else
      v-for="(item, index) in list"
      :key="idAdapter(item)"
      :data-transfer="{ index, value: item }"
      :drag-type="dragType"
      :trigger-move="triggerMove"
      :accept-data="acceptData"
      :handle="handle"
      @dragstart="dragstart"
      @dragentered="dragentered"
    >
      <template v-for="name of Object.keys($slots)" #[name]="scope">
        <slot :name="name" v-bind="scope" :item="item" :index="index" />
      </template>
    </DragItem>
  </transition-group>
</template>
<script>
import {ref, computed, reactive} from 'vue'
import {DnDState, DragListState} from './DnDStore'
import DragItem from './DragItem'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    idAdapter: {
      type: Function,
      default: (item) => (item)
    },
    tag: {
      type: String,
      default: 'div'
    },
    handle: String,
    triggerMove: String,
    dragType: String,
    acceptData: {
      type: Function,
      default: () => {}
    },
    mode: {
      type: String,
      default: 'copy'
    }
  },
  components: {DragItem},
  setup(props, {emit, slots}) {
    const listEl = ref(null)
    // draggingOver listEl
    const listBeingDraggedOver = ref(null)
    // currentIndex for hanlding move immediate only
    const draggingItem = reactive({inProgress: false, originalIndex: -1, currentIndex: -1, data: null})
    // index of hovering element
    const placeholderIndex = ref(-1)
    const enteringRef = ref(null)
    const hasPlaceholderMoveSlot = Object.keys(slots).includes('placeholder-move')
    const hasPlaceholderAddSlot = Object.keys(slots).includes('placeholder-add')
    // item events
    const dragstart = (e) => {
      // user can select text then drag even if draggable = false
      if (!e.target.draggable) return
      const payload = JSON.parse(e.dataTransfer.getData('text'))
      Object.assign(draggingItem, {inProgress: true, originalIndex: payload.index, currentIndex: payload.index, data: payload})
      placeholderIndex.value = payload.index
      DragListState.id = id
      console.log('dragstart', `placeholderIndex: ${payload.index}`, props.list[0])
    }

    const dummyEl = ref(null)
    function dragover (e) {
      // get closest drag element
      const dragItemElTarget = e.target.nodeType === 1 ? e.target.closest('.drag-container') : e.target.parentElement.closest('.drag-container')
      // stop update enteringRef if in transition
      // fast moving causes sometimes e.target is listEl. So dragItemElTarget would be null
      if (dragItemElTarget && !dragItemElTarget.classList.contains('drag-list--move')) {
        if (enteringRef.value !== dragItemElTarget) {
          // run once in draglist
          if (enteringRef.value === null && !(dragItemElTarget.classList.contains('placeholder-move') || dragItemElTarget.classList.contains('placeholder-add'))) {
            console.log('+1', props.list[0], placeholderIndex.value)
            placeholderIndex.value = placeholderIndex.value + 1
          }
          enteringRef.value = dragItemElTarget
          console.log('over', dragItemElTarget, props.list[0], placeholderIndex.value)
        }
        
        if (dragItemElTarget.dataset.index === '0') {
          const {width, height, top, left} = dragItemElTarget.getBoundingClientRect()
          const center = {x: width / 2 + left, y: height / 2 + top}
          const distanceToFirstItem = Math.sqrt(Math.pow(center.x - e.clientX, 2) + Math.pow(center.y - e.clientY, 2))
          const dummyElRect = dummyEl.value.getBoundingClientRect()
          const dummyCenterPosition = {x: dummyElRect.width / 2 + dummyElRect.left, y: dummyElRect.height / 2 + dummyElRect.top}
          const distanceToDummyEl = Math.sqrt(Math.pow(dummyCenterPosition.x - e.clientX, 2) + Math.pow(dummyCenterPosition.y - e.clientY, 2))
          if (distanceToDummyEl <= distanceToFirstItem) {
            placeholderIndex.value = 0
          }
        }
        if (dragItemElTarget.dataset.index === '1' && itemsBeforePlaceholder.value.length === 0) {
          const {width, height, top, left} = dragItemElTarget.getBoundingClientRect()
          const center = {x: width / 2 + left, y: height / 2 + top}
          const distanceToFirstItem = Math.sqrt(Math.pow(center.x - e.clientX, 2) + Math.pow(center.y - e.clientY, 2))
          const dummyElRect = dummyEl.value.getBoundingClientRect()
          const dummyCenterPosition = {x: dummyElRect.width / 2 + dummyElRect.left, y: dummyElRect.height / 2 + dummyElRect.top}
          const distanceToDummyEl = Math.sqrt(Math.pow(dummyCenterPosition.x - e.clientX, 2) + Math.pow(dummyCenterPosition.y - e.clientY, 2))
          if (distanceToFirstItem < distanceToDummyEl) {
            placeholderIndex.value = 1
          }
        }
      }
    }
    function dragenter (e) {
      // init list with 0 item
      console.log('listenter', e.target, props.list[0])
      if (props.list.length === 0 && !listBeingDraggedOver.value
       && !DnDState.ref.contains(e.target)
        && DnDState.dragType === props.dragType) {
        console.log('list dragenter')
        placeholderIndex.value = 0
        listBeingDraggedOver.value = true
        draggingItem.data = DnDState.data
        e.stopPropagation()
      }
    }

    // this fire before list's dragover
    function dragentered({detail: payload}) {
      // payload.event.stopPropagation()
      // stop if element is in transitioning
      // should check by classlist instead of inTransition that is slower
      // inTransition can't stop if directly dragenter children of target; cause bug in safari
      if (payload.ref.classList.contains('drag-list--move')) {console.log('intransition', inTransition.value);return}
      // if (inTransition.value) {console.log('intransition', inTransition.value);return}
      // return if bubble from nested draglist and target is not in dragging item
      // this is used for hide placeholder
      const closestList = payload.event.target.nodeType === 1 ? payload.event.target.closest('.drag-list') : payload.event.target.parentElement.closest('.drag-list')
      // console.log('ee', DnDState.ref, payload.event.target)
      // console.log('dragentered index', closestList, listEl.value.$el,
      // listEl.value.$el.contains(closestList), listEl.value.$el !== closestList
      // ,!DnDState.ref.contains(payload.event.target),closestList.dataset.group, DnDState.dragType === closestList.dataset.group)
       if (closestList && listEl.value.$el.contains(closestList) && listEl.value.$el !== closestList
        && DnDState.dragType === closestList.dataset.group) {
         console.log('dragenter', closestList.dataset.group, closestList, listEl.value.$el, listEl.value.$el !== closestList, DnDState.ref.contains(payload.event.target), payload.ref)
         console.log('stop bubble from nested list')
         return
       }
       if (closestList && listEl.value.$el.contains(closestList) && listEl.value.$el !== closestList && DnDState.ref.contains(payload.event.target)) {
         console.log('enter itself')
         return
       }
      // return if event was bubbled from children
      if (enteringRef.value?.contains(payload.event.target)) {
        // console.log('stop bubble', enteringRef.value, payload.event.target)
        // TODO: recheck whether neccessary
        // return
      }
      // dragging from outside source
      if (!draggingItem.inProgress) {
          draggingItem.data = DnDState.data
      }
      listBeingDraggedOver.value = true
      // move with placeholder
      if (showPlaceholderMove.value || showPlaceholderAdd.value) {
        // enter from placeholder
        if (enteringRef.value === placeholderMoveEl.value?.$el || enteringRef.value === placeholderAddEl.value?.$el) {
          // enteringRef.value = payload.ref
          placeholderIndex.value = payload.index
          console.log('placeholder', placeholderIndex.value, payload.index, enteringRef.value, props.list[0])
        } else {
          // enteringRef.value = payload.ref
          console.log('# entering', placeholderIndex.value, props.list[0])
          if (placeholderIndex.value > payload.index) {
            placeholderIndex.value = payload.index + 1
          } else {
            placeholderIndex.value = payload.index
          }
        }
        payload.event.stopPropagation()
        return
      }
      // move item immediately
      if (!hasPlaceholderMoveSlot && draggingItem.inProgress) {
        console.log('move immediate',draggingItem.currentIndex, payload.index)
        array_move(props.list, draggingItem.currentIndex, payload.index, false)
        // update index of dragging element
        draggingItem.currentIndex = payload.index
        Object.assign(DnDState, {dropId: id})
      }
      // add item but no placehoder-slot
      if (!hasPlaceholderAddSlot && !draggingItem.inProgress) {
        console.warn('DragList should be provided placeholder-add slot')
      }
      payload.event.stopPropagation()
    }
    const itemsBeforePlaceholder = computed(() => {
      return props.list.slice(0, placeholderIndex.value)
    })
    const itemsAfterPlaceholder = computed(() => {
      return props.list.slice(placeholderIndex.value)
    })
    const showPlaceholderMove = computed(() => {
      const res = hasPlaceholderMoveSlot && draggingItem.inProgress && listBeingDraggedOver.value
      return res
    })
    const showPlaceholderAdd = computed(() => {
      const res = hasPlaceholderAddSlot && !draggingItem.inProgress && listBeingDraggedOver.value
      return res
    })
    // list events
    const id = (Date.now() + Math.random()).toString(36)
    function dragend (e) {
      console.log('dragend', e, props.list[0], DnDState.success, draggingItem.inProgress, DnDState.success && props.mode === 'cut' && draggingItem.inProgress)
      if (draggingItem.inProgress && DnDState.success && props.mode === 'cut' && DnDState.dropId !== id) {
        const clone = props.list
        clone.splice(draggingItem.originalIndex, 1)
        emit('update:list', clone)
      }
      draggingItem.inProgress = false
      draggingItem.originalIndex = -1
      listBeingDraggedOver.value = false
      enteringRef.value = null
      placeholderIndex.value = -1
    }
    const dataAllowed = computed(() => {
      return props.acceptData(DnDState.data)
    })
    function drop (e) {
      // remember that we may drop on placeholder
      console.log(dataAllowed.value === false || DnDState.dragType !== props.dragType)
      if (dataAllowed.value === false || DnDState.dragType !== props.dragType) return
      console.log(showPlaceholderAdd.value, props.list[0])
      if (!showPlaceholderMove.value && !showPlaceholderAdd.value) DnDState.success = false
      // handle add el from other list
      if (showPlaceholderAdd.value) {
        console.log('drop add', placeholderIndex.value)
        const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
        const clone = props.list
        clone.splice(placeholderIndex.value, 0, dataTransfer.value)
        emit('update:list', clone)
        listBeingDraggedOver.value = false
        Object.assign(DnDState, {dropId: id})
        e.stopPropagation()
      }
      // handle move el inside list
      if (showPlaceholderMove.value) {
        console.log('drop lazy from', e, draggingItem.currentIndex, `to ${placeholderIndex.value}`, props.list[0])
        // -1 for 
        if (placeholderIndex.value < draggingItem.currentIndex)
          array_move(props.list, draggingItem.currentIndex, placeholderIndex.value, false)
        if (placeholderIndex.value > draggingItem.currentIndex)
          array_move(props.list, draggingItem.currentIndex, placeholderIndex.value - 1, false)
        draggingItem.inProgress = false
        Object.assign(DnDState, {dropId: id})
        e.stopPropagation()
      }
      enteringRef.value = null
    }
    const inTransition = ref(false)
    function setTransitionState (val) {
      // console.log('setTransition', val)
      inTransition.value = val
    }
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    function dragleave (e) {
      // move back to original if drag out of list or cancel
      // safari always return relatedTarget as null so we use elementFromPoint instead
      if (isSafari) {
        const mouseEl = document.elementFromPoint(e.clientX, e.clientY)
        // TODO: need check listBeingDraggedOver?
        // if (!listEl.value.$el.contains(mouseEl)) {
        if (!listEl.value.$el.contains(mouseEl) || (closestList && listEl.value.$el !== closestList
        && closestList.dataset.group === props.dragType
        && !mouseEl.classList.contains('placeholder-add')
        && !mouseEl.classList.contains('placeholder-move')
        && !DnDState.ref.contains(mouseEl) && !inTransition.value)) {
          handler()
        }
        return
      }
      // if (listBeingDraggedOver.value && !listEl.value.$el.contains(e.relatedTarget)) {
      const closestList =  e.relatedTarget && e.relatedTarget.nodeType === 1 ? e.relatedTarget.closest('.drag-list') : e.relatedTarget?.parentElement.closest('.drag-list')
      if (!listEl.value.$el.contains(e.relatedTarget) || (closestList && listEl.value.$el !== closestList
        && closestList.dataset.group === props.dragType
        && !e.relatedTarget.classList.contains('placeholder-add')
        && !e.relatedTarget.classList.contains('placeholder-move')
        && !DnDState.ref.contains(e.relatedTarget) && !inTransition.value)
        && closestList.id !== DragListState.id) { // there are chance dragleave el from nested one to parent relatedTarget was original list itself
      // if (!listEl.value.$el.contains(e.relatedTarget)) {
        console.log('LEFT', props.list[0], listEl.value.$el, e.relatedTarget, closestList, DragListState.id)
        handler()
        e.stopPropagation()
      }
      function handler () {
        // firefox will fire dragenter and dragleave forever 
        // if dragging at border of list when list is in transition
        if (!inTransition.value && draggingItem.originalIndex > -1) {
          array_move(props.list, draggingItem.currentIndex, draggingItem.originalIndex, false)
          draggingItem.currentIndex = draggingItem.originalIndex
        }
        listBeingDraggedOver.value = false
        enteringRef.value = null
        console.log('leave', e, showPlaceholderMove.value, props.list[0])
      }
    }
    const placeholderMoveEl = ref(null)
    const placeholderAddEl = ref(null)
    const hoveringPlaceholder = computed(() => {
      return (showPlaceholderMove.value && enteringRef.value === placeholderMoveEl.value?.$el) ||
        (showPlaceholderAdd.value && enteringRef.value === placeholderAddEl.value?.$el)
    })
    return { id, dragenter, dummyEl, listBeingDraggedOver, dragover, placeholderMoveEl, placeholderAddEl, setTransitionState, draggingItem, drop, showPlaceholderMove, showPlaceholderAdd, listEl, placeholderIndex, dragentered, dragstart, dragleave, dragend, itemsBeforePlaceholder, itemsAfterPlaceholder}
  }
}
function array_move(arr, oldIndex, newIndex, allowNegative = true) {
  if (!allowNegative && (oldIndex < 0 || newIndex < 0)) return
  console.log('move from', oldIndex, 'to', newIndex)
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
  transition: transform 0.2s ease-out;
}
</style>