<template>
  <div>
    <input class="border border-solid" type="text" v-model="text" />
    <button @click="add2">add</button>
    <button @click="swap">swap</button>
    <DragList v-model:list="list">
      <template #item="{ item, ind }">
        <p class="p-2 font-normal shadow-xs" style="transition: all ease 0.5s">
          {{ item }} - {{ ind }}
        </p>
      </template>
      <!-- <template #feedback>
        <p key="tets">testestestse</p>
      </template> -->
    </DragList>

    <div id="list-complete-demo" class="demo">
      <button v-on:click="shuffle1">Shuffle</button>
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="item in items"
          v-bind:key="item"
          class="inline-block list-complete-item"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
  </div>
</template>

<script>
import {shuffle} from 'lodash-es'
import DragList from '@/components/DragDrop/DragList'
import DragItem from '@/components/DragDrop/DragItem'
export default {
  // eslint-disable-next-line
  components: {DragList, DragItem},
  data() {
    return {
      list: ['vue', 'ReactiveX', 'Drag and Drop', 'react', 'preact', 'golang', 'docker'],
      text: '',
      items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
    }
  },
  methods: {
    dragenter({from, to}) {
      console.log('dragenter',from.index, to.index)
      const tmp = this.list[from.index]
      this.list[from.index] = this.list[to.index]
      this.list[to.index] = tmp
    },
    drop({from, to}) {
      // console.log('drop')
      const tmp = this.list[from.index]
      this.list[from.index] = this.list[to.index]
      this.list[to.index] = tmp
    },
    add2() {
      this.list.push(this.text)
      this.text = ''
    },
    swap() {
      this.list = shuffle(this.list)
      // const tmp = this.list[0]
      // this.list[0] = this.list[this.list.length - 1]
      // this.list[this.list.length - 1] = tmp
    },
     randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle1: function () {
      this.items = shuffle(this.items)
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
  transition: all 0.25s ease-out;
}
.fade-move {
  transition: transform 0.25s;
}
/* asd */
.list-complete-item {
  transition: all 1s;
  /* display: inline-block; */
  margin-right: 10px;
}
.list-complete-enter-from, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>