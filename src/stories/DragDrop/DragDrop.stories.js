import VDragDrop from '@/components/DragDrop/DragItem'
import {h} from 'vue'

export default {
    title: 'DragDrop/SingleItem',
    component: VDragDrop
}

import SimpleDragWithImgOnDropComp from '@/views/SingleDnD/DragImgOnDrop'
export const SimpleDragWithImgOnDrop = () => ({
  render: () => h(SimpleDragWithImgOnDropComp)
})

import DropAcceptEvenNumberOnlyComp from '@/views/SingleDnD/RestrictDropable'
export const DropAcceptEvenNumberOnly = () => ({
  render: () => h(DropAcceptEvenNumberOnlyComp)
})

import DynamicDragImageComp from '@/views/SingleDnD/DynamicDragImage'
export const DynamicDragImage = () => ({
  render: () => h(DynamicDragImageComp)
})
