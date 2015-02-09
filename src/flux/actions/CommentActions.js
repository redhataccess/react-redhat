var Marty           	= require('marty');
var CommentConstants   	= require('../constants/CommentConstants');

var Actions = Marty.createActionCreators({
    invalidateComments: CommentConstants['INVALIDATE_COMMENTS'](function (caseNumber) {
    	this.dispatch(caseNumber);
    }),
});
module.exports = Actions;
