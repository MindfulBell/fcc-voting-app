const path = require('path'),
		webpack = require('webpack'),
		BUILD_DIR = path.resolve(__dirname, 'client/public'),
		APP_DIR = path.resolve(__dirname, 'client/public/src/app');


const config = {
	entry: APP_DIR + '/index.js', 
	output: { 
	     path: BUILD_DIR, 
	     filename: 'bundle.js' 
	},
	module: {
		loaders : [
			{
				test: /\.js/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: 
					{
						presets: ['react', 'es2015', 'react-hmre']
					}
			},
			{ 
				test: /\.scss$/, 
				loaders: ["style", "css", "sass"]
			}
		]
	},
	devServer: {
		contentBase: path.join('./client/public'),
		hot: true,
		inline: true,
		progress: true,
		stats: {
			colors: true
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

module.exports = config;
