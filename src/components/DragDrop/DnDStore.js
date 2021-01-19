import { reactive } from 'vue'

const DnDState = reactive({ref: null, inProgress: false, data: null, dragType: null, success: false, dropId: ''})
export { DnDState }