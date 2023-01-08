const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/scss/_abstracts.scss";
          @import "~@/assets/scss/_vendors.scss";
          @import "~@/assets/scss/_common.scss";
          @import "~@/assets/scss/_components.scss";
        `,
      },
    },
  },
})
