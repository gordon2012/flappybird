var HtmlWebPackPlugin = require('html-webpack-plugin');
var HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /pixi.js/, loader: "script" },
			{ test: /phaser.js/, loader: "script" },
			{ test: /\.png$/, loader: "file?name=[path][name].[ext]&context=./assets" }
		]
	},
	plugins: [HtmlWebPackPluginConfig]
};
