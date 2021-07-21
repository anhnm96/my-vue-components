import CarouselList from '@/components/CarouselList/CarouselList.vue'
import { h } from 'vue'

export default {
  title: 'CarouselList',
  component: CarouselList
}

import CarouselListComp from '@/views/DemoCarouselList'
export const CarouselListDemo = () => ({
  render: () => h(CarouselListComp)
})
