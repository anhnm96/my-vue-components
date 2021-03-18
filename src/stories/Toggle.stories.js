import Toggle from '@/components/ToggleButton/index'
import {h} from 'vue'

export default {
    title: 'Toggle',
    component: Toggle
}

import ToggleComp from '@/views/DemoToggle'
export const Sample = () => ({
  render: () => h(ToggleComp)
})

