<template>
  <button
    v-if="active"
    type="button"
    class="fixed inset-0 w-full cursor-default"
    arial-label="close"
    @click="active = false"
  ></button>
  <div
    v-bind="$attrs"
    class="dropdown"
    @mouseenter="onHover(true)"
    @mouseleave="onHover(false)"
  >
    <button
      :id="id"
      ref="dropdownTrigger"
      class="dropdown-trigger"
      :class="[triggerClass, { 'cursor-not-allowed': disabled }]"
      @click="onClick"
      @contextmenu.prevent="onContextMenu"
      :aria-haspopup="popupRole"
      :aria-expanded="active"
      :disabled="disabled"
    >
      <slot name="trigger" :active="active"></slot>
    </button>
    <transition :name="animation">
      <div
        v-if="active"
        class="dropdown-menu"
        :role="popupRole"
        :aria-labelledby="id"
        :aria-multiselectable="multiple"
        v-trap-focus
      >
        <div class="dropdown-content" :style="containerStyle">
          <slot name="dropdown" :active="active" :toggle="toggle"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {ref, onMounted, onBeforeUnmount, watch, nextTick} from 'vue'
export default {
  name: 'VDropdown',
  props: {
    triggerClass: {
      type: String,
      default: ''
    },
    containerStyle: {
      type: String,
      default: ''
    },
    animation: {
      type: String,
      default: 'fade'
    },
    popupRole: {
      type: String,
      default: 'menu'
    },
    triggers: {
      type: Array,
      default: () => ['click']
    },
    multiple: {
      type: Boolean,
      default: null
    },
    disabled: Boolean
  },
  setup(props) {
    /** trigger button */
    const dropdownTrigger = ref(null)
    const id = `VDropdown__${new Date().getTime()}--trigger`
    // trigger event setup
    const onClick = () => {
      if (props.triggers.indexOf('click') < 0) return
        toggle()
    }
    const onContextMenu = () => {
        if (props.triggers.indexOf('contextmenu') < 0) return
        toggle()
    }
    const onHover = (val) => {
        if (props.triggers.indexOf('hover') < 0) return
        toggle(val)
    }
    const toggle = (val = null) => {
        if (props.disabled) return
        if (val !== null) active.value = val
        else active.value = !active.value
    }
    /** dropdown popup */
    const active = ref(false)
    function keyPress({ key }) {
        if (active.value && (key === 'Escape' || key === 'Esc')) {
            active.value = false
        }
    }
    // re-focus button trigger when close
    watch(active, (newActive) => {
      if (!newActive) nextTick(() => dropdownTrigger.value.focus())
    })

    onMounted(() => {
      if (typeof window !== 'undefined') {
          document.addEventListener('keyup', keyPress)
      }
    })
    onBeforeUnmount(() => {
      document.removeEventListener('keyup', keyPress)
    })
    return {dropdownTrigger, id, onClick, onContextMenu, onHover, toggle, active}
  }
}
</script>
<style scoped>
.dropdown {
  @apply relative inline-flex;
}
.dropdown-menu {
  top: 100%;
  @apply absolute w-48 mt-2 origin-top rounded-md shadow-lg;
}
.dropdown-content {
  @apply py-1 bg-white rounded-md shadow-xs;
}
</style>