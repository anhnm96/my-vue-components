<template>
  <span class="selecting-region" :style="selectedCellRegionStyle"></span>
</template>

<script>
import {throttle} from 'lodash-es'
import { reactive, computed, inject, onMounted, watch, getCurrentInstance } from "vue"
export default {
  name: "CellSelectingRegion",
  setup() {
    const cursor = inject('$cursor')
    const selectedRegion = reactive({ start: {}, end: {} })
    watch([cursor.rowIndex, cursor.columnIndex], ([rowIndex, columnIndex]) => {
      selectedRegion.start = {rowIndex, columnIndex}
      selectedRegion.end = {rowIndex, columnIndex}
    })
    const instance = getCurrentInstance()
    onMounted(async () => {
      const $table = instance.ctx.$parent.$el
      let tbody
      $table?.addEventListener("mousedown", ($event) => {
        const td = event.target.closest("td")
        // Return if not found and td
        if (!td) return
        // If user didn't clicked on any regular cell, clear the cell region
        // if (!td.dataset.columnIndex) {
        //     selectedRegion = null
        //     return
        // }
        // If user right clicked on a regular cell,
        // and the cell is in the current selected region, do not clear the selected region
        // const cellRegion = selectedCellRegionRef.value
        // if (event.button === 2 && cellRegion &&
        //     inInclusiveRange(rowIndex, cellRegion.start.rowIndex, cellRegion.end.rowIndex) &&
        //     inInclusiveRange(columnIndex, cellRegion.start.columnIndex, cellRegion.end.columnIndex)
        // ) {
        //     return
        // }
        tbody = $table.querySelector("tbody")
        tbody.addEventListener("mousemove", onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      })

      const onMouseMove = throttle(function (event) {
        const td = event.target.closest("td")
          if (!td.dataset.columnIndex) return
          selectedRegion.start = {
            rowIndex: cursor.rowIndex,
            columnIndex: cursor.columnIndex,
          }
          selectedRegion.end = {
            rowIndex: parseInt(td.dataset.rowIndex),
            columnIndex: parseInt(td.dataset.columnIndex),
          }
        }, 20)
          
      function onMouseUp () {
        tbody.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    })
    
    const selectedCellRegionStyle = computed(() => {
      const $table = instance.ctx.$parent.$el
      const cellRegion = selectedRegion
      const startCellClass = `.cell-${cellRegion?.start.rowIndex}-${cellRegion?.start.columnIndex}`
      const endCellClass = `.cell-${cellRegion?.end.rowIndex}-${cellRegion?.end.columnIndex}`
      const startCell = $table?.querySelector(startCellClass)
      const endCell = $table?.querySelector(endCellClass)
      // Guard if mouseover el is not cell
      if (!startCell || !endCell) return { display: "none" }
      // If start cell and end cell is the same one, do not display
      if (startCell === endCell) return { display: "none" }
      let top, left, width, height

      if (startCell.offsetLeft < endCell.offsetLeft) {
        left = startCell.offsetLeft
        width = endCell.offsetLeft + endCell.offsetWidth - left
      } else {
        left = endCell.offsetLeft
        width = startCell.offsetLeft + startCell.offsetWidth - left
      }

      if (startCell.offsetTop < endCell.offsetTop) {
        top = startCell.offsetTop
        height = endCell.offsetTop + endCell.offsetHeight - top
      } else {
        top = endCell.offsetTop
        height = startCell.offsetTop + startCell.offsetHeight - top
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    })
    return { selectedRegion, selectedCellRegionStyle }
  }
}

// function makeSureCellRegionStayInsideTable (selectedCellRegionRef) {
//         const $table = getTable()

//         // When the number of rows changes, make sure the selected cell region stay inside
//         watch(() => $table.rows.length, (newRowsLength) => {
//             if (selectedCellRegionRef.value?.start.rowIndex > newRowsLength - 1) {
//                 selectedCellRegionRef.value.start.rowIndex = newRowsLength - 1
//             }
//             if (selectedCellRegionRef.value?.end.rowIndex > newRowsLength - 1) {
//                 selectedCellRegionRef.value.end.rowIndex = newRowsLength - 1
//             }
//         })

//         // When the number of columns changes, make sure the selected cell region stay inside
//         watch(() => $table.columns.length, (newColumnsLength) => {
//             /* istanbul ignore next */
//             if (selectedCellRegionRef.value?.start.columnIndex > newColumnsLength - 1) {
//                 selectedCellRegionRef.value.start.columnIndex = newColumnsLength - 1
//             }
//             /* istanbul ignore next */
//             if (selectedCellRegionRef.value?.end.columnIndex > newColumnsLength - 1) {
//                 selectedCellRegionRef.value.end.columnIndex = newColumnsLength - 1
//             }
//         })
//     }

</script>

<style scoped>
.selecting-region {
  position: absolute;
  background-color: rgba(124, 179, 66, 0.2);
  pointer-events: none;
}
</style>
