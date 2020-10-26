<template>
  <td
    @mousedown="selectCell"
    @dblclick="cellDbClick"
    :data-row-index="rowIndex"
    :data-column-index="columnIndex"
    :class="`cell-${rowIndex}-${columnIndex}`"
  >
    <slot />
  </td>
</template>

<script>
import {inject} from 'vue'
export default {
  props: {
    rowIndex: Number,
    columnIndex: Number
  },
  setup(props) {
    const $cursor = inject('$cursor')
    const selectCell = () => {
      $cursor.rowIndex.value = props.rowIndex
      $cursor.columnIndex.value = props.columnIndex
    }

    const cellDbClick = () => {
      $cursor.editing.value = true
    }

    return {selectCell, cellDbClick}
  }
}
</script>
<style scoped>
td {
  user-select: none;
  overflow: hidden;
}
</style>