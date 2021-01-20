<template>
    <DragList class="nest" v-model:list="taskList" :id-adapter="(val) => val.name" mode="cut">
      <template #default="{item}">
        {{item.name}}
        <NestedDrag :tasks="item.tasks" />
      </template>
      <template #placeholder-add>
        add
      </template>
      <template #placeholder-move>
        move
      </template>
    </DragList>
</template>

<script>
import DragList from '@/components/DragDrop/DragList'
import {computed} from 'vue'
export default {
    name: 'NestedDrag',
    components: {DragList},
    props: {
      tasks: Array
    },
    setup (props, {emit}) {
      const taskList = computed({
        get: () => props.tasks,
        set: val => {
          emit('update:tasks', val)
        }
      })
      return {taskList}
    }
}
</script>

<style scoped>
.nest {
  margin-top: 20px;
  border: 1px dashed black;
  min-height: 50px;
}
:deep(.drag-container) {
  padding: 10px;
}
</style>