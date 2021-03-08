import DataTable from '@/components/DataTable/index'
import {h} from 'vue'

export default {
    title: 'DataTable/Sample',
    component: DataTable
}

import SampleComp from '@/views/DemoTable'
export const Sample = () => ({
  render: () => h(SampleComp)
})

