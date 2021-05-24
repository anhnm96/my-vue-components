import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
/*
describe('Expandable.vue', () => {
  it('Each accordion item content is hidden at the start', () => {
    const wrapper = mountExpandable()
    wrapper
      .findAll('[data-testid="accordion-item-content"]')
      .forEach(contentItemWrapper => {
        expect(contentItemWrapper.isVisible()).toBe(false)
      })
  })
  intersectionWith('if logged in, show logout button', async () => {
    const wrapper = mount(Expandable)
    // wait update the dom
    await wrapper.setData({loggedIn: true})
    expect(wrapper.find('button').isVisible()).toBe(true)
  })

  it('By default, randomNumber data value should be 0', () => {
    const wrapper = mount(Expandable)
    expect(wrapper.html()).toContain('<span>0</span>')
  })

  it('I fbutton is clicked, randomNumber should be between 1 and 10', async () => {
    const wrapper = mount(Expandable)
    await wrapper.find('button').trigger('click')
    const randomNumber = parseInt(wrapper.find('span').text())
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })

  it('I fbutton is clicked, randomNumber should be between 200 and 300', async () => {
    const wrapper = mount(Expandable, {
      props: {
        min: 200,
        max: 300
      }
    })
    await wrapper.find('button').trigger('click')
    const randomNumber = parseInt(wrapper.find('span').text())
    expect(randomNumber).toBeGreaterThanOrEqual(200)
    expect(randomNumber).toBeLessThanOrEqual(300)
  })
})

describe('LoginForm', () => {
  it('emits and event with a user data payload', () => {
    const wrapper = mount(Expandable)
    const input = wrapper.find('input[text="text"]')
    input.setValue("Adam")
    wrapper.trigger('submit')

    // assert event has been emitted
    const formSubmittedCalls = wrapper.emitted('formSubmitted')
    expect(formSubmittedCalls).toHaveLength(1)

    // assert payload is correct
    const expectedPayload = {name: 'Adam'}
    // [[{name: 'Adam'}]]
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(expectedPayload)
  })
})

import {getMessage} from '@/services/axios'
import flushPromises from 'flush-promises'
jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    // mock the API call
    const mockMessage = 'Hello from the db'
    getMessage.mockResolvedValueOnce({text: mockMessage})
    const wrapper = mount(Expandable)

    // wait for prosmise to resolve
    await flushPromises()
    // check that call happended once
    expect(getMessage).toHaveBeenCalledTimes(1)
    // check component displays message
    const message = wrapper.find('data-testid="message"').text()
    expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    // mock the API call
    const mockError = 'Oops! Somthing went wrong'
    getMessage.mockResolvedValueOnce({mockError})
    const wrapper = mount(Expandable)

    // wait for prosmise to resolve
    await flushPromises()
    // check that call happended once
    expect(getMessage).toHaveBeenCalledTimes(1)
    // check component displays error
    const message = wrapper.find('data-testid="message-error"').text()
    expect(message).toEqual(mockError)
  })
})

describe('MessageContainer', () => {
  it('Wraps MessageDisplay component', () => {
    const wrapper = mount(MessageContainer, {
      global: {
        stubs: {
          MessageDisplay: {
            template: '<p data-testid="message">Hello from the db!</p>'
          }
        }
      }
    })

    const message = wrapper.find('[data-testid="message"]').text()
    expect(message).toEqual('Hello from the db!')
  })
})
*/
