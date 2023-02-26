const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	devServer: {
		historyApiFallback: true,
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
			},
		},
		hot: true,
		// overlay: true
	},

	transpileDependencies: true,

	configureWebpack: {
		devtool: 'source-map',
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src/'),
			},
			extensions: ['.vue', '.js'],
		},
	},

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

	pluginOptions: {
		vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
	},
})
