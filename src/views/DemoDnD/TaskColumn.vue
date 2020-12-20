<template>
  <DragDrop
    tag="li"
    :draggable="true"
    :dataTransfer="{
      type: 'task',
      columnIndex: columnIndex,
      taskIndex: taskIndex,
      value: item,
    }"
    @remove="$emit('remove', $event)"
    @dragEnter="dragEnter"
  >
    <div class="block p-5 bg-white rounded-md shadow">
      <div class="flex justify-between">
        <p class="text-sm font-semibold leading-snug text-gray-900">
          {{ item.title }}
        </p>
        <span class="flex-shrink-0">
          <img class="w-6 h-6 rounded-full" :src="item.avatar" alt="avatar" />
        </span>
      </div>
      <div class="flex items-baseline justify-between">
        <div class="text-sm text-gray-600">
          <time :datetime="item.date">{{ item.date }}</time>
        </div>
        <div class="mt-2">
          <span
            class="inline-flex items-center px-2 py-1 leading-tight bg-teal-100 rounded"
          >
            <svg
              class="w-2 h-2 text-teal-500"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
            <span class="ml-2 text-sm font-medium text-teal-900"
              >Feature Request</span
            >
          </span>
        </div>
      </div>
    </div>
  </DragDrop>
</template>

<script>
import DragDrop from '@/components/DragDrop/DragDrop'
export default {
  components: {DragDrop},
  props: {
    item: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    dragEnter($event) {
      this.$emit('drag-enter', $event)
    }
  }
}
</script>

<style>
</style>