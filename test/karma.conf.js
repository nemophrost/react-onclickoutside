module.exports = function(config) {
  config.set({

    files: [
      'test.js'
    ],

    frameworks: ['mocha', 'chai'],

    preprocessors: {
      'test.js': ['webpack']
    },

    reporters: ['spec'],

    webpackMiddleware: {
      noInfo: true
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['es2015', 'stage-0']
            }
          }
        ]
      }
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],

    browsers: ['PhantomJS']

  });
};
