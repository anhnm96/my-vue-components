<template>
  <table ref="tableRef">
    <thead>
      <tr>
        <th
          :class="`datatable__header--${col.name}`"
          v-for="col in columns"
          :key="col.name"
        >
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, $rowIndex) in items" :key="item.id">
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
  </table>
</template>

<script>
import {ref, provide, getCurrentInstance } from 'vue'
import Cell from './Cell'
import CellCursor from './CellCursor'
import CellSelectingRegion from './CellSelectingRegion'
import {Cursor} from '@/hooks/useCursor'
export default {
  props: {
    items: Array,
    columns: Array
  },
  components: {Cell, CellCursor, CellSelectingRegion},
  setup(props) {
    const tableRef = ref(null)
    provide('$cursor', new Cursor(tableRef))
    provide('$items', props.items)
    provide('$columns', props.columns)
    const test = () => {
      console.log('test')
    }
    return {tableRef, test}
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
</style>