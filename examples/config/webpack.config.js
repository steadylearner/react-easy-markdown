const webpack = require("webpack");

// HtmlWebPackPlugin -> Generate default index.html, but its better to make your own index.html version to include cdn etc
const HtmlWebPackPlugin = require("html-webpack-plugin"); // https://github.com/jantimon/html-webpack-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CSPWebpackPlugin = require("csp-webpack-plugin"); // allow you use CDN when there is security problem
const autoprefixer = require("autoprefixer");
// You can use class instead of className using setting above

const DynamicCdnWebpackPlugin = require("dynamic-cdn-webpack-plugin"); // move dependencies to html

// Plugins to use react-easy-md with webpack when the problem is from 'jsdom' package used inside it 
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin'); // To suppres warning from using react-easy-md
const TerserPlugin = require('terser-webpack-plugin'); // Use it instead of uglify(It take more time but it works) https://stackoverflow.com/questions/47439067/uglifyjs-throws-unexpected-token-keyword-const-with-node-modules

// to include directory path easily
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, '..', dir)
};

// What is important here is not to include eslint-loader in production
const eslintUse = process.env.NODE_ENV === "development" ? ["babel-loader", "eslint-loader"] : ["babel-loader"];

module.exports = () => {

	return ({
		module: {

			// https://webpack.js.org/configuration/module/#condition exclude unecessary files
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					use: eslintUse,
				},
				{ // to remove source map error from 3rd libraires such as rxjs from the console.
					test: /\.(js|jsx)$/,
					use: ["source-map-loader"],
					enforce: "pre",
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: "html-loader",
							options: { minimize: true },
						},
					],
				},
				{
					test: /\.(scss|css)$/,
					use: [
						MiniCssExtractPlugin.loader, // This plugin should be used only on production builds without style-loader
						{
							loader: "css-loader",
						},
						{
							loader: "postcss-loader",
							options: {
								autoprefixer: {
									browsers: ["last 2 versions"],
								},
								plugins: () => [
									autoprefixer,
								],
							},
						},
						{
							loader: "sass-loader",
							options: {},
						},
					],

					// This webpack configuration works with CSS, Sass, CSS Module, React Specific(Inline Style and styled components)
				},

				{
					test: /\.(png|jp(e*)g|svg)$/,
					use: [{
						loader: "url-loader", // url-loader is used to for images, fonts etc
						options: {
							limit: 50000, // Convert images less than 50kb
							// limit: 8000, // Convert images less than 8kb
							name: "images/[hash]-[name].[ext]",
						},
					}],
				},
			],
		},
		// It is important to include it to use react-easy-md without errors when you develope project
		node: {
			fs: "empty",
			tls: "empty",
			net: "empty",
			child_process: "empty",
		},

		// historyApiFallback to handle browser unsync problem with webpack and react router
		// proxy to handle api CORS problem(https://webpack.js.org/configuration/dev-server/#devserver-proxy)

		devServer: {
			historyApiFallback: true,
			proxy: {
				"/api": "http://localhost:8000",
				"/static": "http://localhost:8000",
			},
		},

		optimization: {
			minimizer: [
                                // It is important to include it to use react-easy-md without errors when you deploy project
				new TerserPlugin({
					// chunkFilter: (chunk) => {
					// 	// Exclude uglification for the `vendor` chunk
					// 	if (chunk.name === 'vendor') {
					// 		return false;
					// 	}

					// 	return true;
					// },
				}),
			],

			splitChunks: { // https://medium.com/reactbrasil/code-splitting-e-lazy-loading-em-react-b1ce9870289f
				cacheGroups: { // separate vendors
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					}
				}
			}
		},

		// https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html

		resolve: { // https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
			alias: {
				"react-dom": "react-dom/profiling",
				"scheduler/tracing": "scheduler/tracing-profiling",
			}
		},

		plugins: [
			new webpack.ProgressPlugin(),
			new webpack.optimize.AggressiveMergingPlugin(),
			new HtmlWebPackPlugin({ // https://github.com/jantimon/html-webpack-plugin
				template: "./src/index.html",
				filename: "./index.html",
			}),
			new CSPWebpackPlugin({
				"object-src": "\"none\"",
				"base-uri": "\"self\"",
				"script-src": [
					"\"unsafe-inline\"",
					"\"self\"",
					"\"unsafe-eval\"",
					"https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js",
					"https://apis.google.com/",
				],
				"worker-src": ["\"self\"", "blob:"],
			}),
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			new CleanWebpackPlugin(["public"]), // It inscreases process speed so much.

			new DynamicCdnWebpackPlugin({ // for unexpected results
				exclude: ["rxjs"], // include package name here that shows errors
			}),

			// To remove waring from using react-easy-md when you develope
			new FilterWarningsPlugin({
				exclude: /Critical dependency: the request of a dependency is an expression/,
			}),
		],
	});
};


