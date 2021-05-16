import { customRef, isReactive, unref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'

export default function useTrackRef(value) {
  let past = [], future = []
  let updateWithoutEffect = false
  let unwatch, watcher

  function updateEffect(val) {
    // clear array `future` if updating state
    // when it's not empty
    if (future.length > 0) future = []
    past.push(val)
    console.log('update', past)
  }

  // if value is reactive, we can only use watch to track
  // mostly this case happens when your value is passed from props
  if (isReactive(value)) {
    watcher = function () {
      return watch(value, (newVal) => {
        updateEffect(state)
        state = cloneDeep(newVal)
      })
    }
    unwatch = watcher()
  }

  let state = isReactive(value) ?
    cloneDeep(value) :
    customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          if (updateWithoutEffect) {
            value = newValue
            updateWithoutEffect = false
            trigger()
          } else if (value !== newValue) {
            updateEffect(value)
            console.log('set', newValue)
            value = newValue
            trigger()
          }
        }
      }
    })

  function undo() {
    if (past.length === 0) return
    // save changing state for redo
    future.push(unref(state))
    console.log('undo. push', state)
    // undo state
    const lastValue = past.pop()

    if (isReactive(value)) {
      unwatch()
      Object.assign(value, lastValue)
      state = cloneDeep(value)
      unwatch = watcher()
    } else {
      // set flag as true to update state
      // without pushing to `past` array
      updateWithoutEffect = true
      state.value = lastValue
    }
  }

  function redo() {
    if (future.length === 0) return
    // save changing state for undo
    past.push(unref(state))
    // redo state
    const nextValue = future.pop()

    if (isReactive(value)) {
      unwatch()
      Object.assign(value, nextValue)
      state = cloneDeep(value)
      unwatch = watcher()
    } else {
      // set flag as true to update state
      // without pushing to `past` array
      updateWithoutEffect = true
      state.value = nextValue
    }
  }

  return { state, undo, redo }
}
