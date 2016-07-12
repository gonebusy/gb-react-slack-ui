'use strict';

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var _globals = new webpack.ProvidePlugin({
	'$':'jquery',
	'jQuery':'jquery',
	'TweenLite': 'gsap-tween-lite',
	'Utils': __dirname +'/src/js/utils/utils'
});

module.exports = {  
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,

	resolve: {
		root: [path.join(__dirname, "node_modules")],
		alias: {
			"gsap-tween-lite": __dirname + "/src/js/vendor/gsap/uncompressed/TweenLite.js",
			"gsap-css-plugin":__dirname +  "/src/js/vendor/gsap/uncompressed/plugins/CSSPlugin.js",
			"gsap-ease-pack": __dirname + "/src/js/vendor/gsap/uncompressed/easing/EasePack.js",
			"gsap-draggable": __dirname + "/src/js/vendor/gsap/uncompressed/utils/Draggable.js",
			"gsap-throw-props": __dirname + "/src/js/vendor/gsap/uncompressed/plugins/ThrowPropsPlugin.js",
			"gsap-draw-svg-plugin": __dirname + "/src/js/vendor/gsap/uncompressed/plugins/DrawSVGPlugin.js",
			"gsap-scroll-to-plugin": __dirname + "/src/js/vendor/gsap/uncompressed/plugins/ScrollToPlugin.js",
			"gsap-split-text": __dirname + "/src/js/vendor/gsap/uncompressed/utils/SplitText.js",
			"doableUtils": __dirname + "/src/js/utils/utils.js",
			"waypoints": __dirname + "/node_modules/waypoints/lib/noframework.waypoints.js"
		},
		extensions: ['', '.js']
	},
	entry: {
		main:'./src/js/main'
	},
	
	output: {
		path: path.join(__dirname + "/public/js"),
		filename: "[name].min.js"
	},
	externals: {
		'TweenLite': 'TweenLite'
	},
	plugins: debug ? [_globals] : [
		_globals,
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
}