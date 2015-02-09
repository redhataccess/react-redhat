moment    = require('moment');
_         = require('lodash');
Uri       = require('jsuri');
Q         = require('q/q');
Q.longStackSupport = true;

Mixin = {
  get: function(opts) {
    var callConfig, metricsConfig, uri;
    metricsConfig = {
      data: {},
      xhrFields: {
        withCredentials: true
      },
      timeout: 60000,
      cache: true
    };
    uri = new Uri();
    uri.setPath("" + window.redHatUrlPrefix + opts.path);
    _.each(opts['queryParams'], function(queryParam) {
      return uri.addQueryParam(queryParam['name'], queryParam['value']);
    });
    callConfig = _.defaults(_.clone(metricsConfig), {
      url: uri.toString()
    });
    return Q($.ajax(callConfig));
  },
  post: function(opts) {
    var callConfig, metricsConfig, uri;
    metricsConfig = {
      data: {},
      xhrFields: {
        withCredentials: true
      },
      timeout: 60000,
      cache: true,
      type: 'POST'
    };
    uri = new Uri();
    uri.setPath("" + window.redHatUrlPrefix + opts.path);
    _.each(opts['queryParams'], function(queryParam) {
      return uri.addQueryParam(queryParam['name'], queryParam['value']);
    });
    callConfig = _.defaults(_.clone(metricsConfig), {
      url: uri.toString()
    });
    return Q($.ajax(callConfig));
  }
};

module.exports = Mixin;