const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    },
    hot: true,
    // overlay: true
  },
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
