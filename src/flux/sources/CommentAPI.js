var Marty                   = require('marty');
var _                       = require('lodash');
var Q                       = require('q');
Q.longStackSupport 			= true
var CommentSourceActions    = require('../actions/CommentSourceActions');
var AppConstants    		= require('../constants/AppConstants');
var UdsMixin                = require('../../utils/UdsMixin');

var API = Marty.createStateSource({
    type: 'http',
    getComments: function (caseNumber) {
        var comments;
        var deferred = Q.defer();
        if(caseNumber) {
            return Q($.get(UdsMixin._calculatePrefix() + "/case/" + caseNumber + "/comments")).then(function (result) {
                return CommentSourceActions.receiveComments(caseNumber, result);
            });
        }
    }
});
    


module.exports = API;