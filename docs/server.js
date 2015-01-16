'use strict';

var express = require('express');
var request = require('request');
var Uri     = require('jsuri');
var _       = require('lodash');

var development = process.env.NODE_ENV !== 'production';
var app = express();

var UDS_URL = "http://unified-ds.gsslab.rdu2.redhat.com:9100";

if (development) {
  var path = require('path');
  var url = require('url');
  var browserify = require('connect-browserify');
  var nodejsx = require('node-jsx').install();
  var Root = require('./src/Root');

  console.log("Running development");

  app = app
    .get('/assets/bundle.js', browserify('./client', {debug: true, watch: false}))
    .use('/assets', express.static(path.join(__dirname, 'assets')))
    .use('/vendor', express.static(path.join(__dirname, 'vendor')))
    .use(function renderApp(req, res) {
        var fileName = url.parse(req.url).pathname;
        var uri;

        if (fileName == "/user/metadata/sbrs") {
            uri = new Uri(UDS_URL);
            uri.setPath("/user/metadata/sbrs");
            _.each(req.query, function (value, key){
                uri.addQueryParam(key,  unescape(value));
            });
            console.log("Proxying to: " +  uri.toString());
            return req.pipe(request(uri.toString())).pipe(res);
        } else if (fileName == "/user/metadata/tags") {
            uri = new Uri(UDS_URL);
            uri.setPath("/user/metadata/tags");
            _.each(req.query, function (value, key){
                uri.addQueryParam(key, unescape(value));
            });
            console.log("Proxying to: " +  uri.toString());
            return req.pipe(request(uri.toString())).pipe(res);
        } else if (fileName == "/user") {
            uri = new Uri(UDS_URL);
            uri.setPath("/user");
            _.each(req.query, function (value, key){
                uri.addQueryParam(key, unescape(value));
            });
            console.log("Proxying to: " +  uri.toString());
            return req.pipe(request(uri.toString())).pipe(res);
        } else if (fileName.indexOf("/user/") != -1) {
            uri = new Uri(UDS_URL);
            uri.setPath(fileName);
            _.each(req.query, function (value, key){
                uri.addQueryParam(key, unescape(value));
            });
            console.log("Proxying to: " +  uri.toString());
            return req.pipe(request(uri.toString())).pipe(res);
        } else {
            var RootHTML = Root.renderToString({initialPath: fileName});
            res.send(RootHTML);
        }

    });
} else {
  app = app
    .use(express.static(__dirname));
}

// UDS related proxying
app.get("/case/:caseNumber/comments", function(req, res) {
  return req.pipe(request("" + UDS_URL + "/case/" + req.params.caseNumber + "/comments")).pipe(res);
});

app.get("/case/:caseNumber", function(req, res) {
  return req.pipe(request("" + UDS_URL + "/case/" + req.params.caseNumber)).pipe(res);
});

//app.get("/user/:input", function(req, res) {
//  return req.pipe(request("" + UDS_URL + "/user/" + req.params.input)).pipe(res);
//});


app
  .listen(4000, function () {
    console.log('Server started at http://localhost:4000');
  });