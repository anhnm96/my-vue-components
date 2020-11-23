import { isEqual, cloneDeep, pick } from 'lodash-es'
import { watch, unref } from 'vue'

// state is object
class Tracker {
  past: Array<any>
  future: Array<any>
  state: any
  current: any
  unwatch: Function

  constructor(state: any) {
    this.past = []
    this.state = state
    this.future = []
    this.current = cloneDeep(unref(state))
    this.unwatch = this.handleWatch()
  }

  handleWatch() {
    return watch(this.state, (newState) => {
      if (this.future.length > 0) this.future = []
      // this.current now become prevState's snapshot
      this.past.push(this.current)
      // save current state's snapshot
      this.current = cloneDeep(unref(newState))
    })
  }

  undo() {
    if (this.past.length === 0) return
    this.unwatch()
    // save changing state for redo
    this.future.push(this.current)
    // undo state
    const lastValue = this.past.pop()
    Object.assign(this.state, lastValue)
    this.current = cloneDeep(unref(this.state))
    this.unwatch = this.handleWatch()
  }

  redo() {
    if (this.future.length === 0) return
    this.unwatch()
    // save changing state for undo
    this.past.push(this.current)
    // redo state
    const nextValue = this.future.pop()
    Object.assign(this.state, nextValue)
    this.current = cloneDeep(unref(this.state))
    this.unwatch = this.handleWatch()
  }

  // changedProps(oldState = this.initialState, newState = this.state) {
  //   const props = []
  //   for (let prop in oldState) {
  //     if (!isEqual(newState[prop], oldState[prop])) {
  //       props.push(prop)
  //     }
  //   }
  //   return props
  // }

  // changed(oldState = this.initialState, newState = this.state) {
  //   return pick(newState, this.changedProps(oldState, newState))
  // }

  // beforeChanged(oldState = this.initialState, newState = this.state) {
  //   return pick(oldState, this.changedProps(oldState, newState))
  // }

}

export default Tracker

// class ChangeTracker {
//   constructor() {
//     this._store = new WeakMap()
//   }

//   track(object) {
//     // Clone the object
//     const clone = cloneDeep(object)
//     // Store it
//     this._store.set(object, clone)
//   }

//   getOriginal(object) {
//     // Access everything so if this function is used inside a
//     // computed property, Vue will refresh the computed value
//     // when object changes
//     for (const prop in object) {
//       // eslint-disable-next-line no-unused-vars
//       const __ = object[prop]
//     }
//     return this._store.get(object)
//   }

//   changedProps(object) {
//     const clone = this.getOriginal(object)
//     if (clone === undefined) {
//       throw new Error('This object was not tracked. Call objectTracker.track(object) first.')
//     }
//     const props = []
//     for (const prop in object) {
//       if (!isEqual(object[prop], clone[prop])) {
//         props.push(prop)
//       }
//     }
//     return props
//   }

//   changed(object) {
//     return pick(object, this.changedProps(object))
//   }

//   /**
//    * Mark a property as unchanged by copying value back to original object
//    * @param {object} object
//    * @param {string} prop
//    */
//   setUnchanged(object, prop) {
//     const original = this.getOriginal(object)
//     original[prop] = object[prop]
//   }
// }

// export const changeTracker = new ChangeTracker()