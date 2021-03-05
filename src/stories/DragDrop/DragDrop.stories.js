import VDragDrop from '@/components/DragDrop/DragItem'
import {h} from 'vue'

export default {
    title: 'DragDrop/SingleItem',
    component: VDragDrop
}

// import DynamicDragImageComp from './DynamicDragImage'
import DynamicDragImageComp from '@/views/Transition'
export const DynamicDragImage = () => ({
  render: () => h(DynamicDragImageComp)
})

  

  // import Test2 from '../Test'
//   import { storiesOf } from '@storybook/vue3';
// storiesOf('DragDrop/DragList', module).add('SingleListWithPlaceHolder', () => ({
//     render: () => h(Test2)
//   }));

// export const T3 = () => ({
//   components: {Test2},
//   render: () => h(Test2)
// })
