<template lang="pug">
  div(v-click-outside="close")
    input(
      type="text"
      v-model="search"
      @keydown.down="arrowDown"
      @keydown.up="arrowUp"
      @keydown.enter="enter"
      @click="isActive=true")
    ul(v-show="isActive" class="list")
      li(v-for="(item, index) in filteredSearch"
        :key="index"
        :class="{'is-active': index===arrowCounter}"
        @click="choose(item)"
        )
        | {{item}}
</template>

<script>

export default {
  directives: {
    ClickOutside: {
      bind (el, binding) {
        el.__ClickOutsideHandler__ = event => {
          // check if event's target is the el or contained by el
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.__ClickOutsideHandler__)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.__ClickOutsideHandler__)
      }
    }
  },
  name: 'BaseAutocomplete',
  data: () => ({
    items: ['vue2', 'vue', 'vue3'],
    search: '',
    isActive: false,
    arrowCounter: -1
  }),
  computed: {
    filteredSearch () {
      if(!this.search) return this.items
      return this.items.filter(item => item.includes(this.search))
    }
  },
  methods: {
    close () {
      this.isActive=false
      this.arrowCounter = -1
    },
    choose (item){
      this.search = item
      this.isActive = false
      this.arrowCounter = -1
    },
    arrowUp () {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    arrowDown () {
      if (this.arrowCounter < this.items.length-1) {
        this.arrowCounter = this.arrowCounter + 1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  z-index: 1;
}
ul {
  list-style-type: none;
  & li {
    border: 1px solid gray;
    &.is-active {
      background-color: gray;
    }
    &:hover {
      background-color: gray;
    }
  }
}
</style>