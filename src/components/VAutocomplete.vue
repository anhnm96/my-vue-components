<template>
  <div class="autocomplete__container" v-click-outside="close">
    <input
      type="text"
      v-model="inputValue"
      @keyup.esc.prevent="isActive = false"
      @keydown.down.prevent="keyArrows('down')"
      @keydown.up.prevent="keyArrows('up')"
      @keydown.enter="onEnter($event, adaptedOptions[arrowCounter])"
      @click="isActive = true"
      ref="input"
    />
    <!-- @keydown.enter.stop.prevent="select(adaptedOptions[arrowCounter])" -->
    <div
      class="dropdown-menu"
      ref="dropdown"
      :style="isListInViewportVertically && { bottom: '100%' }"
    >
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        v-if="isActive"
        class="dropdown-content"
      >
        <div
          role="menuitem"
          v-for="(item, index) in adaptedOptions"
          :key="index"
          :class="{ 'is-active': index === arrowCounter }"
          class="dropdown-item"
          mousedown.stop
          @click="select(item)"
          @mouseenter="arrowCounter = index"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VAutocomplete',
  directives: {
    clickOutside: {
      beforeMount (el, binding) {
        el.__ClickOutsideHandler__ = event => {
          // check if event's target is the el or contained by el
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.__ClickOutsideHandler__)
      },
      beforeUnmount (el) {
        document.body.removeEventListener('click', el.__ClickOutsideHandler__)
      }
    }
  },
  props: {
    input: {
      type: String,
      default: undefined
    },
    selected: {
      type: [String, Number, Object, Array],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    optionAdapter: {
      type: Function,
      default: value => ({
        id: value,
        label: value,
        value
      })
    }
  },
  mounted() {
    console.log('mounted')
    this.$nextTick(() => {
      if (document.activeElement === this.$refs.input) this.isActive = true
    })
    
  },
  data () {
    return {
      localInput: '',
      isActive: false,
      arrowCounter: -1,
      isListInViewportVertically: true
    }
  },
  watch: {
    isActive(val) {
      if (val) {
        this.calcDropdownInViewportVertical()
      }
    }
  },
  computed: {
    useLocal() {
      return this.input === undefined
    },
    inputValue: {
      get: function () {
        return this.useLocal ? this.localInput : this.input
      },
      set: function(value) {
        this.useLocal
          ? this.localInput = value
          : this.$emit('update:input', value)
      }
    },
    adaptedOptions() {
      return this.options.map(x => this.optionAdapter(x));
    },
    multiple() {
      return Array.isArray(this.selected);
    },
  },
  methods: {
    close () {
      this.isActive = false
      this.arrowCounter = -1
      console.log('close')
    },
    /**
     * Enter key listener.
     * Select the hovered option.
     */
    onEnter (event, item) {
      if (this.isActive) {
        event.stopPropagation()
        this.select(item)
      }
    },
    select (item){
      this.inputValue = item.label
      const newValue = this.multiple ? this.seleted.concat(item.value) : item.value
      
      this.$emit('update:selected', newValue)
      this.$refs.input?.focus()
      this.close()
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
    */
    keyArrows(direction) {
        const sum = direction === 'down' ? 1 : -1
        if (this.isActive) {
            let index = this.arrowCounter + sum
            index = index >= this.options.length ? this.options.length - 1 : index
            index = index < 0 ? 0 : index

            this.arrowCounter = index

            const list = this.$refs.dropdown.querySelector('.dropdown-content')
            const element = list.querySelectorAll('.dropdown-item:not(.is-disabled)')[index]

            if (!element) return

            const visMin = list.scrollTop
            const visMax = list.scrollTop + list.clientHeight - element.clientHeight

            if (element.offsetTop < visMin) {
                list.scrollTop = element.offsetTop
            } else if (element.offsetTop >= visMax) {
                list.scrollTop = (
                    element.offsetTop -
                    list.clientHeight +
                    element.clientHeight
                )
            }
        } else {
            this.isActive = true
        }
    },
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        /**
        * this.$refs.dropdown may be undefined
        * when Autocomplete is conditional rendered
        */
        if (this.$refs.dropdown === undefined) return

        const rect = this.$refs.dropdown.getBoundingClientRect()

        this.isListInViewportVertically = (
          rect.top >= 0 &&
          rect.bottom <= (window.innerHeight ||
            document.documentElement.clientHeight)
        )
      })
    }
  }
}
</script>
<style scoped lang="scss">
.autocomplete__container {
  position: relative;

  & input {
    width: 100%;
  }
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
  display: block;
  background-color: white;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.dropdown-content {
  overflow: auto;
  max-height: 200px;
  border-radius: 0.375rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.dropdown-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: #374151;
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  text-align: left;

  &:hover,
  &.is-active {
    color: #161e2e;
    background-color: #f4f5f7;
  }
}
</style>