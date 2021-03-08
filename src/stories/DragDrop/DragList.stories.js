import VDragList from '@/components/DragDrop/DragList'
import VDragDrop from '@/components/DragDrop/DragItem'
import {h} from 'vue'

export default {
    title: 'DragDrop/DragList',
    component: VDragList,
    subcomponent: VDragDrop
}

import DragWithHandleComp from '@/views/DragList/DragWithHandle'
export const DragWithHandle = () => ({
  render: () => h(DragWithHandleComp)
})

import TrelloComp from '@/views/DemoDnD/index'
export const Trello = () => ({
  render: () => h(TrelloComp)
})
