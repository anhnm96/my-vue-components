import VDropdown from '@/components/Dropdown'
import {h} from 'vue'

export default {
    title: 'Dropdown',
    component: VDropdown
}

import DropdownComp from '@/views/DemoMenu'
export const Dropdown = () => ({
  render: () => h(DropdownComp)
})
