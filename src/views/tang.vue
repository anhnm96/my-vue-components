<template>
  <div class="flex">
    <div class>
      <div class="w-40 p-2">
        <button
          @click="selectType('ssr')"
          :class="{'bg-green-200': active === 'ssr'}"
          class="font-semibold"
        >SSR</button>
        <button
          @click="selectType('sr')"
          :class="{'bg-green-200': active === 'sr' }"
          class="font-semibold"
        >SR</button>
        <button
          @click="selectType('r')"
          :class="{'bg-green-200': active === 'r' }"
          class="font-semibold"
        >R</button>
        <!-- monsters -->
        <div>
          <div v-show="active==='ssr'">
            <DragDrop
              class="p-2 border border-gray-600"
              v-for="(monster, index) in ssr"
              :key="index"
              tag="p"
              :dataTransfer="{type: 'ssr', index: index, name: monster.name}"
              :draggable="monster.life > 0"
            >{{monster.name}} ({{monster.life}})</DragDrop>
          </div>
          <div v-show="active === 'sr'">
            <p
              class="p-2 border border-gray-600"
              v-for="(monster, index) in sr"
              :key="index"
            >{{monster.name}} ({{monster.life}})</p>
          </div>
          <div v-show="active === 'r'">
            <p
              class="p-2 border border-gray-600"
              v-for="(monster, index) in r"
              :key="index"
            >{{monster.name}} ({{monster.life}})</p>
          </div>
        </div>
        <!-- monster -->
      </div>
    </div>
    <!-- stages -->
    <div class="flex">
      <!-- 1-10 -->
      <div>
        <div v-for="i in stages1" :key="i.name" class="text-sm w-72">
          <p class="p-1 font-semibold text-center border border-gray-600">{{i.stage}}. {{i.name}}</p>
          <DragDrop class="p-1 font-semibold text-center" @drop="drop($event, i.monsters)">
            &nbsp;
            <div
              class="relative inline-block h-6 px-2 py-1 shadow"
              v-for="(monster, index) in i.monsters"
              :key="monster.name"
            >
              {{monster.name}}&nbsp;
              <button
                @click="removeMonster(i.monsters, index)"
                class="absolute top-0 text-xs right-3"
              >x</button>
            </div>
          </DragDrop>
        </div>
      </div>
      <!-- 11-20 -->
      <div>
        <div v-for="i in stages2" :key="i.name" class="text-sm w-72">
          <p class="p-1 font-semibold text-center border border-gray-600">{{i.stage}}. {{i.name}}</p>
          <DragDrop class="p-1 font-semibold text-center" @drop="drop($event, i.monsters)">
            &nbsp;
            <div
              class="relative inline-block h-6 px-2 py-1 shadow"
              v-for="(monster, index) in i.monsters"
              :key="monster.name"
            >
              {{monster.name}}&nbsp;
              <button
                @click="removeMonster(i.monsters, index)"
                class="absolute top-0 text-xs right-3"
              >x</button>
            </div>
          </DragDrop>
        </div>
      </div>
      <!-- 21-30 -->
      <div>
        <div v-for="i in stages3" :key="i.name" class="text-sm w-72">
          <p class="p-1 font-semibold text-center border border-gray-600">{{i.stage}}. {{i.name}}</p>
          <DragDrop class="p-1 font-semibold text-center" @drop="drop($event, i.monsters)">
            &nbsp;
            <div
              class="relative inline-block h-6 px-2 py-1 shadow"
              v-for="(monster, index) in i.monsters"
              :key="monster.name"
            >
              {{monster.name}}&nbsp;
              <button
                @click="removeMonster(i.monsters, index)"
                class="absolute top-0 text-xs right-3"
              >x</button>
            </div>
          </DragDrop>
        </div>
      </div>
      <!-- 31-35 -->
      <div>
        <div v-for="i in stages4" :key="i.name" class="text-sm w-72">
          <p class="p-1 font-semibold text-center border border-gray-600">{{i.stage}}. {{i.name}}</p>
          <DragDrop class="p-1 font-semibold text-center" @drop="drop($event, i.monsters)">
            &nbsp;
            <div
              class="relative inline-block h-6 px-2 py-1 shadow"
              v-for="(monster, index) in i.monsters"
              :key="monster.name"
            >
              {{monster.name}}&nbsp;
              <button
                @click="removeMonster(i.monsters, index)"
                class="absolute top-0 text-xs right-3"
              >x</button>
            </div>
          </DragDrop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DragDrop from '@/components/DragDrop/DragDrop'
export default {
  components: {DragDrop},
  data () {
    return {
      ssr: [
        {name: 'Ô linh', life: 3},
        {name: 'Khai Minh', life: 3},
        {name: 'Đại tư mệnh', life: 3},
        {name: 'Thiếu tư mệnh', life: 3},
        {name: 'Toan dữ', life: 3},
        {name: 'Ứng long', life: 3},
      ],
      sr: [
        {name: 'Nhàn thiền', life: 3},
        {name: 'Thiên lộc', life: 3},

      ],
      r: [
        {name: 'Đại lạp', life: 3},
        {name: 'Tửu linh', life: 3},
        {name: 'Hồ linh', life: 3},

      ],
      active: 'ssr',
      stages1: [
        {stage: 1, name: 'Bùi mân', monsters: []},
        {stage: 2, name: 'Vô chi kỳ', monsters: []},
        {stage: 3, name: 'Tư nghệ', monsters: []},
        {stage: 4, name: 'Ứng long', monsters: []},
        {stage: 5, name: 'Vũ sư', monsters: []},
        {stage: 6, name: 'Hà bá', monsters: []},
        {stage: 7, name: 'Kim ô', monsters: []},
        {stage: 8, name: 'Khai minh', monsters: []},
        {stage: 9, name: 'Niên thú', monsters: []},
        {stage: 10, name: 'Bạch cốt', monsters: []}
      ],
      stages2: [
        {stage: 11, name: 'Bùi mân', monsters: []},
        {stage: 12, name: 'Vô chi kỳ', monsters: []},
        {stage: 13, name: 'Tư nghệ', monsters: []},
        {stage: 14, name: 'Ứng long', monsters: []},
        {stage: 15, name: 'Vũ sư', monsters: []},
        {stage: 16, name: 'Hà bá', monsters: []},
        {stage: 17, name: 'Kim ô', monsters: []},
        {stage: 18, name: 'Khai minh', monsters: []},
        {stage: 19, name: 'Niên thú', monsters: []},
        {stage: 20, name: 'Bạch cốt', monsters: []}
      ],
      stages3: [
        {stage: 21, name: 'Bùi mân', monsters: []},
        {stage: 22, name: 'Vô chi kỳ', monsters: []},
        {stage: 23, name: 'Tư nghệ', monsters: []},
        {stage: 24, name: 'Ứng long', monsters: []},
        {stage: 25, name: 'Vũ sư', monsters: []},
        {stage: 26, name: 'Hà bá', monsters: []},
        {stage: 27, name: 'Kim ô', monsters: []},
        {stage: 28, name: 'Khai minh', monsters: []},
        {stage: 29, name: 'Niên thú', monsters: []},
        {stage: 30, name: 'Bạch cốt', monsters: []}
      ],
      stages4: [
        {stage: 31, name: 'Bùi mân', monsters: []},
        {stage: 32, name: 'Vô chi kỳ', monsters: []},
        {stage: 33, name: 'Tư nghệ', monsters: []},
        {stage: 34, name: 'Ứng long', monsters: []},
        {stage: 35, name: 'Vũ sư', monsters: []}
      ]
    }
  },
  methods: {
    selectType(type) {
      this.active = type
    },
    drop ($event, monsters) {
      if (monsters.length === 3 || monsters.some(monster => monster.name === $event.from.name)) return
      monsters.push($event.from)
      this[$event.from.type][$event.from.index].life--
    },
    removeMonster (list, index) {
      const removedMonster = list.splice(index, 1)[0]
      this[removedMonster.type][removedMonster.index].life++
    }
  }
}
</script>

<style>
</style>