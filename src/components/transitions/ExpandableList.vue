<script>
export default {
  name: 'ExpandableList',
  data() {
    return {
      panels: []
    }
  },
  methods: {
    setPanels(el) {
      this.panels.push(el)
    },
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
    return this.$slots.default({
      // Methods
      setAll: this.setAll,
      toggleAll: this.toggleAll,
      bind: {ref: this.setPanels}
    });
  }
}
</script>

<style scoped>
.expanded {
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>