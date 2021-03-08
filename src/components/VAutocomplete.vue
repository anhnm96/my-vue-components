<template>
  <button
    v-if="shown"
    type="button"
    class="fixed inset-0 w-full cursor-default"
    arial-label="close"
    @click.prevent="close"
  ></button>
  <div
    role="combobox"
    :aria-expanded="shown"
    :aria-owns="`VAutocomplete__${timeId}--listbox`"
    aria-haspopup="listbox"
    class="autocomplete__container"
    v-bind="$attrs"
  >
    <input
      type="text"
      aria-autocomplete="list"
      ref="input"
      v-model="inputValue"
      @keyup.esc.prevent="shown = false"
      @keydown.down.prevent="keyArrows('down')"
      @keydown.up.prevent="keyArrows('up')"
      @keydown.enter="safeSalect(adaptedOptions[arrowCounter])"
      @keydown.tab.prevent="safeSalect(adaptedOptions[arrowCounter])"
      @click="shown = true"
      :aria-controls="`VAutocomplete__${timeId}--listbox`"
      :aria-activedescendant="`VAutocomplete__${timeId}--opt${arrowCounter}`"
      :aria-label="arialLabel"
    />
    <div
      class="dropdown-menu"
      ref="dropdown"
      :style="isListInViewportVertically && { bottom: '100%' }"
    >
      <ul
        :id="`VAutocomplete__${timeId}--listbox`"
        v-if="shown"
        role="listbox"
        class="dropdown-content"
        :aria-label="arialLabel"
      >
        <li
          v-for="(item, index) in adaptedOptions"
          :key="index"
          :id="`VAutocomplete__${timeId}--opt${index}`"
          role="option"
          :aria-selected="index === arrowCounter"
          :class="{ 'is-active': index === arrowCounter }"
          class="dropdown-item"
          @click="select(item)"
          @mouseenter="arrowCounter = index"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VAutocomplete',
  props: {
    /**
     * (optional) input value. Use when we want to pass input from parent.
     * Otherwise we use localInput
     */
    input: {
      type: String,
      default: undefined
    },
    /** `array` let select multiplt value */
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
    },
    localFilter: {
      type: Boolean,
      default: true
    },
    /** aria-label for input */
    arialLabel: String
  },
  mounted() {
    this.$nextTick(() => {
      if (document.activeElement === this.$refs.input) this.shown = true
    })
  },
  data () {
    return {
      localInput: '',
      shown: false,
      arrowCounter: 0,
      isListInViewportVertically: true,
      timeId: Date.now()
    }
  },
  watch: {
    shown(val) {
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
      this.shown = false
      this.arrowCounter = 0
      console.log('close')
    },
    /**
     * Enter key listener.
     * Select the hovered option.
     */
    safeSalect (item) {
      if (this.shown) {
        this.select(item)
      }
    },
    select (item){
      this.inputValue = item.label
      const newValue = this.multiple ? this.selected.concat(item.value) : item.value
      
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
        if (this.shown) {
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
            this.shown = true
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