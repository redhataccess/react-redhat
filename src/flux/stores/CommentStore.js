var Marty                   = require('marty');
var moment                  = require('moment');
var _                       = require('lodash');
var CommentConstants        = require('../constants/CommentConstants');
var CommentAPI              = require('../sources/CommentAPI');

var Store = Marty.createStore({
    name: 'Comment Store',
    handlers: {
        receiveComments: CommentConstants.RECEIVE_COMMENTS,
        invalidateComments: CommentConstants.INVALIDATE_COMMENTS
    },
    getInitialState: function () {
        return {};
    },
    getComments: function (caseNumber) {
        return this.fetch({
            id: _.padLeft(caseNumber, 8, '0'),
            locally: function () {
                return this.state[_.padLeft(caseNumber, 8, '0')];
            },
            remotely: function () {
                return CommentAPI.getComments(_.padLeft(caseNumber, 8, '0'));
            }
        });
    },
    receiveComments: function (cn, comments) {
        var caseNumber = _.padLeft(cn, 8, '0');
        var sorted_comments=[];
        var  i=0;
        if(comments != null) {
            comments.sort(function(a, b) {
                return +moment(b.resource.created) - +moment(a.resource.created);
            });
            comments = _.filter(comments, function(comment)  {
                return !comment.resource["draft"] ;
            });
            sorted_comments = comments;
            i = comments.length;
             sorted_comments = _.map(comments, function (comment) {
                     comment.resource.commentNumber = i;
                     i -= 1;
                     return comment;
            });
        }
        this.state[caseNumber] = sorted_comments;
        this.hasChanged();
    },
    invalidateComments: function (cn) {
        var caseNumber = _.padLeft(cn, 8, '0');
        delete this.state[caseNumber];
        this.hasChanged();
    }

});
module.exports = Store;