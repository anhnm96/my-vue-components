import { isEqual, cloneDeep, pick } from 'lodash-es'
import { computed, watch } from 'vue'

// state is object
class Tracker {
  constructor(state) {
    this.past = []
    this.state = state
    this.future = []
    this.initialState = cloneDeep(state)
    this.unwatch = this.handleWatch()
  }

  handleWatch() {
    return watch(this.state, (newState) => {
      if (this.future.length > 0) this.future = []
      // check if this is the first time
      if (this.past.length === 0) {
        this.past.push(this.beforeChanged())
      } else {
        this.past.push(this.current)
      }
      // if past.length === 0 then first param = undefined => func will use default 1st arg
      // which is initialState
      this.current = this.changed(this.past[this.past.length - 1], newState)
    })
  }

  undo() {
    if (this.past.length === 0) return
    this.unwatch()
    const lastValue = this.past.pop()
    // save changing state for redo
    const currentValue = {}
    for (let prop in lastValue) {
      currentValue[prop] = this.state[prop]
    }
    this.future.push(currentValue)
    // undo state
    Object.assign(this.state, lastValue)
    this.current = lastValue
    this.unwatch = this.handleWatch()
  }

  redo() {
    if (this.future.length === 0) return
    this.unwatch()
    const nextValue = this.future.pop()
    // save changing state for undo
    const currentValue = {}
    for (let prop in nextValue) {
      currentValue[prop] = this.state[prop]
    }
    this.past.push(currentValue)
    // redo state
    Object.assign(this.state, nextValue)
    this.current = nextValue
    this.unwatch = this.handleWatch()
  }

  changedProps(oldState = this.initialState, newState = this.state) {
    const props = []
    for (let prop in oldState) {
      if (!isEqual(newState[prop], oldState[prop])) {
        props.push(prop)
      }
    }
    return props
  }

  changed(oldState = this.initialState, newState = this.state) {
    return pick(newState, this.changedProps(oldState, newState))
  }

  beforeChanged(oldState = this.initialState, newState = this.state) {
    return pick(oldState, this.changedProps(oldState, newState))
  }

  // this.canUndo = () =>
  //   computed(() => !!this.past.length)


  canRedo() {
    return computed(() => !!this.future.length)
  }
}

export default Tracker

class ChangeTracker {
  constructor() {
    this._store = new WeakMap()
  }

  track(object) {
    // Clone the object
    const clone = cloneDeep(object)
    // Store it
    this._store.set(object, clone)
  }

  getOriginal(object) {
    // Access everything so if this function is used inside a
    // computed property, Vue will refresh the computed value
    // when object changes
    for (const prop in object) {
      // eslint-disable-next-line no-unused-vars
      const __ = object[prop]
    }
    return this._store.get(object)
  }

  changedProps(object) {
    const clone = this.getOriginal(object)
    if (clone === undefined) {
      throw new Error('This object was not tracked. Call objectTracker.track(object) first.')
    }
    const props = []
    for (const prop in object) {
      if (!isEqual(object[prop], clone[prop])) {
        props.push(prop)
      }
    }
    return props
  }

  changed(object) {
    return pick(object, this.changedProps(object))
  }

  /**
   * Mark a property as unchanged by copying value back to original object
   * @param {object} object
   * @param {string} prop
   */
  setUnchanged(object, prop) {
    const original = this.getOriginal(object)
    original[prop] = object[prop]
  }
}

export const changeTracker = new ChangeTracker()