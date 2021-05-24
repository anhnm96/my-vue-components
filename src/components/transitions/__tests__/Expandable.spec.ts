import { mount } from '@vue/test-utils'
import Expandable from '../Expandable.vue'

const mountExpandable = (args = {}) =>
  mount(Expandable, {
    slots: {
      header: `<template #header="{toggle}">
                <button data-test="header" @click="toggle()">Test</button>
              </template>`,
      default: '<div data-test="content">Hello</div>'
    },
    ...args,
  })

describe('Expandable.vue', () => {
  it('should expand, close on click', async () => {
    const wrapper = mountExpandable()
    // assert initial state to be false
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false)

    const header = wrapper.find('[data-test="header"]')
    await header.trigger('click')
    expect(wrapper.find('[data-test="content"]').text()).toEqual('Hello')
    // assert close
    await header.trigger('click')
    expect(wrapper.find('[data-test="content"]').exists()).toBe(false)
  })
})
