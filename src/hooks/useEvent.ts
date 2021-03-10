import {unref, watch } from 'vue'

export default function (elRef, name, handler, options) {
  const unwatch = watch(elRef, (elRef, _, onCleanUp) => {
    const el = unref(elRef)
    el && el.addEventListener(name, handler, options)
    onCleanUp(() => el && el.removeEventListener(name, handler))
  }, { immediate: true })
  return unwatch
}