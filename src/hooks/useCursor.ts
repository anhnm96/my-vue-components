import { ref, reactive, watch, Ref } from 'vue'

type Cell = { rowIndex: number, columnIndex: number }
type CellRegion = {
  start: { rowIndex: number, columnIndex: number },
  end: { rowIndex: number, columnIndex: number }
}
export class Cursor {
  containerElementRef: HTMLElement
  editing: Ref<boolean>
  selectedCell: Cell
  selectedRegion: CellRegion

  constructor(containerElementRef: HTMLElement) {
    this.containerElementRef = containerElementRef
    this.editing = ref(false)
    this.selectedCell = reactive({ rowIndex: -1, columnIndex: -1 })
    this.selectedRegion = reactive({
      start: { rowIndex: -1, columnIndex: -1 },
      end: { rowIndex: -1, columnIndex: -1 }
    })

    watch(this.selectedCell, ({ rowIndex, columnIndex }) => {
      console.log('watch selectedCell')
      this.selectedRegion.start.rowIndex = rowIndex
      this.selectedRegion.start.columnIndex = columnIndex
      this.selectedRegion.end.rowIndex = -1
      this.selectedRegion.end.columnIndex = -1
    })
  }
}