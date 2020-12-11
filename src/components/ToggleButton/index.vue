<template>
    <button role="switch" v-bind="$attrs" type="button" class="toggle-button" :aria-pressed="modelValue" @click="toggle">
      <template v-if="labels">
        <span v-if="modelValue">
          <slot name="checked">
            {{labelChecked}}
          </slot>
        </span>
        <span v-else>
          <slot>
            {{labelUnChecked}}
          </slot>
        </span>
      </template>
    </button>
</template>

<script>
import {computed} from 'vue'
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    labels: {
      type: [Boolean, Object],
      default: false,
      validator(value) {
        return typeof value === 'object'
          ? value.checked || value.unchecked
          : typeof value === 'boolean'
      }
    },
    activeColor: {
      type: String,
      default: '#36a829'
    },
    inActiveColor: {
      type: String,
      default: '#bfcbd9'
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '24px'
    },
    margin: {
      type: String,
      default: '3px'
    }
  },
  setup(props, {emit}) {
    const toggle = () => emit('update:modelValue', !props.modelValue)
    const labelChecked = computed(() => {
      return typeof props.labels === 'object' && Object.prototype.hasOwnProperty.call(props.labels, 'checked') ? props.labels.checked : 'on'
    })
    const labelUnChecked = computed(() => {
      return typeof props.labels === 'object' && Object.prototype.hasOwnProperty.call(props.labels, 'unchecked') ? props.labels.unchecked : 'off'
    })
    return {toggle, labelChecked, labelUnChecked}
  }
}
</script>

<style vars="{activeColor, inActiveColor, width, height, margin}">
.toggle-button {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  transition: background .3s;
  user-select: none;
  width: var(--width);
  height: var(--height);
  border-radius: 999px;
}

.toggle-button:hover,
.toggle-button:focus {
  box-shadow: 0 0 0.5rem var(--inActiveColor);
  outline: none;
}

.toggle-button[aria-pressed=true]:hover,
.toggle-button[aria-pressed=true]:focus {
  box-shadow: 0 0 0.5rem var(--activeColor);
}

.toggle-button span {
  position: absolute;
  top: 0;
  font-weight: 600;
  color: #fff;
  pointer-events: none;
  line-height: var(--height);
  height: var(--height);
  font-size: 10px;
}

.toggle-button[aria-pressed=false] span {
  right: 10px;
}

.toggle-button[aria-pressed=true] span {
  left: 10px;
}

.toggle-button[aria-pressed=true] {
  background: var(--activeColor);
}

.toggle-button[aria-pressed=false] {
  background: var(--inActiveColor);
}

.toggle-button::before {
  content: "";
  position: absolute;
  display: block;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 20;
  transform: translate(var(--margin), var(--margin));
  transition: transform .3s;
  border-radius: 100%;
  background-color: #fff;
  width: calc(var(--height) - (2 * var(--margin)));
  height: calc(var(--height) - (2 * var(--margin)));
}

.toggle-button[aria-pressed=true]::before {
  transform: translate(calc(var(--width) - var(--height) + var(--margin)), var(--margin));
}

/* Reduced motion */
@media screen and (prefers-reduced-motion: reduce) {
  .toggle-button,
  .toggle-button::before {
    transition: none;
  }
}

*[dir="rtl"] .toggle-button::before {
  right: 0;
  transform: translate(calc(-1 * var(--margin)), var(--margin));
}

*[dir="rtl"] .toggle-button[aria-pressed=true]::before {
  transform: translate(calc(-1 * (var(--width) - var(--height) + var(--margin))), var(--margin));
}

*[dir="rtl"] .toggle-button[aria-pressed=false] span {
  left: 10px;
  right: auto;
}

*[dir="rtl"] .toggle-button[aria-pressed=true] span {
  right: 10px;
  left: auto;
}

</style>