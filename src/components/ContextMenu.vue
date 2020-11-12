<template>
  <div
    class="bg-white shadow-sm context__container"
    v-if="context.show"
    :style="{
      left: context.event.clientX + 'px',
      top: context.event.clientY + 'px',
    }"
  >
    <slot :context="context">
      <ul>
        <li
          class="hover:bg-gray-400"
          v-for="(action, index) in actions"
          :key="`menu-item-${index}`"
          @click="handleAction"
        >
          {{ action.label }}
        </li>
      </ul>
    </slot>
    <button @click="context.show = false" class="btn-close"></button>
  </div>
</template>

<script>
import {getCurrentInstance, onMounted, nextTick, reactive} from 'vue'
export default {
  name: 'ContextMenu',
  props: {
    actions: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const instance = getCurrentInstance()
    onMounted(() => {
      nextTick(() => {
        instance.ctx.$parent.$el.addEventListener('contextmenu', (event) => {
          event.preventDefault()
          context.show = true
          context.event = event
        })
      })
    })
    const handleAction = (e) => {
      console.log('action')
    }
    const context = reactive({show: false, event: {clientX: 0, clientY: 0}})
    return {handleAction, context}
  }
}
</script>

<style scoped>
.context__container {
  position: fixed;
  z-index: 1;
}

.btn-close {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}
</style>