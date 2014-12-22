module.exports = function(config) {
  config.set({

    basePath: '',

    plugins: ['karma-jquery'],

    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'jquery-2.0.1'
    ],

    files: [
      'test/vendor/es5-shim.js',
      'test_bundle.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    captureTimeout: 60000,

    singleRun: true
  });
};
