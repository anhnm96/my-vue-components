<template>
  <div>
    <FrameError>
      <button @click="throwErr">
        Throw Error
      </button>
    </FrameError>
  </div>
</template>

<script>
import FrameError from '@/components/FrameError.vue'
export default {
  components: {FrameError},
  errorCaptured() {
    console.log('demo cap')
  },
  methods: {
    throwErr() {
      throw new Error('Oops')
    }
  }
}
</script>

<style>

</style>