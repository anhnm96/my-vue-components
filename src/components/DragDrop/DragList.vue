<template>
  <transition-group
    @transitionstart="moving = true"
    @transitionend="moving = false"
    move-class="drag-list--move"
    tag="div"
    @dragenter="dragenter"
  >
    <!-- @transitionend="test('trans')"
    @transitionrun="test('run')" -->
    <slot />
    <slot name="feedback">
      <p key="feedback" class="p-2 font-normal shadow-xs bg-">ád</p>
    </slot>
  </transition-group>
</template>

<script>
import {ref, onMounted, getCurrentInstance} from 'vue'
export default {
  props: {
    list: Array
  },
  setup(props, ctx) {
    const moving = ref(false)
    const instance = getCurrentInstance()
    onMounted(() => {
      console.log(instance.ctx.$slots.feedback)
    })
    function test(val) {
      console.log('test', val)
    }
    function dragenter() {

    }
    return {test, moving, dragenter}
  }
}
</script>

<style>
.drag-list--move {
  transition: transform 0.25s;
}
</style>