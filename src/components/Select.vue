<template>
  <select :class="$options.name" :multiple="multiple" v-model="selected" @change="updateValue">
    <option disabled v-text="disabledOption" />
    <option
      v-for="option in adaptedOptions"
      :key="option.id"
      :value="option.id"
      v-text="option.label"
    />
  </select>
</template>

<script>
export default {
  name: 'FormSelect',
  model: {
    event: 'change'
  },
  props: {
    // The disabled option is necessary because
    // otherwise it isn't possible to select the
    // first item on iOS devices. This prop can
    // be used to configure the text for the
    // disabled option.
    disabledOption: {
      type: String,
      default: 'Select something',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Array, String, Number, Object],
      default: null,
    },
    // The option adapter is responsible for
    // transforming the values and options,
    // provided in a certain format, to valid
    // option objects. You can pass your own
    // `optionAdapter()` as property to make the
    // component work with your custom data
    // structure
    optionAdapter: {
      type: Function,
      default: value => ({
        id: value,
        label: value,
        value,
      }),
    },
  },
  data() {
    return {
      selected: Array.isArray(this.value)
        ? this.value.map(x => this.optionAdapter(x).id)
        : this.value && this.optionAdapter(this.value).id
    }
  },
  computed: {
    multiple() {
      return Array.isArray(this.value)
    },
    adaptedOptions() {
      return this.options.map(x => this.optionAdapter(x));
    },
  },
  methods: {
    updateValue() {
      const newValue = this.multiple
        ? this.selected.map(id => this.adaptedOptions.find(x => x.id === id).value)
        : this.adaptedOptions.find(x => x.id === this.selected).value;
      // Emitting a `change` event with the new
      // value of the `<select>` field, updates
      // all values bound with `v-model`.
      this.$emit('change', newValue);
    },
  },
};
</script>