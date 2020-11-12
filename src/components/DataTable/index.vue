<template>
  <table
    @copy="copy"
    @paste="paste"
    ref="tableRef"
    @keydown.ctrl.z.exact="undo"
    @keydown.ctrl.shift.z="redo"
  >
    <button @click="itemsTracker.undo()">undo</button>
    <button @click="itemsTracker.redo()">redo</button>
    <div>{{ itemsTracker.current }}</div>
    <div>--------------------</div>
    <div>
      <span v-for="(i, ind) in itemsTracker.past.value" :key="`${ind}`">
        <span v-for="(j, inz) in i" :key="inz"
          >{{ j.color }}-{{ j.quantity }}</span
        >
        **
      </span>
    </div>
    <div>--------------------</div>
    <div>
      <span v-for="(i, ind) in itemsTracker.future.value" :key="`${ind}`">
        <span v-for="(j, inz) in i" :key="inz"
          >{{ j.color }}-{{ j.quantity }}</span
        >
      </span>
    </div>
    <thead>
      <tr>
        <th></th>
        <th
          v-for="(col, $columnIndex) in columns"
          :key="col.name"
          :class="`datatable__header datatable__header--${col.name}`"
          @mousedown="selectHeader('column', $columnIndex)"
        >
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, $rowIndex) in items" :key="item.id">
        <td class="datatable__row" @mousedown="selectHeader('row', $rowIndex)">
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
    <cell-selecting-region />
    <cell-cursor :items="items">
      <!-- Pass-through all slots to cell-input component. -->
      <!-- May filter later to only pass cell-input* slots -->
      <template v-for="name of Object.keys($slots)" #[name]="scope">
        <slot :name="name" v-bind="scope" />
      </template>
    </cell-cursor>
    <context-menu :actions="actions">
      <template #default="scope">
        <slot name="context-menu" v-bind="scope" :cursor="cursor">
          <button
            class="block w-full p-2 text-left hover:bg-gray-400"
            :disabled="scope.context.event.target.tagName === 'TH'"
            @click="
              insertRow(cursor.selectedCell.rowIndex, scope.context, 'above')
            "
          >
            Add row above
          </button>
          <button
            class="block w-full p-2 text-left hover:bg-gray-400"
            :disabled="scope.context.event.target.tagName === 'TH'"
            @click="insertRow(cursor.selectedCell.rowIndex, scope.context)"
          >
            Add row below
          </button>
          <button
            class="block w-full p-2 text-left hover:bg-gray-400"
            :disabled="scope.context.event.target.tagName === 'TD'"
            @click="
              insertColumn(
                cursor.selectedCell.columnIndex,
                scope.context,
                'left'
              )
            "
          >
            Add column left
          </button>
          <button
            class="block w-full p-2 text-left hover:bg-gray-400"
            :disabled="scope.context.event.target.tagName === 'TD'"
            @click="
              insertColumn(cursor.selectedCell.columnIndex, scope.context)
            "
          >
            Add column right
          </button>
        </slot>
      </template>
    </context-menu>
  </table>
</template>

<script>
import { ref, provide, nextTick } from 'vue'
import Cell from './Cell'
import CellCursor from './CellCursor'
import CellSelectingRegion from './CellSelectingRegion'
import {Cursor} from '@/hooks/useCursor'
import ContextMenu from '@/components/ContextMenu'
import {getCsvFromClipboardData} from '@/services/utils'
import Tracker from '@/hooks/useTracker'

export default {
  props: {
    items: Array,
    columns: Array
  },
  components: {Cell, CellCursor, CellSelectingRegion, ContextMenu},
  setup(props, {emit}) {
    const tableRef = ref(null)
    const cursor = new Cursor(tableRef)
    provide('$cursor', cursor)
    provide('$columns', props.columns)

    const itemsTracker = new Tracker(props.items)

    const undo = (e) => {
      itemsTracker.undo()
    }

    const redo = (e) => {
      itemsTracker.redo()
    }

    const actions = [
      {label: 'Add above' }
    ]
    const insertRow = (rowIndex, context, position = 'below') => {
      const posInsert = position === 'below' ? rowIndex + 1 : rowIndex
      const newArr = [...props.items]
      
      newArr.splice(posInsert, 0, dumpItem)
      console.log(newArr.length)
      emit('update:items', newArr)
      nextTick(() => console.log(props.items.length))
      
      // update focusing cursor if add row above
      if (position === 'above')
        selectHeader('row', rowIndex + 1)
      context.show = false
    }

    const insertColumn = (columnIndex, context, position = 'right') => {
      console.log('insertColumn', position)
      // TODO: add column, name column
      // const posInsert = position === 'left' ? rowIndex + 1 : rowIndex
      // const newArr = [...props.items]
      
      // newArr.splice(posInsert, 0, dumpItem)
      // console.log(newArr.length)
      // emit('update:items', newArr)
      // nextTick(() => console.log(props.items.length))
      
      // // update focusing cursor if add row above
      // if (position === 'above')
      //   selectHeader('row', rowIndex + 1)
      // context.show = false
    }

    const selectHeader = (type, index) => {
      if (type === 'row') {
        // Auto focus first cell when select row
        Object.assign(cursor.selectedCell, {rowIndex: index, columnIndex: 0})
        nextTick(() => {
          // We don't need to update selectedRegion.start because it's been updated in useCursor watch('selectedCell')
          // That's why we use nextTick to wait our watch finishes
          Object.assign(cursor.selectedRegion.end, {rowIndex: index, columnIndex: props.columns.length - 1})
        })
      }
      if (type === 'column') {
        // Auto focus first cell when select column
        Object.assign(cursor.selectedCell, {rowIndex: 0, columnIndex: index})
        nextTick(() => {
          // We don't need to update selectedRegion.start because it's been updated in useCursor watch('selectedCell')
          // That's why we use nextTick to wait our watch finishes
          Object.assign(cursor.selectedRegion.end, {rowIndex: props.items.length - 1, columnIndex: index})
        })
      }
    }
    const copy = (event) => {
      console.log(event)
      event.preventDefault()
      // Get the four corners of selected cell region
            const cellRegion = cursor.selectedRegion
            const topIndex = Math.min(cellRegion.start.rowIndex, cellRegion.end.rowIndex)
            const bottomIndex = Math.max(cellRegion.start.rowIndex, cellRegion.end.rowIndex)
            const leftIndex = Math.min(cellRegion.start.columnIndex, cellRegion.end.columnIndex)
            const rightIndex = Math.max(cellRegion.start.columnIndex, cellRegion.end.columnIndex)

            // Get the data to copy into clipboard
            const rows = []
            for (let i = topIndex; i <= bottomIndex; i++) {
                const row = []
                for (let j = leftIndex; j <= rightIndex; j++) {
                    row.push(props.items[i][props.columns[j].name])
                }
                rows.push(row)
            }

            // Build HTML version
            let html = '<meta http-equiv="content-type" content="text/html; charset=utf-8">'
            html += '<table><tbody>'
            rows.forEach(row => {
                html += '<tr>'
                row.forEach((cell) => {
                    html += '<td>'
                    html += escape(`${cell}`)
                    html += '</td>'
                })
                html += '</tr>'
            })
            html += '</tbody></table>'
            event.clipboardData.setData('text/html', html)

            // Build text version
            const text = rows.map(row => row.join('\t')).join('\n')
            event.clipboardData.setData('text/plain', text)
            console.log(text)
    }

    const paste = async (event) => {
      event.preventDefault()
      const pastedItems = getCsvFromClipboardData(
          event.clipboardData
      )
      if (!pastedItems.length) return

      // Get the four corners of selected cell region
      const cellRegion = cursor.selectedRegion
      let topIndex = Math.min(cellRegion.start.rowIndex, cellRegion.end.rowIndex)
      const bottomIndex = Math.max(cellRegion.start.rowIndex, cellRegion.end.rowIndex)
      const leftIndex = Math.min(cellRegion.start.columnIndex, cellRegion.end.columnIndex)
      // Only in case we also want to repeat columns
      // const rightIndex = max([cellRegion.start.columnIndex, cellRegion.end.columnIndex])

      // Start firing input events
      let rowsRepeated = false
      for (let i = 0; i < pastedItems.length; i++) {
          for (let j = 0; j < pastedItems[i].length; j++) {
              emit('on-input', {
                  rowIndex: topIndex + i,
                  column: props.columns[leftIndex + j],
                  value: pastedItems[i][j]
              })
              // If there should be a new row, we wait one tick for FEditableTable to
              // receive new rows prop
              if (topIndex + i >= props.items.length) {
                  await new Promise((resolve) => nextTick(resolve))
              }
          }

          // Repeat rows if we haven't reach the bottomIndex yet
          if (i + 1 === pastedItems.length && topIndex + i < bottomIndex) {
              i = -1
              topIndex = topIndex + pastedItems.length
              rowsRepeated = true
          }

          // Stop repeating rows if we have reached the bottomIndex
          if (rowsRepeated && topIndex + i >= bottomIndex) {
              break
          }
      }
    }

    return {itemsTracker, tableRef, undo, redo, actions, cursor, selectHeader, copy, paste, insertRow, insertColumn}
  }
}

const dumpItem = {
  "color": "",
  "cutpot": "cut",
  "family": "",
  "grade": "",
  "id": `${Math.random()}`,
  "note": null,
  "origin": "",
  "price": null,
  "product_id": "",
  "quantity": null,
  "unit": "",
  "variety": "",
  "$errors": {}
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

button:disabled {
  @apply cursor-not-allowed text-gray-400 italic;
}
</style>