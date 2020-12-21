<template>
  <transition-group
    @transitionstart="moving = true"
    @transitionend="moving = false"
    move-class="drag-list--move"
    tag="div"
    @dragenter="dragentered"
  >
    <DragItem
        v-for="(i, index) in list"
        :key="i"
        :data-transfer="{ index }"
      >
        <!-- <p>{{i}}</p> -->
        <RenderItem :render="render" :value="i" />
        <!-- <Item :value="i" /> -->
        <!-- <component :is="Item" v-bind="{value: i}" /> -->
      </DragItem>
    <!-- <slot/>
    <slot name="feedback">
      <p ref="feedback" key="feedback" class="p-2 font-normal shadow-xs bg-">ád</p>
    </slot> -->
  </transition-group>
</template>

<script>
import {ref, onMounted, getCurrentInstance, watch, computed} from 'vue'
import {dragEnter} from './DragState'
import RenderItem from './RenderItem'
import DragItem from './DragItem'
export default {
  props: {
    list: Array,
    tag: String,
    childProps: Object
  },
  components: {DragItem, RenderItem},
  setup(props, ctx) {
    const moving = ref(false)
    const instance = getCurrentInstance()

    function test(val) {
      console.log('test', val)
    }
    function dragentered() {
      console.log('draglistenter' , dragEnter, feedback.value)
    }
    const dragItems = computed(() => {
      // return instance.$children
      //   .find(x => x.$options.name === `SliderSlides`).$children;
    })
    watch(() => dragEnter.index, () => {
      ctx.slots.default()[0].children.push(feedback.value)
      console.log(ctx.slots.default()[0].children)
      console.log(instance)
      // console.log(instance)
      // dragEnter.ref.insertAdjacentHTML('afterEnd', feedback.value.outerHTML)
    })
    const render = ({value}) => {
      return (
        <p>{value}</p>
      )
    }
    const feedback = ref(null)
    const feedb = ref(null)
    const arr = ref([])
    return {render, feedb, test, moving, dragentered, feedback}
  }
}
</script>

<style>
.drag-list--move {
  transition: transform 0.25s;
}
</style>