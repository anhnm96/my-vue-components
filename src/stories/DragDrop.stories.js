import VDragDrop from '../components/DragDrop/DragItem'
import docImage from '../assets/document.png'
import smiley1 from '../assets/smiley01.png'
import smiley2 from '../assets/smiley02.png'
import smiley3 from '../assets/smiley03.png'
import smiley4 from '../assets/smiley04.png'
import smiley5 from '../assets/smiley05.png'
import smiley6 from '../assets/smiley06.png'
import {ref, reactive} from 'vue'
export default {
    title: 'DragDrop/SingleItem'
}

const Template = (args) => ({
    components: { VDragDrop },
    setup() {
      const docs = ref(['doc1', 'doc2'])
      const startPosition = reactive({})
      const totalDistance = reactive({value: 0, lock: false})
      const idx = ref(0)
      const hasTrash = ref(false)
      const trashRef = ref(null)
        function drag(e) {
            if (startPosition.x === undefined) Object.assign(startPosition, {x: e.clientX, y: e.clientY})
            const {top, left, height, width} = trashRef.value.$el.getBoundingClientRect()
            const trashCenter = {x: left + width / 2, y: top + height / 2}
            let remainingDistance = Math.sqrt(Math.pow(trashCenter.x-e.clientX, 2) + Math.pow(trashCenter.y-e.clientY, 2))
            // lock for calculating totalDistance only once since drag start
            if (!totalDistance.lock) {
              totalDistance.value = Math.sqrt(Math.pow(startPosition.x-trashCenter.x, 2) + Math.pow(startPosition.y-trashCenter.y, 2))
              totalDistance.lock = true
            }
            const distancePercent = Math.min(1, remainingDistance / totalDistance.value)
            // console.log(remainingDistance, this.totalDistance.value, distancePercent);
            if (distancePercent < 0.1) idx.value = 5
            else if (distancePercent >= 0.1 && distancePercent < 0.3) idx.value = 4
            else if (distancePercent >= 0.3 && distancePercent < 0.5) idx.value = 3
            else if (distancePercent >= 0.5 && distancePercent < 0.7) idx.value = 2
            else if (distancePercent >= 0.7 && distancePercent < 0.9) idx.value = 1
            else if (distancePercent >= 0.9) idx.value = 0
          }
        function dragend() {
            startPosition.x = undefined
            totalDistance.lock = false
          }
        function trashDrop() {
            hasTrash.value = true
          }
          const dragImage = {
            src: docImage,
            alt: 'drag image'
          }
      return { idx, args, docs, hasTrash, drag, dragend, trashDrop, dragImage, smiley1, smiley2, smiley3, smiley4, smiley5, smiley6, trashRef };
    },
    template: `
    <div>
    <VDragDrop hover-class="hovering" ref="trashRef" @dropped="trashDrop" :class="{full: hasTrash}" class="trash"></VDragDrop>
    <VDragDrop :droppable="false" @customdrag="drag" @dragend="dragend" v-for="doc in docs" :key="doc" :dataTransfer="{value: doc}">
      <img draggable="false" class="document" v-bind="dragImage">
      <template #drag-image>
        <img v-show="idx === 0" class="drag-image" :src="smiley1" >
        <img v-show="idx === 1" class="drag-image" :src="smiley2" >
        <img v-show="idx === 2" class="drag-image" :src="smiley3" >
        <img v-show="idx === 3" class="drag-image" :src="smiley4" >
        <img v-show="idx === 4" class="drag-image" :src="smiley5" >
        <img v-show="idx === 5" class="drag-image" :src="smiley6" >
      </template>
    </VDragDrop>
    </div>`,
  });

export const Primary = Template.bind({});

import { storiesOf } from '@storybook/vue3';
import {h} from 'vue'
import Test2 from './Test.vue'
storiesOf('DragDrop/DragList', module).add('SingleListWithPlaceHolder', () => ({
    render: () => h(Test2)
  }));

export const T3 = (args) => ({
  components: {Test2},
  render: () => h(Test2)
})
