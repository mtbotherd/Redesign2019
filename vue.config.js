module.exports = {
	assetsDir: undefined,

	css: {
		sourceMap: true,
		loaderOptions: {
			sass: {
				data: `@import "@/assets/scss/app.scss";`
			}
		}
	},

	lintOnSave: undefined,
	publicPath: undefined,
	outputDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined
}
