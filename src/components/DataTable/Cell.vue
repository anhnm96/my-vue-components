<template>
  <td
    @mousedown="onSelectCell"
    @dblclick="onDbClickCell"
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
    const onSelectCell = () => {
      $cursor.selectedCell.rowIndex = props.rowIndex
      $cursor.selectedCell.columnIndex = props.columnIndex
    }

    const onDbClickCell = () => {
      $cursor.editing.value = true
    }

    return {onSelectCell, onDbClickCell}
  }
}
</script>
<style scoped>
td {
  user-select: none;
  overflow: hidden;
}
</style>