import Slider from '@/components/Slider/SliderFrame'
import SliderSlides from '@/components/Slider/SliderSlides'
import SliderSlide from '@/components/Slider/SliderSlide'
import {h} from 'vue'

export default {
    title: 'Slider',
    component: Slider,
    subcomponents: {SliderSlides, SliderSlide}
}

import SampleComp from '@/views/DemoSlider'
export const Sample = () => ({
  render: () => h(SampleComp)
})

