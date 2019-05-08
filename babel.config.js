module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['last 1 version', 'ie >= 10']
				}
			}
		]
	]
}
