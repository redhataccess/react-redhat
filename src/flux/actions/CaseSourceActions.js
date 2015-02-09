var Marty           = require('marty');
var CaseConstants   = require('../constants/CaseConstants');


var Actions = Marty.createActionCreators({
    receiveCase: CaseConstants['RECEIVE_CASE'](function (c) {
    	this.dispatch(c);
    })
});
module.exports = Actions;
