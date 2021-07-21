<template>
  <td
    :data-row-index="rowIndex"
    :data-column-index="columnIndex"
    :class="`cell-${rowIndex}-${columnIndex}`"
    class="text-truncate"
    @mousedown="onSelectCell"
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
    return {onSelectCell}
  }
}
</script>
<style scoped>
td {
  user-select: none;
  overflow: hidden;
}

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
