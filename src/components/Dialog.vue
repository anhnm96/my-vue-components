<template>
  <teleport :to="attach" :disabled="disableTeleport">
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center"
    >
      <transition
        @before-leave="backdropLeaving = true"
        @after-leave="backdropLeaving = false"
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div v-if="showContent">
          <div
            class="absolute inset-0 bg-black opacity-25"
            @click="!persistent && close()"
          ></div>
        </div>
      </transition>

      <transition
        @before-leave="cardLeaving = true"
        @after-leave="cardLeaving = false"
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 scale-70"
        enter-to-class="scale-100 opacity-100"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="opacity-0 scale-70"
        appear
      >
        <div
          class="relative"
          role="dialog"
          aria-modal="true"
          v-if="showContent"
          v-trap-focus
          v-bind="$attrs"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue'
import trapFocus from '@/directives/trapFocus.js'
export default {
  inheritAttrs: false,
  directives: {'trap-focus': trapFocus},
  props: {
    attach: {
      type: String,
      default: undefined
    },
    modelValue: Boolean,
    persistent: Boolean
  },
  emits: ['close', 'update:modelValue'],
  setup(props, {emit}) {
    const showModal = ref(false)
    const showContent = ref(false)
    const backdropLeaving = ref(false)
    const cardLeaving = ref(false)
    const disableTeleport = props.attach === undefined ? true : false
    function onEscape (e) {
      if (props.modelValue && e.keyCode === 27) {
        close()
      }
    }
    onMounted(() => {
      document.addEventListener('keydown', onEscape)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', onEscape)
    })
    function show() {
      showModal.value = true
      showContent.value = true
    }
    function close() { // start closing animation
      showContent.value = false
    }
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
          show()
        } else {
          close()
        }
    }, {immediate: true})
    watch([backdropLeaving, cardLeaving], (newValues) => {
      if (newValues[0] === false && newValues[1] === false) {
        // close modal when leaving animation finished
        showModal.value = false
        emit('close')
        emit('update:modelValue', false)
      }
    })
    return {showModal, showContent, backdropLeaving, cardLeaving, show, close, disableTeleport}
  }
}
</script>