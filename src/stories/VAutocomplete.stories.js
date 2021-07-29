import VAutocomplete from '@/components/VAutocomplete'
import { h } from 'vue'

export default {
  title: 'Autocomplete',
  component: VAutocomplete
}

import DemoAutocomplete from '@/views/DemoAutocomplete'
export const SimpleAutocomplete = () => ({
  render: () => h(DemoAutocomplete)
})
