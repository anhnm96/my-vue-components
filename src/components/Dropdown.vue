<template>
  <button
    v-show="isOpen"
    @click="isOpen = false"
    type="button"
    class="fixed inset-0 w-full cursor-default"
  ></button>
  <div v-bind="$attrs" class="dropdown" @mouseenter="onHover">
    <button
      id="user-menu"
      type="button"
      class="dropdown-trigger"
      :class="[triggerClass, { 'cursor-not-allowed': disabled }]"
      @click="onClick"
      @contextmenu.prevent="onContextMenu"
      @focus.capture="onFocus"
      @focus="buttonHasFocus = true"
      @blur="buttonHasFocus = false"
      @keydown.esc="isOpen = false"
      aria-haspopup="true"
      :disabled="disabled"
    >
      <slot name="trigger" :hasFocus="buttonHasFocus" :isOpen="isOpen"></slot>
    </button>
    <transition
      enter-active-class="transition-all duration-75 ease-out"
      leave-active-class="transition-all duration-100 ease-in"
      enter-from-class="opacity-0 scale-70"
      enter-to-class="scale-100 opacity-100"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="opacity-0 scale-70"
    >
      <div v-show="isOpen" class="dropdown-menu" :aria-hidden="!isOpen">
        <div
          :role="ariaRole"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
          class="dropdown-content"
          :class="containerClass"
        >
          <slot name="dropdown"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VDropdown',
  props: {
    triggerClass: {
      type: String,
      default: ''
    },
    containerClass: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    animation: {
      type: String,
      default: 'fade'
    },
    ariaRole: {
      default: 'menu',
      validator(value) {
        return ['menu', 'listbox'].indexOf(value) > -1
      }
    },
    triggers: {
      type: Array,
      default: () => ['click']
    },
    multiple: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      buttonHasFocus: false,
      isOpen: false,
      selected: this.value
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onEscape)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onEscape)
  },
  methods: {
    onClick() {
        if (this.triggers.indexOf('click') < 0) return
        this.toggle()
    },
    onContextMenu() {
        if (this.triggers.indexOf('contextmenu') < 0) return
        this.toggle()
    },
    onHover() {
        if (this.triggers.indexOf('hover') < 0) return
        // this.isHoverable = true
        this.toggle()
    },
    onFocus() {
        if (this.triggers.indexOf('focus') < 0) return
        this.toggle()
    },
    /**
    * Toggle dropdown if it's not disabled.
    */
    toggle() {
        if (this.disabled) return
        this.isOpen = !this.isOpen
        // if (!this.isActive) {
        //     // if not active, toggle after clickOutside event
        //     // this fixes toggling programmatic
        //     this.$nextTick(() => {
        //         const value = !this.isActive
        //         this.isActive = value
        //         // Vue 2.6.x ???
        //         setTimeout(() => (this.isActive = value))
        //     })
        // } else {
        //     this.isActive = !this.isActive
        // }
    },
  },
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
.scale-70 {
  transform: scale(0.7);
}
.scale-100 {
  transform: scale(1);
}
</style>