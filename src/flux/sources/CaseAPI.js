var Marty                   = require('marty');
var _                       = require('lodash');
var Q                       = require('q');
Q.longStackSupport 			= true
var CaseSourceActions       = require('../actions/CaseSourceActions');
var AppConstants    		= require('../constants/AppConstants');
var UdsMixin                = require('../../utils/UdsMixin');

var API = Marty.createStateSource({
    type: 'http',
    getCase: function (caseNumber) {
        return Q($.ajax(UdsMixin._calculatePrefix()+'/case/'+caseNumber).then(function (result) {
            return CaseSourceActions.receiveCase(result);
        }));
    }
});

module.exports = API;