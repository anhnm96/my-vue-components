<script>
export default {
  computed: {
    panels() {
      return this.$children
        .filter(x => x.$options.name === `TransitionExpand`)
    }
  },
  methods: {
    setAll (value) {
      for (let panel of this.panels) {
        panel.$expand = value
      }
    },
    toggleAll () {
      if (this.panels.some(panel => panel.$expand === true)) this.setAll(false)
      else this.setAll(true)
    }
  },
  render() {
    return this.$scopedSlots.default({
      // Methods
      setAll: this.setAll,
      toggleAll: this.toggleAll
    });
  },
}
</script>

<style scoped>
.expanded {
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>