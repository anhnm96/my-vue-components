<template>
  <div>
    <input class="border border-solid" type="text" v-model="text" />
    <button @click="add2">add</button>
    <button @click="swap">swap</button>
    <button @click="swap2">swap 2</button>
    <div class="flex">
      <DragList2 v-model:list="list">
        <template #item="{ item, ind }">
          <p class="p-2 font-normal shadow" style="transition: all ease 0.5s">
            {{ item }} - {{ ind }}
          </p>
        </template>
        <template #placeholder>
          <p key="tets" class="bg-teal-400">testestestse</p>
        </template>
      </DragList2>
      <DragList2 v-model:list="items">
        <template #item="{ item, ind }">
          <p class="p-2 font-normal shadow" style="transition: all ease 0.5s">
            {{ item }} - {{ ind }}
          </p>
        </template>
      </DragList2>
    </div>
    <div class="demo">
      <VDrag class="drag" tag="span" v-for="i in items" :key="i" :dataTransfer="{value: i}">
        {{i}}
        <template #drag-image="{data}">
          <span v-show="!entering" class="drag">{{data.value}}</span>
          <span v-show="entering" class="drag" style="border-radius: 50%">DROP</span>
        </template>
      </VDrag>
      <VDrop class="copy" @dragenter="dragenter" @dragleave="dragleave" @dropped="drop2" :accept-data="(val) => val.value % 2 === 0">
        <div style="pointer-events: none">
          <span v-for="i in droplist" :key="i">{{i}}</span>
        </div>
      </VDrop>
      <div>
         <VDrop ref="trash" @dropped="trashDrop" :class="{full: hasTrash}" class="trash"></VDrop>
         <VDrag @drag="drag" @dragend="dragend" v-for="doc in docs" :key="doc" :dataTransfer="{value: doc}">
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
import DragList2 from '@/components/DragDrop/DragList2'
import VDragDrop from '@/components/DragDrop/DragItem'
import VDrag from '@/components/DragDrop/VDrag'
import VDrop from '@/components/DragDrop/VDrop'

export default {
  // eslint-disable-next-line
  components: {DragList, VDragDrop, VDrag, VDrop, DragList2},
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
      idx: 0,
      totalDistance: {value: 1, lock: false},
      hasTrash: false
    }
  },
  methods: {
    drag(e) {
      // console.log(e)
      if (this.startPosition.x === undefined) Object.assign(this.startPosition, {x: e.clientX, y: e.clientY})
      const {top, left, height, width} = this.$refs.trash.$el.getBoundingClientRect()
      const trashCenter = {x: left + width / 2, y: top + height / 2}
      let remainingDistance = Math.sqrt(Math.pow(trashCenter.x-e.clientX, 2) + Math.pow(trashCenter.y-e.clientY, 2))
      // lock for calculating totalDistance only once since drag start
      if (!this.totalDistance.lock) {
        this.totalDistance.value = Math.sqrt(Math.pow(this.startPosition.x-trashCenter.x, 2) + Math.pow(this.startPosition.y-trashCenter.y, 2))
        this.totalDistance.lock = true
      }
      const distancePercent = Math.min(1, remainingDistance / this.totalDistance.value)
      // console.log(remainingDistance, this.totalDistance.value, distancePercent);
      if (distancePercent < 0.1) this.idx = 5
      else if (distancePercent >= 0.1 && distancePercent < 0.3) this.idx = 4
      else if (distancePercent >= 0.3 && distancePercent < 0.5) this.idx = 3
      else if (distancePercent >= 0.5 && distancePercent < 0.7) this.idx = 2
      else if (distancePercent >= 0.7 && distancePercent < 0.9) this.idx = 1
      else if (distancePercent >= 0.9) this.idx = 0
    },
    dragend() {
      this.startPosition.x = undefined
      this.totalDistance.lock = false
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
      const tmp = this.list[0]
      this.list[0] = this.list[this.list.length - 1]
      this.list[this.list.length - 1] = tmp
    },
    drop3 ({from}) {
      this.droplist.push(from.value)
    },
    drop2({data}) {
      this.droplist.push(data.value)
    },
    dragleave() {
      this.entering = false
    },
    trashDrop() {
      console.log('trashdrop')
      this.hasTrash = true
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
