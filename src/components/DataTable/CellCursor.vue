<template>
  <span
    ref="cursorRef"
    class="cursor"
    :style="cursorStyle"
    @keydown.capture="onKeyDown"
    tabindex="0"
  >
    <slot
      v-if="editing"
      :name="'cell-input-' + column.name"
      :item="item"
      :column="column"
      :cell="cell"
    >
      <!-- <slot
        :name="'cell-input'"
        :item="item"
        :column="column"
        :cell="cell"
      >-->
      <v-input v-model="cell" class="cell-input" :style="inputStyle" />
      <!-- </slot> -->
    </slot>
  </span>
</template>

<script>
import VInput from '../VInput'
import cursor from '@/hooks/useCursor'
import {computed, inject, ref, watch, nextTick, getCurrentInstance } from 'vue'
export default {
  name: 'CellCursor',
  components: {VInput},
  setup() {
    const $items = inject('$items')
    const $columns = inject('$columns')
    const $cursor = inject('$cursor')
    const item = computed(() => $items[$cursor.rowIndex.value])
    const column = computed(() => $columns[$cursor.columnIndex.value])
    const instance = getCurrentInstance()
    const cell = computed({
      get: () => item.value[column.value.name],
      // make table emit on-input event to the wrapper
      set: (value) => instance.ctx.$parent.$emit('on-input', {rowIndex: $cursor.rowIndex.value, column: column.value, value})
    })

    // Re-focus CellCursor if cursor updated. This is to allow interact with keyboard 
    const cursorRef = ref(null)
    watch([$cursor.rowIndex, $cursor.columnIndex], async () => {
      $cursor.editing.value = false
      // Make sure the browser has finished painting updated style
      requestAnimationFrame(() => {
        cursorRef.value.focus()
      })
    })
    // Focus input when $cursor.editing is true
    watch($cursor.editing, async (val) => {
      if (val) {
        await nextTick()
        const input = cursorRef.value.querySelector('input')
        if (document.activeElement !== input) input.focus()
      } else {
        cursorRef.value.focus()
      }
    })
    watch($cursor.containerElementRef, () => $cursor.containerElementRef.value.addEventListener('click', () => cursorRef.value.focus()))

    // style
    const cursorStyle = computed(() => {
      // Hide the cell when cursor is not on any cell yet
      if (!$cursor.element.value) {
        return {
          display: 'none'
        }
      }
      return {
        // + 2px for border
        width: $cursor.element.value.offsetWidth + 2 + 'px',
        height: $cursor.element.value.offsetHeight + 2 + 'px',
        top: $cursor.element.value.offsetTop + 'px',
        left: $cursor.element.value.offsetLeft - 1 + 'px'
      }
    })

    const inputStyle = computed(() => {
      // Hide the cell when cursor is not on any cell yet
      if (!$cursor.element.value) {
        return {
          display: 'none'
        }
      }
      return {
        // - 2px for border
        width: $cursor.element.value.offsetWidth - 2 + 'px',
        height: $cursor.element.value.offsetHeight - 2 + 'px',
        'padding-left': '1px',
        'padding-right': '1px'
      }
    })

    function setEditMode (state) {
      $cursor.editing.value = state
    }

    function setupNavigation({items, columns}, setEditMode) {
      function onKeyDown(event) {
        // We do not want to alter behavior of most keys while in edit mode.
        // Only except:
        // + Tab: to move cursor to right/left cell
        // + Enter: to move cursor to below cell
        // + Esc: to exit edit mode
        if (
          $cursor.editing.value &&
          !(event.key === "Tab" || event.key === "Enter" || event.key === "Escape")
        ) {
          return;
        }

        // Do not intercept any key combination with modifier
        if (event.ctrlKey || event.altKey || event.metaKey) return;

        // Character key events should not be prevented so user could start typing
        // when cell is not in edit mode
        if (event.key.length === 1) {
          // If the cell is not in editing mode
          if (!$cursor.editing.value) {
            // Then enable it after first character has successfully been typed in
            // setTimeout(() => setEditMode(true));
            setEditMode(true)
          }
          return;
        }

        // Prevent default behavior of all keys
        event.preventDefault();

        navigateFromEvent(event);
      }

      function navigateFromEvent(event) {
        switch (event.key) {
          case "Enter":
            // Integrate with vuetify's menuable component
            // Do not handle Enter if the menuable component is showing while in edit mode
            // if (
            //   cursor.editing &&
            //   document.querySelector(".v-menu__content.menuable__content__active")
            // ) {
            //   break;
            // }

            if (!$cursor.editing.value) {
              // If not in edit mode, enable edit mode
              setEditMode(true);
            } else {
              // If in edit mode, move cursor down
              const cursorMoved = moveCursorDown({ force: true });
              // If the cursor wasn't moved (i.e., cursor at last line), manually disable edit mode
              if (!cursorMoved) setEditMode(false);
            }
            break;
          case "ArrowDown":
            moveCursorDown();
            break;
          case "ArrowUp":
            moveCursorUp();
            break;
          case "ArrowRight":
            moveCursorRight();
            break;
          case "ArrowLeft":
            moveCursorLeft();
            break;
          case "F2":
            setEditMode(true);
            break;
          case "Escape":
            setEditMode(false);
            break;
          case "Tab":
            // Ignore Alt+Tab or Ctrl+Tab
            if (event.ctrlKey || event.altKey) break;

            if (!event.shiftKey) {
              moveCursorRight({ force: true, nextLineOnEnd: true });
            } else {
              moveCursorLeft({ force: true, prevLineOnStart: true });
            }
            break;
          default:
            break;
        }
      }

      function moveCursorRight({ force = false, nextLineOnEnd = false } = {}) {
        if ($cursor.editing.value && !force) return;
        const nextIndex = $cursor.columnIndex.value + 1;
        if (columns.length > nextIndex) {
          $cursor.columnIndex.value = nextIndex
        } else if (nextLineOnEnd) {
          if (moveCursorDown({ force })) {
            $cursor.columnIndex.value = 0
          }
        }
      }

      function moveCursorLeft({ force = false, prevLineOnStart = false } = {}) {
        if ($cursor.editing.value && !force) return;
        const prevIndex = $cursor.columnIndex.value - 1;
        if (prevIndex >= 0) {
          $cursor.columnIndex.value = prevIndex;
        } else if (prevLineOnStart) {
          if (moveCursorUp({ force })) {
            $cursor.columnIndex = columns.length - 1;
          }
        }
      }

      function moveCursorDown({ force = false } = {}) {
        console.log('down', $cursor.editing.value)
        if ($cursor.editing.value && !force) return false;
        const nextIndex = $cursor.rowIndex.value + 1;
        if (items.length > nextIndex) {
          $cursor.rowIndex.value = nextIndex;
          return true;
        }

        return false;
      }

      /**
       * Move the cursor up
       * @returns {boolean}
       */
      function moveCursorUp({ force = false } = {}) {
        console.log('up', $cursor.editing.value)
        if ($cursor.editing.value && !force) return false;
        const prevIndex = $cursor.rowIndex.value - 1;
        if (prevIndex >= 0) {
          $cursor.rowIndex.value = prevIndex;
          return true;
        }
        return false;
      }

      return {onKeyDown}
    }
    const { onKeyDown } = setupNavigation({items: $items, columns: $columns}, setEditMode)
    
    return { item, column, cell, cursorRef, cursorStyle, inputStyle, editing: $cursor.editing, onKeyDown, cursor }
  }
}
</script>

<style scoped>
.cursor {
  position: absolute;
  border: 2px solid rgb(124, 179, 66);
  pointer-events: none;
}
::v-deep .cell-input {
  pointer-events: initial;
}
</style>