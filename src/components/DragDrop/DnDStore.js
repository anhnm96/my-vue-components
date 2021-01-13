import { reactive } from 'vue'

const DnDState = reactive({inProgress: true, data: null, type: null})
export { DnDState }