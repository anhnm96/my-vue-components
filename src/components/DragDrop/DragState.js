import { ref, reactive } from 'vue'

const dragging = ref(false)
const dataTransfer = reactive({test: 1})
function setDragging(val) {dragging.value = val}
function setDataTransfer(val) {Object.assign(dataTransfer, val)}
export { dragging, dataTransfer, setDragging, setDataTransfer }