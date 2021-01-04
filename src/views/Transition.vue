<template>
  <div>
    <input class="border border-solid" type="text" v-model="text" />
    <button @click="add2">add</button>
    <button @click="swap">swap</button>
    <div class="flex">
      <DragList v-model:list="list">
        <template #item="{ item, ind }">
          <p class="p-2 font-normal shadow-xs" style="transition: all ease 0.5s">
            {{ item }} - {{ ind }}
          </p>
        </template>
        <template #placeholder>
          <p key="tets" class="bg-teal-400">testestestse</p>
        </template>
      </DragList>
      <DragList v-model:list="items">
        <template #item="{ item, ind }">
          <p class="p-2 font-normal shadow-xs" style="transition: all ease 0.5s">
            {{ item }} - {{ ind }}
          </p>
        </template>
        <!-- <template #placeholder>
          <p key="tets" class="bg-teal-400">testestestse</p>
        </template> -->
      </DragList>
    </div>

    <div class="demo">
      <VDrag class="drag" tag="span" v-for="i in items" :key="i" :dataTransfer="{value: i}">
        {{i}}
        <template #drag-image="{data}" >
          <span v-if="!entering" class="drag" style="border-radius: 50%">{{data.value}}</span>
          <span v-if="entering" class="drag" style="border-radius: 50%">DROP!!!!!</span>
        </template>
      </VDrag>
      <VDrop @dragentered="dragentered" @dragleave="dragleave" class="copy" @dropped="drop2" :accept-data="(val) => val.value % 2 === 0">
        <div>
          <span v-for="i in droplist" :key="i">{{i}}</span>
        </div>
      </VDrop>
      <div>
         <VDrop ref="trash" class="trash"></VDrop>
         <VDrag @dragover="drag" @dragend="dragend" v-for="doc in docs" :key="doc" :dataTransfer="{value: doc}">
          <img draggable="false" class="document" src="@/assets/document.png">
          <template #drag-image>
            <img v-if="idx === 0" class="drag-image" src="@/assets/smiley01.png" >
            <img v-if="idx === 1" class="drag-image" src="@/assets/smiley02.png" >
            <img v-if="idx === 2" class="drag-image" src="@/assets/smiley03.png" >
            <img v-if="idx === 3" class="drag-image" src="@/assets/smiley04.png" >
            <img v-if="idx === 4" class="drag-image" src="@/assets/smiley05.png" >
            <img v-if="idx === 5" class="drag-image" src="@/assets/smiley06.png" >
          </template>
         </VDrag>
      </div>
    </div>
  </div>
</template>

<script>
import {shuffle} from 'lodash-es'
import DragList from '@/components/DragDrop/DragList'
import DragItem from '@/components/DragDrop/DragItem'
import VDrag from '@/components/DragDrop/VDrag'
import VDrop from '@/components/DragDrop/VDrop'

export default {
  // eslint-disable-next-line
  components: {DragList, DragItem, VDrag, VDrop},
  data() {
    return {
      list: ['vue', 'ReactiveX', 'Drag and Drop', 'react', 'preact', 'golang', 'docker'],
      text: '',
      items: [1,2,3,4,5,6,7,8,9],
      droplist: [],
      entering: false,
      docs: ['doc1', 'doc2'],
      startPosition: {},
      imgName: ['smiley01', 'smiley02', 'smiley03', 'smiley04', 'smiley05', 'smiley06'],
      idx: 0
    }
  },
  methods: {
    drag(e) {
      if (this.startPosition.x === undefined) Object.assign(this.startPosition, {x: e.clientX, y: e.clientY})
      const {top, left, height, width} = this.$refs.trash.$el.getBoundingClientRect()
      const trashCenter = {x: left + width / 2, y: top + height / 2}
      let remainingDistance = Math.sqrt((trashCenter.x-e.clientX)^2 + (trashCenter.y-e.clientY)^2)
      let totalDistance = Math.sqrt((this.startPosition.x-trashCenter.x)^2 + (this.startPosition.y-trashCenter.y)^2)
      const distancePercent = Math.min(1, remainingDistance / totalDistance)
      console.log(remainingDistance, totalDistance, distancePercent);
      this.idx = 3 - Math.round((3 * distancePercent))
    },
    dragend() {
      this.startPosition.x = undefined
    },
    dragentered() {
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
      // const tmp = this.list[0]
      // this.list[0] = this.list[this.list.length - 1]
      // this.list[this.list.length - 1] = tmp
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
  background: url('~@/assets/trash.png') top left no-repeat;
  height: 128px;
  width: 128px;
  margin-top: 90px;
  float: right;
  opacity: 0.7;
}

.trash.full {
  background: url('~@/assets/trash.png') top right no-repeat;
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
</style>