import { createVNode, createApp, ref, Component } from 'vue'
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

let newId = 0
let parentEl

function mergeOptions(options = {}) {
  let mergedOptions = { ...defaultOptions, ...options, id: newId, key: newId }

  // @ts-ignore
  mergedOptions.onClose = (payload) => {
    const removeIndex = notifications.value[mergedOptions.position].findIndex(
      n => n.props.id === mergedOptions.id
    )

    notifications.value[mergedOptions.position][removeIndex].result(payload)
    notifications.value[mergedOptions.position].splice(removeIndex, 1)
    // release from memory
    mergedOptions = null
  }

  return mergedOptions
}


export function show(options: ToastOptions, component: Component = DefaultNotification) {
  const mergedOptions = mergeOptions(options)
  let toastVNode = createVNode(component, mergedOptions)
  notifications.value[mergedOptions.position].push(toastVNode)

  if (!parentEl) {
    parentEl = document.createElement('div')
    document.body.appendChild(parentEl)
    createApp(NotificationContainer).mount(parentEl)
  }
  newId++

  return new Promise(resolve => {
    // @ts-ignore
    toastVNode.result = resolve // we'll call resolve in onClose function
  })
}
