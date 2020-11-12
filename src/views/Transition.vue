<template>
  <div>
    <input class="border border-solid" type="text" v-model="text" />
    <button @click="add">add</button>
    <button @click="swap">swap</button>
    <transition-group name="fade">
      <p class="p-2 font-normal shadow-xs" v-for="i in list" :key="i">
        {{ i }}
      </p>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ['vue', 'ReactiveX', 'Drag and Drop'],
      text: ''
    }
  },
  methods: {
    add() {
      this.list.push(this.text)
      this.text = ''
    },
    swap() {
      const tmp = this.list[0]
      this.list[0] = this.list[this.list.length - 1]
      this.list[this.list.length - 1] = tmp
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-out;
}
</style>