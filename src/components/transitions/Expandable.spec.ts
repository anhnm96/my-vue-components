import { mount, shallowMount } from '@vue/test-utils'
import Expandable from './Expandable.vue'

const accordionData = [
  {
    heading: 'One',
    content: 'Content one',
  },
  {
    heading: 'Two',
    content: 'Content Two',
  },
  {
    heading: 'Three',
    content: 'Content Three',
  },
]

const mountExpandable = (args = {}) =>
  mount(Expandable, {
    props: {
      expand: true,
    },
    ...args,
  })



// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
