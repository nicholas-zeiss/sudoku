

const path = require('path');

module.exports = {
	entry: './app/app.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'app/')
	},
	module: {
		loaders: [{
	      test: /\.js$/,
	      loaders: ['babel-loader?presets[]=es2015'],
	      include: path.join(__dirname, 'app')
	  }]
	}
};

