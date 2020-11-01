<template>
  <div class="autocomplete__container">
    <button v-show="isActive" @click="close" class="btn-close"></button>
    <input
      type="text"
      v-model="search"
      @keydown.down="arrowDown"
      @keydown.up="arrowUp"
      @keydown.enter="enter"
      @click="isActive = true"
    />
    <ul v-show="isActive" class="list">
      <li
        v-for="(item, index) in filteredSearch"
        :key="index"
        :class="{ 'is-active': index === arrowCounter }"
        @click="choose(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'VAutocomplete',
  props: {
    value: [String, Number],
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
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
.autocomplete__container {
  position: relative;

  & .btn-close {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    cursor: auto;
  }

  & input {
    border: 1px solid gray;
    width: 100%;
  }
}

.list {
  z-index: 1;
  position: absolute;
}

ul {
  list-style-type: none;
  width: 100%;
  & li {
    border: 1px solid gray;
    cursor: pointer;

    &.is-active {
      background-color: red;
    }
    &:hover {
      background-color: gray;
    }
  }
}
</style>