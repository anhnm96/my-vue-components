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
    <!-- h1 h2 h3 -->
    <div class="demo mt-5">
      <VDragDrop @dragstart="test" tag="span" @dragend="dragendEx2" :droppable="false" v-for="i in items" :key="i" :dataTransfer="{value: i}">
        <template #default="{dragging}">
            <span class="drag" :class="{ghost: dragging}">h{{i}}</span>
        </template>
        <template #drag-image="{data}">
          <span v-show="!entering" class="drag">{{data.value}}</span>
          <span v-show="entering" class="drag" style="border-radius: 50%">DROP</span>
        </template>
      </VDragDrop>
      <VDragDrop :draggable="false" hover-class="hovering" class="copy" @dragenter="dragenter" @dragleave="dragleave" @dropped="drop3" :accept-data="(val) => val.value % 2 === 0">
        <div style="pointer-events: none">
          <span v-for="i in droplist" :key="i">{{i}}</span>
        </div>
      </VDragDrop>
        <!-- trash -->
        <DynamicDragImage />
    </div>
    <NestedDrag v-model:tasks="nest" />
  </div>
</template>

<script>
import {shuffle} from 'lodash-es'
import DragList from '@/components/DragDrop/DragList'
import DragList2 from '@/components/DragDrop/DragList2'
import VDragDrop from '@/components/DragDrop/DragItem'
import VDrag from '@/components/DragDrop/VDrag'
import VDrop from '@/components/DragDrop/VDrop'
import NestedDrag from './NestedDrag'
import DynamicDragImage from '@/views/SingleDnD/DynamicDragImage'

export default {
  // eslint-disable-next-line
  components: {DynamicDragImage, DragList, VDragDrop, VDrag, VDrop, DragList2, NestedDrag},
  data() {
    return {
      list: ['vue', 'ReactiveX', 'Drag and Drop', 'react', 'preact', 'golang', 'docker'],
      text: '',
      items: [1,2,3,4,5,6,7],
      droplist: [],
      entering: false,
      startPosition: {},
      imgName: ['smiley01', 'smiley02', 'smiley03', 'smiley04', 'smiley05', 'smiley06'],
      idx: 0,
      totalDistance: {value: 1, lock: false},
      hasTrash: false,
      nest: [
              {
                "name": "task 5",
                "tasks": []
              },
              {
                "name": "task 1",
                "tasks": []
              },
              {
                "name": "task 3",
                "tasks": [
                  {
                    "name": "task 2",
                    "tasks": []
                  },
                  {
                    "name": "task 4",
                    "tasks": []
                  }
                ]
              },
              {
                "name": "task 6",
                "tasks": [
                  {
                    "name": "task 7",
                    "tasks": [
                      {
                        "name": "task 8",
                        "tasks": []
                      }
                    ]
                  }
                ]
              }
            ]
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
    dragenter(e) {
      this.entering = true
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

<style scoped>
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