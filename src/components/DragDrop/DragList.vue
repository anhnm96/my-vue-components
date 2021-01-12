<template>
  <transition-group :name="animationName" move-class="drag-list--move" :tag="tag" ref="listEl"
      @dragleave="dragleave" @dragend="dragend" @drop="drop" @dragover="dragover"
      @animationstart="setTransitionState(true)" @animationend="setTransitionState(false)"
      @transitionstart="setTransitionState(true)" @transitionend="setTransitionState(false)">
    <template v-if="showPlaceholderMove || showPlaceholderAdd">
      <DragItem
        v-for="(item, index) in itemsBeforePlaceholder"
        :key="item"
        :data-transfer="{ index, value: item }"
        :data-index="index"
        @dragentered="dragentered"
      >
        <template #default="{dragging}">
          <slot name="item" :item="item" :index="index" :inProgress="dragging" />
        </template>
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </DragItem>
      <DragItem ref="placeholderMoveEl" class="placeholder-move" @dragenter="setEnteringRef('placeholder-move')" v-if="showPlaceholderMove" key="drag-item--placeholder--move">
        <slot name="placeholder-move" :data="draggingItem.data" />
      </DragItem>
      <DragItem ref="placeholderAddEl" class="placeholder-add" @dragenter="setEnteringRef('placeholder-add')" v-if="showPlaceholderAdd" key="drag-item--placeholder--add">
        <slot name="placeholder-add" />
      </DragItem>
      <!-- index + 1 for placeholder -->
      <DragItem
        v-for="(item, index) in itemsAfterPlaceholder"
        :key="item"
        :data-transfer="{ index: index + 1 + itemsBeforePlaceholder.length, value: item }"
        :data-index="index + 1"
        @dragentered="dragentered"
      >
        <template #default="{dragging}">
          <slot
            name="item"
            :item="item"
            :index="index + 1 + itemsBeforePlaceholder.length"
            :inProgress="dragging"
          />
        </template>
        <template v-for="name of Object.keys($slots)" #[name]="scope">
          <slot :name="name" v-bind="scope" />
        </template>
      </DragItem>
    </template>
    <DragItem
    :handle="handle"
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
import {ref, computed, reactive, nextTick, watch} from 'vue'
import DragItem from './DragItem'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    },
    animationName: String,
    handle: String
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
      const payload = JSON.parse(e.dataTransfer.getData('text'))
      Object.assign(draggingItem, {inProgress: true, originalIndex: payload.index, currentIndex: payload.index, data: payload})
      listBeingDraggedOver.value = true
      // for move or add with placeholder
      // enteringRef.value = e.target
      placeholderIndex.value = payload.index
      // const unwatch = watch(placeholderMoveEl, (newVal) => {
      //   if (newVal) {
      //     console.log('start show inTransition', inTransition.value, document.elementFromPoint(e.clientX, e.clientY).closest('.drag-container') === placeholderMoveEl.value.$el)
      //     dragover(e, 'zxc')
      //   }
      // }, {immediate: true})
      // console.log('start', payload.index, showPlaceholderMove.value, placeholderMoveEl.value?.$el);
      // nextTick(() => {
      //   dragover(e, 'zxc')
      //   console.log('show', showPlaceholderMove.value, document.elementFromPoint(e.clientX, e.clientY).closest('.drag-container'))
      // //   if (!hoveringPlaceholder.value) {
      // //     // placeholderIndex.value = payload.index + 1
      // //     console.log('hovering not :(', enteringRef.value ,showPlaceholderMove.value, hoveringPlaceholder.value)
      // //     console.log('el', inTransition.value, document.elementFromPoint(e.clientX, e.clientY).closest('.drag-container') === placeholderMoveEl.value.$el)
      // //   }
      // // console.log('dragstart', placeholderIndex.value, enteringRef.value)
      // })
    }
    function dragover (e, msg) {
      // stop update enteringRef if in transition
      // if (!inTransition.value) {
      const dragItemElTarget = e.target.closest('.drag-container')
      // fast moving causes sometimes e.target is listEl. So dragItemElTarget would be null
      // if (dragItemElTarget.classList.contains('drag-list--move')) {console.log('MOVING')}
      // if (!dragItemElTarget) console.log('NULL cmnr')
      if (dragItemElTarget && !dragItemElTarget.classList.contains('drag-list--move')) {
        if (enteringRef.value !== dragItemElTarget) {
          if (enteringRef.value === null) { // need run once fix
            if (dragItemElTarget.classList.contains('placeholder-move') || dragItemElTarget.classList.contains('placeholder-add')) {
              console.log('kkk')
            } else {
              console.log('+1')
              placeholderIndex.value = placeholderIndex.value + 1
            }
          }
          enteringRef.value = dragItemElTarget
          console.log('over', msg, dragItemElTarget, showPlaceholderMove.value)
        }
        
        if (dragItemElTarget.dataset.index === '0') {
          const {width, height, top, left} = dragItemElTarget.getBoundingClientRect()
          if (e.clientY < top + height / 2) {
            placeholderIndex.value = 0
          }
        }
        if (dragItemElTarget.dataset.index === '1' && itemsBeforePlaceholder.value.length === 0) {
          const {width, height, top, left} = dragItemElTarget.getBoundingClientRect()
          if (e.clientY >= top + height / 2) {
            placeholderIndex.value = 1
          }
        }
      }
    }
    // this fire before list's dragover
    function dragentered({detail: payload}) {
      // stop if element is in transitioning
      // should check by classlist instead of inTransition that is slower
      // inTransition can't stop if directly dragenter children of target 
      if (payload.ref.classList.contains('drag-list--move')) {console.log('intransition', inTransition.value);return}
      // if (inTransition.value) {console.log('intransition', inTransition.value);return}
      console.log('dragentered index', payload.index, payload.value, `inProgress: ${draggingItem.inProgress}`)
      // return if event was bubbled from children
      if (enteringRef.value?.contains(payload.event.target)) {
        console.log('stop bubble')
        return
      }
      // dragging from outside source
      // if (!draggingItem.inProgress) {
      //   try {
      //     const draggingData = JSON.parse(payload.event.dataTransfer.getData('text'))
      //     draggingItem.data = draggingData
      //   } catch {
      //     console.log('err parse', payload.event)
      //   }
      // }
      listBeingDraggedOver.value = true
      // move with placeholder
      if (showPlaceholderMove.value) {
        // enter from placeholder
        if (enteringRef.value === placeholderMoveEl.value?.$el) {
          // enteringRef.value = payload.ref
          // moving down
          if (placeholderIndex.value === payload.index) {
            placeholderIndex.value = payload.index
            console.log('===')}
          // moving up. in case placeholder always show at mouse's position
          else if (placeholderIndex.value - payload.index === 1) {
            placeholderIndex.value = payload.index
            console.log('=1')
          }
          else {placeholderIndex.value = payload.index;console.log('else')}
          console.log('placeholder', placeholderIndex.value, payload.index, enteringRef.value)
          return
        } else {
          // enteringRef.value = payload.ref
          
          if (placeholderIndex.value > payload.index) {
            placeholderIndex.value = payload.index + 1
          } else {
            placeholderIndex.value = payload.index
          }
          console.log('# entering', placeholderIndex.value, payload.index)
        }
        
        return
      }
      // add with placeholder
      if (showPlaceholderAdd.value) {
        if (placeholderIndex.value === payload.index) {
           if (hoveringPlaceholder.value) {
            placeholderIndex.value = placeholderIndex.value + 1
            console.log('hover', placeholderIndex.value)
          }
          return
        }
        placeholderIndex.value = payload.index
        // console.log('new index', payload.index)
      }
      // move item immediately
      if (!hasPlaceholderMoveSlot && draggingItem.inProgress) {
        console.log('move immediate',draggingItem.currentIndex, payload.index)
        array_move(props.list, draggingItem.currentIndex, payload.index, false)
        // update index of dragging element
        draggingItem.currentIndex = payload.index
      }
      // add item but no placehoder-slot
      if (!hasPlaceholderAddSlot && !draggingItem.inProgress) {
        console.warn('DragList should be provided placeholder-add slot')
      }
    }
    const itemsBeforePlaceholder = computed(() => {
      // const directionValue = reachFirst.value ? 0 : 1
      const directionValue = 0
      return props.list.slice(0, placeholderIndex.value + directionValue)
    })
    const itemsAfterPlaceholder = computed(() => {
      // const directionValue = reachFirst.value ? 0 : 1
      const directionValue = 0
      return props.list.slice(placeholderIndex.value + directionValue)
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
    function dragend () {
      draggingItem.inProgress = false
      listBeingDraggedOver.value = false
    }
    function drop (e) {
      // handle add el from other list
      if (!showPlaceholderMove.value && !draggingItem.inProgress) {
        console.log('drop add', placeholderIndex.value)
        const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
        const clone = props.list
        clone.splice(placeholderIndex.value, 0, dataTransfer.value)
        emit('update:list', clone)
        listBeingDraggedOver.value = false
      }
      // handle move el inside list
      if (showPlaceholderMove.value) {
        console.log('drop lazy from', draggingItem.currentIndex, `to ${placeholderIndex.value}`, props.list[0])
        // -1 for 
        if (placeholderIndex.value < draggingItem.currentIndex)
          array_move(props.list, draggingItem.currentIndex, placeholderIndex.value, false)
        if (placeholderIndex.value > draggingItem.currentIndex)
          array_move(props.list, draggingItem.currentIndex, placeholderIndex.value - 1, false)
      }
      enteringRef.value = null
    }
    const inTransition = ref(false)
    function setTransitionState (val) {
      console.log('setTransition', val)
      inTransition.value = val
    }
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    function dragleave (e) {
      // move back to original if drag out of list or cancel
      // safari always return relatedTarget as null so we use elementFromPoint instead
      if (isSafari) {
        const mouseEl = document.elementFromPoint(e.clientX, e.clientY)
        // TODO: need check listBeingDraggedOver?
        if (listBeingDraggedOver.value && !listEl.value.$el.contains(mouseEl)) {
          handler()
        }
        return
      }
      if (listBeingDraggedOver.value && !listEl.value.$el.contains(e.relatedTarget)) {
        handler()
      }
      function handler () {
        // firefox will fire dragenter and dragleave forever 
        // if dragging at border of list when list is in transition
        if (!inTransition.value) {
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
    function setEnteringRef (param) {
      // nextTick(() => {
        // if (inTransition.value) {console.log('STOP');return}
        // console.log('set placeholder')
        // if (param === 'placeholder-move') {enteringRef.value = placeholderMoveEl.value?.$el}
        // if (param === 'placeholder-add') enteringRef.value = placeholderAddEl.value?.$el
      // })
    }
    return { dragover, setEnteringRef, placeholderMoveEl, placeholderAddEl, setTransitionState, draggingItem, drop, showPlaceholderMove, showPlaceholderAdd, listEl, placeholderIndex, dragentered, dragstart, dragleave, dragend, itemsBeforePlaceholder, itemsAfterPlaceholder}
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
  transition: transform 0.2s ease;
}
</style>