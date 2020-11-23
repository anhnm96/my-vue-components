<template>
  <div class="dropdown">
    <button
      v-show="isOpen"
      @click="isOpen = false"
      type="button"
      class="fixed inset-0 w-full cursor-default"
    ></button>
    <button
      id="user-menu"
      @click="toggle"
      type="button"
      class="dropdown-trigger"
      :class="triggerClass"
      @focus="buttonHasFocus = true"
      @blur="buttonHasFocus = false"
      aria-haspopup="true"
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
          role="menu"
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
  props: {
    triggerClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      buttonHasFocus: false,
      isOpen: false,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onEscape)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.onEscape)
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    onEscape(e) {
      if (!this.isOpen || e.key !== 'Escape') {
        return
      }
      this.isOpen = false
    }
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