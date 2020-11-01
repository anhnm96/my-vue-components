import { ref, reactive, computed, watch } from 'vue'

export class Cursor {

  constructor(containerElementRef) {
    this.containerElementRef = containerElementRef
    this.editing = ref(false)
    this.selectedCell = reactive({ rowIndex: -1, columnIndex: -1 })
    this.selectedRegion = reactive({
      start: { rowIndex: -1, columnIndex: -1 },
      end: { rowIndex: -1, columnIndex: -1 }
    })

    watch(this.selectedCell, ({ rowIndex, columnIndex }) => {
      this.selectedRegion.start.rowIndex = rowIndex
      this.selectedRegion.start.columnIndex = columnIndex
      this.selectedRegion.end.rowIndex = -1
      this.selectedRegion.end.columnIndex = -1
    })
  }

  get element() {
    return computed(() => {
      return this.containerElementRef.value?.querySelector(`.cell-${this.selectedCell.rowIndex}-${this.selectedCell.columnIndex}`)
    })
  }

}