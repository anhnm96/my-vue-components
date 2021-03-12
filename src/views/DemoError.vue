<template>
  <div>
    <FrameError>
      <button @click="throwErr">Throw Error</button>
    </FrameError>
  </div>
</template>

<script>
import FrameError from '@/components/FrameError.vue'
export default {
  components: {FrameError},
  methods: {
    throwErr() {
      throw new Error('Oops')
    }
  },
  errorCaptured() {
    console.log('demo cap')
  }
}
</script>

<style>

</style>