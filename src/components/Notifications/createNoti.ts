import { createVNode, h, Component, render } from 'vue'
import Simple from './Simple.vue'

const toasts = {
  'top-left': {},
  'top-right': {},
  'bottom-left': {},
  'bottom-right': {},
  'top-center': {},
  'bottom-center': {}
}

const defaultOptions = {
  position: 'top-right',
  timeout: 5000
}

function mergeOptions(options = {}) {
  // const id = newId
  const onClose = (position, id, payload) => close(position, id, payload)

  return { ...defaultOptions, ...options, id: newId, onClose, show: true }
}

let result // this is promise resolve'
let newId = 0
let app = document.getElementById('app')
const notifications = document.createElement('div')
document.body.appendChild(notifications)
export function show(options) {
  const mergedOptions = mergeOptions(options)
  let container
  if (!toasts[options.position].container) {
    container = h('div', {}, [])
    toasts[options.position].container = container
  } else {
    container = toasts[options.position].container
  }
  console.log(toasts[mergedOptions.position])

  let toastVNode = createVNode(Simple, mergedOptions)
  container.children.push(toastVNode)
  render(container, notifications)
  toasts[mergedOptions.position][newId] = { container, toastVNode }
  newId++

  return new Promise((resolve) => (result = resolve))
}

function close(position, id, payload) {
  console.log('close', id)
  result(payload)
  const { container, toastVNode } = toasts[position][id]
  toastVNode.component.props.show = false

  // destroy vNode and remove container
  setTimeout(() => {
    render(null, app)
    // document.body.removeChild(container)
    delete toasts[position][id]
    console.log(toasts[position])
  }, 1000)
}
