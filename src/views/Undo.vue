<template>
  <div>
    {{ a.state[0].count }}
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count++">+</button>
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count--">-</button>
    {{ a.state[0].count2 }}
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count2++">+</button>
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[0].count2--">-</button>
    {{ a.state[1].count }}
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count++">+</button>
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count--">-</button>
    {{ a.state[1].count2 }}
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count2++">+</button>
    <button class="p-2 ml-2 bg-gray-400" @click="a.state[1].count2--">-</button>
    <button
      class="p-2 ml-2 bg-gray-400 d"
      :class="{ 'cursor-not-allowed': !a.past.length }"
      @click="a.undo()"
      :disabled="!a.past.length"
    >
      undo {{ !a.past.length }}
    </button>
    <button
      class="p-2 ml-2 bg-gray-400 d"
      :class="{ 'cursor-not-allowed': !a.future.length }"
      @click="a.redo()"
      :disabled="!a.future.length"
    >
      redo {{ !a.future.length }}
    </button>
    <div>{{ a.current }}</div>
    <div>{{ a.past }}</div>
    <div>{{ a.future }}</div>
  </div>
</template>

<script>
import Tracker from '@/hooks/useTracker'
import {reactive} from 'vue'
export default {
  setup() {
    const a = new Tracker(reactive([{count: 0, count2: 0}, {count: 0, count2: 0}]))
    return {a}
  }

}
</script>

<style>
</style>