<template>
  <div>
    {{ b.state.value }}
    <button @click="undo">
      Undo b
    </button>
    <button @click="redo">
      Redo b
    </button>
    <button @click="setB">
      Set b
    </button>
  </div>
</template>

<script>
import useTrackRef from '@/hooks/useTrackRef'
import {reactive} from 'vue'
export default {
  props: {
    items: Array
  },
  setup(props, {emit}) {
    const b = useTrackRef(props.items)
    function undo() {
      b.undo()
      emit('update:items', b.state.value)
    }
    function redo() {
      b.redo()
      emit('update:items', props.items)
    }
    function setB() {
      b.state.value = [{count: Math.floor(Math.random() * 10), count2: 0}, {count: 0, count2: 0}]
    }
    return {b, undo, redo, setB}
  }
}
</script>

<style>

</style>
