module.exports = function (config) {
  config.set({

    basePath: '',

    plugins: [
      'karma-jquery',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-chrome-launcher'
    ],

    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'jquery-2.0.1'
    ],

    files: [
      'test_bundle.js'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false
  });
};
