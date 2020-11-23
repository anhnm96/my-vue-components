<template>
  <portal to="modals">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center">
      <transition
        @before-leave="backdropLeaving = true"
        @after-leave="backdropLeaving = false"
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
        appear
      >
        <div v-if="!hideOverlay && showContent">
          <div class="absolute inset-0 bg-black opacity-25" @click="!persistent && close()"></div>
        </div>
      </transition>

      <transition
        @before-leave="cardLeaving = true"
        @after-leave="cardLeaving = false"
        enter-active-class="transition-all duration-150 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-class="opacity-0 scale-70"
        enter-to-class="scale-100 opacity-100"
        leave-class="scale-100 opacity-100"
        leave-to-class="opacity-0 scale-70"
        appear
      >
        <div v-if="showContent" class="relative">
          <slot></slot>
        </div>
      </transition>
    </div>
  </portal>
</template>

<script>
export default {
  props: {
    open: Boolean,
    hideOverlay: Boolean,
    persistent: Boolean
  },
  data() {
    return {
      showModal: false,
      showContent: false,
      backdropLeaving: false,
      cardLeaving: false,
    }
  },
  created() {
    const onEscape = (e) => {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    }
    document.addEventListener('keydown', onEscape)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape)
    })
  },
  watch: {
    open: {
      handler: function (newValue) {
        if (newValue) {
          this.show()
        } else {
          this.close()
        }
      },
      immediate: true
    },
    leaving(newValue) {
      if (newValue === false) {
        // close modal when leaving animation finished
        this.showModal = false
        this.$emit('close')
      }
    }
  },
  computed: {
    leaving() {
      return this.backdropLeaving || this.cardLeaving
    }
  },
  methods: {
    show() {
      this.showModal = true
      this.showContent = true
    },
    close() { // start closing animation
      this.showContent = false
    }
  }
}
</script>