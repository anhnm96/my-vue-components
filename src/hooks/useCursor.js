import { ref, computed } from 'vue'

export class Cursor {

  constructor(containerElementRef) {
    this.containerElementRef = containerElementRef
    this.rowIndex = ref(-1)
    this.columnIndex = ref(-1)
    this.editing = ref(false)
  }

  get element() {
    return computed(() => {
      return this.containerElementRef.value?.querySelector(`.cell-${this.rowIndex.value}-${this.columnIndex.value}`)
    })
  }

}