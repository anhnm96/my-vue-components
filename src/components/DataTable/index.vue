<template>
  <table ref="tableRef">
    <thead>
      <tr>
        <th></th>
        <th
          v-for="(col, $columnIndex) in columns"
          :key="col.name"
          :class="`datatable__header datatable__header--${col.name}`"
          @mousedown="select('column', $columnIndex)"
        >
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, $rowIndex) in items" :key="item.id">
        <td class="datatable__row" @mousedown="select('row', $rowIndex)">
          {{ $rowIndex + 1 }}
        </td>
        <Cell
          v-for="(col, $columnIndex) in columns"
          :key="col.name"
          :row-index="$rowIndex"
          :column-index="$columnIndex"
          >{{ item[col.name] }}</Cell
        >
      </tr>
    </tbody>
    <cell-cursor>
      <!-- Pass-through all slots to cell-input component. -->
      <!-- May filter later to only pass cell-input* slots -->
      <template v-for="name of Object.keys($slots)" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </cell-cursor>
    <cell-selecting-region />
    <context-menu :actions="actions">
      <template #default="scope">
        <slot name="context-menu" v-bind="scope" :cursor="cursor" />
      </template>
    </context-menu>
  </table>
</template>

<script>
import {ref, provide, nextTick } from 'vue'
import Cell from './Cell'
import CellCursor from './CellCursor'
import CellSelectingRegion from './CellSelectingRegion'
import {Cursor} from '@/hooks/useCursor'
import ContextMenu from '@/components/ContextMenu'

export default {
  props: {
    items: Array,
    columns: Array
  },
  components: {Cell, CellCursor, CellSelectingRegion, ContextMenu},
  setup(props) {
    const tableRef = ref(null)
    const cursor = new Cursor(tableRef)
    provide('$cursor', cursor)
    provide('$items', props.items)
    provide('$columns', props.columns)
    const test = () => {
      console.log('test')
    }
    const actions = [
      {label: 'Add above' }
    ]

    const select = (type, index) => {
      if (type === 'row') {
        // Auto focus first cell when select row
        cursor.selectedCell.rowIndex = index
        cursor.selectedCell.columnIndex = 0
        nextTick(() => {
          // We don't need to update selectedRegion.start because it's been updated in useCursor watch('selectedCell')
          // That's why we use nextTick to wait our watch finishes
          cursor.selectedRegion.end.rowIndex = index
          cursor.selectedRegion.end.columnIndex = props.columns.length - 1
        })
      }
      if (type === 'column') {
        // Auto focus first cell when select row
        cursor.selectedCell.rowIndex = 0
        cursor.selectedCell.columnIndex = index
        nextTick(() => {
          // We don't need to update selectedRegion.start because it's been updated in useCursor watch('selectedCell')
          // That's why we use nextTick to wait our watch finishes
          cursor.selectedRegion.end.rowIndex = props.items.length - 1
          cursor.selectedRegion.end.columnIndex = index
        })
      }
    }
    return {tableRef, test, actions, cursor, select}
  }
}
</script>

<style scoped>
table {
  text-align: center;
  border-collapse: collapse;
  position: relative;
  table-layout: fixed;
  width: 100%;
}

table:focus {
  background-color: aquamarine;
}

table,
th,
td {
  border: 1px solid gray;
}
.datatable__row,
.datatable__header {
  user-select: none;
}
</style>