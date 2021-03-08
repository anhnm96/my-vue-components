import VDialog from '@/components/Dialog'
import {h} from 'vue'

export default {
    title: 'Dialog',
    component: VDialog
}

import DialogComp from '@/views/DemoDialog'
export const Dialog = () => ({
  render: () => h(DialogComp)
})
