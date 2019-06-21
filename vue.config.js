module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: `
					@import "@/assets/scss/variables.scss";
				`
			}
		}
	},
	assetsDir: undefined,
	lintOnSave: undefined,
	publicPath: '/',
	outputDir: 'dist',
	runtimeCompiler: undefined,
	productionSourceMap: true,
	parallel: undefined,
	devServer: {
		host: 'localhost'
	},
	transpileDependencies: ['vuex']
}
