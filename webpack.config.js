module.exports = {
	entry: './index.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader?presets[]=es2015&presets[]=react'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	}
}