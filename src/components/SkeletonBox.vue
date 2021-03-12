<template>
  <span aria-hidden="true" :style="{ height, width: computedWidth }" class="SkeletonBox" />
</template>

<script>
export default {
  name: `VSkeletonBox`,
  props: {
    maxWidth: {
      default: 100,
      type: Number,
    },
    minWidth: {
      default: 80,
      type: Number,
    },
    height: {
      default: `1em`,
      type: String,
    },
    width: {
      default: null,
      type: String,
    },
  },
  computed: {
    computedWidth() {
      return this.width || `${Math.floor((Math.random() * (this.maxWidth - this.minWidth)) + this.minWidth)}%`;
    },
  },
};
</script>

<style lang="scss">
.SkeletonBox {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  background: rgba(0,0,0,.15);
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.6),hsla(0,0%,100%,0));
    // duration 2s -> wait 0.5s
    animation: shimmer 2.5s ease-in-out infinite;
    content: "";
  }
  @keyframes shimmer {
    100% {
      transform: translateX(125%);
    }
  }
}
// <docs>
// [markus blog](https://markus.oberlehner.net/blog/skeleton-loading-animation-with-vue/)
// [adrianroselli blog](https://adrianroselli.com/2020/11/more-accessible-skeletons.html)
// </docs>
</style>
