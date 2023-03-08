const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
	// devServer: {
	// 	historyApiFallback: true,
	// 	port: 3000,
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://localhost:8080',
	// 		},
	// 	},
	// 	hot: true,
	// 	// overlay: true
	// },
	devServer: {
		client: {
			overlay: {
				warnings: false,
				errors: true,
			},
		},
		hot: true,
		port: 3000,
		historyApiFallback: true, // url 이외의 url 경로로 접근했을때 404 responses를 받게 되는데 이때도 index.html을 서빙할지 결정하는 옵션
		allowedHosts: 'all', // 'auto' | 'all'
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
