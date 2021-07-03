import { createVNode, createApp, ref } from 'vue'
import DefaultNotification from './DefaultNotification.vue'
import NotificationContainer from './NotificationContainer.vue'
import { ToastOptions } from './types'

export const notifications = ref({
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
  'top-center': [],
  'bottom-center': [],
})

const defaultOptions = {
  type: 'info',
  position: 'top-right',
  timeout: 5000,
  showProgressBar: true,
}

function mergeOptions(options = {}) {
  const onClose = ({ position, id }, payload) => {
    result(payload)
    const removeIndex = notifications.value[position].findIndex(
      n => n.props.id === id
    )
    notifications.value[position].splice(removeIndex, 1)
  }

  return { ...defaultOptions, ...options, key: newId, id: newId, onClose }
}

let result // this is promise resolve
let newId = 0
let parentEl
export function show(options: ToastOptions, component = DefaultNotification) {
  const mergedOptions = mergeOptions(options)
  let toastVNode = createVNode(component, mergedOptions)
  notifications.value[mergedOptions.position].push(toastVNode)

  if (!parentEl) {
    parentEl = document.createElement('div')
    document.body.appendChild(parentEl)
    createApp(NotificationContainer).mount(parentEl)
  }
  newId++

  return new Promise(resolve => (result = resolve))
}
