<template>
  <div
    class="bg-white border border-gray-300 shadow-sm cursor-pointer context__container"
    v-show="context.show"
    :style="{ left: context.x + 'px', top: context.y + 'px' }"
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
          context.x = event.clientX
          context.y = event.clientY
        })
      })
    })
    const handleAction = (e) => {
      console.log('action')
    }
    const context = reactive({show: false, x: 0, y: 0})
    return {handleAction, context}
  }
}
</script>

<style scoped>
.context__container {
  position: fixed;
  z-index: 1;
}
</style>