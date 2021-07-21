// https://github.com/IndexXuan/vue-cli-plugin-vite
module.exports = {
  pluginOptions: {
    vite: {
      // other vite plugins list, will be merge into this plugin\'s underlying vite.config.ts
      plugins: [],
      /**
       * Vite UserConfig.optimizeDeps options
       * recommended set `include` for speedup page-loaded time
       * @default {}
       */
      optimizeDeps: {},
    },
  },
}
