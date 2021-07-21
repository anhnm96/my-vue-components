<template>
  <slot />
</template>
<script>
export default {
    props: {
      capture: {
        default: false,
        type: Boolean,
      },
    },
    data() {
      return {
        error: null,
      };
    },
    errorCaptured(error) {
      console.log('cap')
      this.error = error;
      this.$emit('error', error);
      alert(error.message)
      // Optionally capture errors.
      if (this.capture) return false;
    },
    methods: {
      reset() {
        this.error = null;
        this.$emit('reset');
      },
    }
  }
</script>