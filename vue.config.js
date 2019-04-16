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
	publicPath: undefined,
	outputDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined
}
