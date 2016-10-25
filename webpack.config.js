

const path = require('path'),
		webpack = require('webpack'),
		BUILD_DIR = path.resolve(process.cwd(), 'client/public'),
		APP_DIR = path.resolve(process.cwd(), 'client/public/src/app'),
		ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

const config = {
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	entry: APP_DIR + '/index.js', 
	output: { 
	     path: BUILD_DIR, 
	     filename: 'bundle.js',
	     publicPath: '/' 
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
				exclude: ['node_modules', 'app'],
				loader: isProduction ? 
					ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") :
					['style', 'css', 'sass']
			},
			{
				test: /\.(jpg|png)$/,
				loader: 'url?limit=25000'
			}
		]
	},
	devServer: !isProduction ? {
		historyApiFallback: true,
		contentBase: path.join('./client/public'),
		hot: true,
		inline: true,
		stats: {
			colors: true
		}
	} : null,
	plugins: !isProduction ? [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
		]	: [
		new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('./css/style.css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
				}
			})
		],
	resolve: {
		extensions: ['', '.js', '.jsx', '.scss']
	}
};

module.exports = config;
