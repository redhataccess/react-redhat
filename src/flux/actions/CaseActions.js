var Marty                   = require('marty');
var CaseConstants   		= require('../constants/CaseConstants');
var CaseAPI        			= require('../sources/CaseAPI');

var Actions = Marty.createActionCreators({
    invalidateCase: CaseConstants['INVALIDATE_CASE'](function (caseNumber) {
        this.dispatch(caseNumber);
    })
});
module.exports = Actions;
