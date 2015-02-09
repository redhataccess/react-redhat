var Marty           	= require('marty');
var CommentConstants   	= require('../constants/CommentConstants');

var Actions = Marty.createActionCreators({
    receiveComments: CommentConstants['RECEIVE_COMMENTS'](function (caseNumber, comments) {
    	this.dispatch(caseNumber, comments);
    })
});
module.exports = Actions;
