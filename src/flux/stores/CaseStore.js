var Marty                   = require('marty');
var _                       = require('lodash');
var CaseConstants           = require('../constants/CaseConstants');
var CaseAPI                 = require('../sources/CaseAPI');

var Store = Marty.createStore({
    name: 'Case Store',
    handlers: {
        receiveCase: CaseConstants.RECEIVE_CASE,
        invalidateCase: CaseConstants.INVALIDATE_CASE
    },
    getInitialState: function () {
        return {};
    },
    getCase: function (caseNumber) {
        return this.fetch({
            id: _.padLeft(caseNumber, 8, '0'),
            locally: function () {
                return this.state[_.padLeft(caseNumber, 8, '0')];
            },
            remotely: function () {
                return CaseAPI.getCase(_.padLeft(caseNumber, 8, '0'));
            }
        });
    },
    receiveCase: function (c) {
        var caseNumber = _.padLeft(c.resource.caseNumber, 8, '0');
        this.state[caseNumber] = c;
        this.hasChanged();
    },
    invalidateCase: function (cn) {
        var caseNumber = _.padLeft(cn, 8, '0');
        delete this.state[caseNumber];
        this.hasChanged();
    }

});
module.exports = Store;