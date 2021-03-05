<template>
  <div class="pb-20">
    <input class="border border-solid" type="text" v-model="text" />
    <button @click="add2">add</button>
    <button @click="swap">swap</button>
    <button @click="swap2">swap 2</button>
    <div class="flex">
      <DragList handle=".handle" v-model:list="list">
        <template #default="{ item, index }">
          <p class="p-2 font-normal shadow">
            <button class="handle">&#9776;</button>
            <span class="p-2">{{ item }} - {{ index }}</span>
          </p>
        </template>
        <template #placeholder-move>
          <div style="border: 1px solid green;height: 1px"></div>
        </template>
        <template #placeholder-add>
          <div style="border: 1px solid green;height: 1px"></div>
        </template>
      </DragList>
      <DragList v-model:list="items">
        <template #default="{ item, index, gg }">
          <p class="p-2 font-normal shadow">
            {{ item }} - {{ index }} {{gg}}
          </p>
        </template>
        <template #placeholder-move>
          moving
        </template>
        <template #placeholder-add="{data}">
          {{data.value}}
        </template>
      </DragList>
      <DragList mode="cut" name="fade" v-model:list="list">
        <template #default="{ item, index }">
          <p class="p-2 font-normal shadow">
            {{ item }} - {{ index }}
          </p>
        </template>
        <template #placeholder-add>
          <p class="p-2 font-normal shadow">
            test
          </p>
        </template>
      </DragList>
      <DragList v-model:list="list">
        <template #default="{ item, index, inProgress }">
          <p class="p-2 font-normal shadow" :class="{ghost: inProgress}">
            {{ item }} - {{ index }}
          </p>
        </template>
        <template #placeholder-move="{data}">
          <p class="p-2 font-normal shadow border-2 border-light-blue-500 border-dashed">
            {{ data.value }} - {{ data.index }}
          </p>
        </template>
        <!-- <template #drag-image="{data, width, height}">
          <p class="p-2 font-normal shadow border-2 border-green-300 rounded-md" :style="{width: width + 6 + 'px', height: height + 6 +'px'}">
            :)) - {{ data.value }}
          </p>
        </template> -->
      </DragList>
      <DragList v-model:list="items" :accept-data="({value}) => typeof value === 'number'">
        <template #default="{ item, index }">
          <p class="p-2 font-normal shadow">
            {{ item }} - {{ index }}
          </p>
        </template>
        <template #placeholder-move>
          <p class="p-2 font-normal shadow">
            move
          </p>
        </template>
        <template #placeholder-add="{data}">
          <p class="p-2 font-normal shadow">
            {{data.value}}
          </p>
        </template>
      </DragList>
    </div>
  </div>
</template>

<script>
import {shuffle} from 'lodash-es'
import DragList from '../components/DragDrop/DragList.vue'

export default {
  // eslint-disable-next-line
  components: {DragList},
  data() {
    return {
      list: ['vue', 'ReactiveX', 'Drag and Drop', 'react', 'preact', 'golang', 'docker'],
      text: '',
      items: [1,2,3,4,5,6,7],
      droplist: [],
      entering: false
    }
  },
  methods: {
    test(e) {
      const dataTransfer = JSON.parse(e.dataTransfer.getData('text'))
      console.log('test', dataTransfer)
    },
    dragendEx2() {
      this.entering = false
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
    },
    swap2() {
      // const tmp = this.list[0]
      // this.list[0] = this.list[this.list.length - 1]
      // this.list[this.list.length - 1] = tmp
      this.list.splice(0, 1)
    },
    drop3 ({from}) {
      this.droplist.push(from.value)
    },
    drop2({data}) {
      this.droplist.push(data.value)
    },
    dragleave() {
      this.entering = false
    }
  }
}
</script>

<style>
/* disable storybook auto add margin to p tag */
p {
  margin: 0 !important;
}
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
.drag {
  width: 60px;
  height: 60px;
  background-color: rgb(220, 220, 255);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 0 10px;
  font-size: 20px;
  transition: all 0.5s;
}
.copy {
  margin: 20px 10px;
  border: 1px solid black;
  height: 100px;
  position: relative;
  flex: 1;
}
.copy::before {
  content: "COPY";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.4);
  font-size: 25px;
  font-weight: bold;
}
.drop-allowed {
  background-color: rgba(0, 255, 0, 0.2);
}

.drop-forbidden {
  background-color: rgba(255, 0, 0, 0.2);
}

.drop-in {
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.4);
}

.trash {
  background: url('./assets/trash.png') top left no-repeat;
  height: 128px;
  width: 128px;
  margin-top: 90px;
  float: right;
  opacity: 0.7;
}

.trash.full {
  background: url('./assets/trash.png') top right no-repeat;
}

.document {
  margin-top: 10px;
  display: block;
  cursor: pointer;
  cursor: grab;
  cursor: -webkit-grab;
}
.drag-image {
  max-width: unset;
  width: 100px;
  height: 100px;
}
.ghost {
  opacity: 0.4;
  background-color: gray;
}
.hovering {
  box-shadow: 0 0 2px 4px gray;
}
.handle:hover {
  background-color: red;
}

</style>