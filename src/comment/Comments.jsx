var React           = require('react/addons');
var moment          = require('moment');
var cx              = React.addons.classSet;
var _               = require('lodash');
var Comment         = require('./Comment');
var SlaAttainment   = require('./SlaAttainment');
var Alert           = require('react-bootstrap/Alert');
var State           = require('react-router/dist/react-router').State;
var CommentActions  = require('../flux/actions/CommentActions');
var CommentStore    = require('../flux/stores/CommentStore');
var Marty           = require('marty');
var AppConstants	= require('../flux/constants/AppConstants');
var Well            = require('react-bootstrap/Well');
var Button          = require('react-bootstrap/Button');

var CommentStateMixin = Marty.createStateMixin({
    mixins: [State],
    listenTo: CommentStore,
    getState: function () {
        return {
            comments: CommentStore.getComments(this.props.caseNumber)
        }
    }
});

var Component = React.createClass({
    displayName: 'Comments',
    mixins: [CommentStateMixin],

    getInitialState: function() {
        var displayedResourcesLocal = [];
        displayedResourcesLocal.push('privateComments');
        displayedResourcesLocal.push('publicCommentsPosSbt');
        displayedResourcesLocal.push('publicCommentsNegSbt');
        displayedResourcesLocal.push('caseReviews');
        displayedResourcesLocal.push('remoteSessions');
        displayedResourcesLocal.push('liveChatTranscripts');
        return {
            displayedResources:displayedResourcesLocal,
            showAll:false
        };
    },
    
    isFilterChecked:function(name){
        if(_.contains(this.state.displayedResources,name))
        {
            return true;
        }
        else
        {
            return false;
        }
    },

    buildCommentFilters: function(checkboxMapping) {
        return _.map(checkboxMapping,(m)=><label class="checkbox-inline">&nbsp;&nbsp;<input type="checkbox" id={m.name} name={m.name} onChange={this.handleFilterComments(m.name)} checked={this.isFilterChecked(m.name)}>&nbsp;{m.value} {m.display}</input> </label>);
    },
    showAllComments:function(){
        this.setState({'showAll':true});
    },

    handleFilterComments:function(name){
        return function(e) {
            var newDisplayedResources = [];
            if (_.contains(this.state.displayedResources, name)) {
                for(var i=0;i<this.state.displayedResources.length;i++)
                {
                    if(name==this.state.displayedResources[i])
                    {

                    }
                    else
                    {
                        newDisplayedResources=newDisplayedResources.concat(this.state.displayedResources[i]);
                    }
                }
            }
            else {
                newDisplayedResources = this.state.displayedResources.concat(name);
            }
            this.setState({'displayedResources':newDisplayedResources});
        }.bind(this);
    } ,

    genCommentElements: function(comments,showAll) {
               
        if (comments && comments.length > 0) {
            if(!showAll) {
                if (_.isNumber(this.props.limit)) {
                    comments = comments.slice(0, this.props.limit);
                }
            }
            return _.map(comments, (c) => <Comment id={c['externalModelId']} key={c['externalModelId']} comment={c}></Comment>);
        }
        return null;
    },
    componentWillUnmount: function() {
        if (this.state.comments.done) {
            CommentActions.invalidateComments(this.props.caseNumber);
        } else {
            console.warn("Comments promise not done, could not invalidate local cache.");
        }
    },
    renderComments: function () {
        var self = this;
        return this.state.comments.when({
            pending: function () {
                return <i className='fa fa-spinner fa-spin'></i>;
            },
            failed: function (err) {
                console.error(err.stack || err);
                return <Alert bsStyle="danger">Failed to load comments: {err.stack || err}</Alert>;
            },
            done: function (comments) {
                if (comments == null || comments.length==0) {
                    return <Alert bsStyle='warning' key='alert'>No case comments found for this case</Alert>
                }
                var negativeSla = _.filter(comments, (comment) => comment.resource["public"] && (comment.resource.sbt != null) && comment.resource.sbt < 0).length;
                var allSla = _.filter(comments, (comment) => (comment.resource.sbt != null) && comment.resource["public"]).length;
                var privateComments = _.filter(_.values(comments), (comment) => {
                    return !comment.resource["public"];
                });

                var posSbtPublicComments = _.filter(_.values(comments), (comment) => {
                    return comment.resource["public"] && ((comment.resource.sbt >0) || comment.resource.sbt ===undefined);
                });

                var negSbtPublicComments = _.filter(_.values(comments), (comment) => {
                    return comment.resource["public"] && (comment.resource.sbt <0 );
                });

                var comment_components = [];
                if(_.contains(self.state.displayedResources, 'publicCommentsNegSbt'))
                    comment_components = comment_components.concat(negSbtPublicComments)
                if(_.contains(self.state.displayedResources, 'privateComments'))
                    comment_components = comment_components.concat(privateComments)
                if(_.contains(self.state.displayedResources, 'publicCommentsPosSbt'))
                    comment_components = comment_components.concat(posSbtPublicComments)
                if(_.contains(self.state.displayedResources, 'caseReviews') && (self.props.caseReviews))
                    comment_components = comment_components.concat(self.props.caseReviews)
                if(_.contains(self.state.displayedResources, 'remoteSessions') && (self.props.remoteSessions))
                    comment_components = comment_components.concat(self.props.remoteSessions)
                if(_.contains(self.state.displayedResources, 'liveChatTranscripts') && (self.props.liveChatTranscripts))
                    comment_components = comment_components.concat(self.props.liveChatTranscripts)

                var checkboxMapping = [];
                checkboxMapping.push({name:'privateComments',value:privateComments?privateComments.length:0,display:' Private Comments '});
                checkboxMapping.push({name:'publicCommentsPosSbt',value:posSbtPublicComments?posSbtPublicComments.length:0,display:' +SBT Public Comments '});
                checkboxMapping.push({name:'publicCommentsNegSbt',value:negSbtPublicComments?negSbtPublicComments.length:0,display:' -SBT Public Comments '});
                checkboxMapping.push({name:'caseReviews',value:self.props.caseReviews?self.props.caseReviews.length:0,display:' Case Reviews '});
                checkboxMapping.push({name:'remoteSessions',value:self.props.remoteSessions?self.props.remoteSessions.length:0,display:' Remote Sessions '});
                checkboxMapping.push({name:'liveChatTranscripts',value:self.props.liveChatTranscripts?self.props.liveChatTranscripts.length:0,display:' Live Chat Transcript(s) '});
                comment_components.sort(function(a, b){
                    return +moment(b.resource.created) - +moment(a.resource.created);
                });

                
                if((self.state.showAll) || (comment_components.length<self.props.limit))
                {
                    return (
                        <div>
                            <SlaAttainment negative={negativeSla} all={allSla}></SlaAttainment>
                            <div className="form-group">
                            {self.buildCommentFilters(checkboxMapping)}
                            </div>
                            <div
                                className='commentsContainer'
                                key='commentsContainer'
                                ref='commentsContainer'>
			                {self.genCommentElements(comment_components,self.state.showAll)}
                            </div>
                        </div>
                    )
                }
                else {

                    return (
                        <div>
                            <SlaAttainment negative={negativeSla} all={allSla}></SlaAttainment>
                            <div className="form-group">
                            {self.buildCommentFilters(checkboxMapping)}
                            </div>
                            <div
                                className='commentsContainer'
                                key='commentsContainer'
                                ref='commentsContainer'>
			                {self.genCommentElements(comment_components,self.state.showAll)}
                            </div>
                            <Well key='comments'>
                                <Button bsSize="large" onClick={self.showAllComments} bsStyle='default' bsStyle="primary" block>
                                    Show All Comments({comment_components.length})
                                </Button>
                            </Well>
                            
                                
                        </div>
                    )
                }
            }
        });
    },
    render: function() {
        return this.renderComments();
    }
});

module.exports = Component;