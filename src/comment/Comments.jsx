var React           = require('react/addons');
var moment          = require('moment');
var cx              = React.addons.classSet;
var _               = require('lodash');
var moment          = require('moment');
var Comment         = require('./Comment');
//var Input                 = require('react-bootstrap/Input');
var SlaAttainment   = require('./SlaAttainment');
var UdsMixin        = require('../utils/UdsMixin');

var Component = React.createClass({
    displayName: 'Comments',
    mixins: [UdsMixin],

    getInitialState: function() {
        var displayedResourcesLocal = [];
        displayedResourcesLocal.push('privateComments');
        displayedResourcesLocal.push('publicCommentsPosSbt');
        displayedResourcesLocal.push('publicCommentsNegSbt');
        displayedResourcesLocal.push('caseReviews');
        displayedResourcesLocal.push('remoteSessions');
        displayedResourcesLocal.push('liveChatTranscripts');

        
        return {
            'loading': false,
            'comments': [],
            displayedResources:displayedResourcesLocal
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
            if(e.target.checked)
            {
                
                
            }
            this.setState({'displayedResources':newDisplayedResources});

            
        }.bind(this);
    } ,
    
    genCommentElements: function(comment_data) {
        var comments = [];
        if (comment_data && _.keys(comment_data).length > 0) {
            if (_.isNumber(this.props.limit)) {
                comments = comment_data.slice(0, this.props.limit);
            }
            comments = comment_data;
            return _.map(comments, (c) => <Comment id={c['externalModelId']} key={c['externalModelId']} comment={c}></Comment>);
        }
        return null;
    },
    queryComments: function(props) {
        var self = this;
        this.setState({'loading': true});
        var opts = {
            caseNumber: `${props.caseNumber}`
        };
        this.getComments(opts)
            .then((comments) => {
                var i=1;
                 comments.sort((a, b) => +moment(b.resource.lastModified) - +moment(a.resource.lastModified));


                var sorted_comments = _.map(_.sortBy((comments), function(resource) {
                    return parseInt(moment(resource.resource.lastModified).format('X'));
                }), function(comment) {
                    comment.resource.commentNumber = i;
                    i += 1;
                    return comment;
                });
                                   

                
                self.setState({
                    // 'comments': _.zipObject(_.map(comments, (c) => [c['externalModelId'], c] )),
                    'comments': sorted_comments,
                    'loading': false
                })
            })
            .catch((err) => console.error(`Could not load comments: ${err.stack}`))
            .done(() => self.setState({'loading': false}));

    },
    componentDidMount: function() {
        this.queryComments(this.props);
    },

    render: function() {
        if (this.state.loading === true) {
            return <i className='fa fa-spinner fa-spin'></i>;
        }
        if (this.state.comments == null || this.state.comments.length==0) {
            return null;
        }
        var negativeSla = _.filter(this.state.comments, (comment) => {
            return comment.resource["public"] && (comment.resource.sbt != null) && comment.resource.sbt < 0;
        }).length;
        var allSla = _.filter(this.state.comments, function(comment) {
            return (comment.resource.sbt != null) && comment.resource["public"];
        }).length;

        var privateComments = _.filter(_.values(this.state.comments), (comment) => {
            return !comment.resource["public"];
        });
        if(!privateComments || privateComments.length==0)
        {
            privateComments=0;
        }

        var posSbtPublicComments = _.filter(_.values(this.state.comments), (comment) => {
            return comment.resource["public"] && ((comment.resource.sbt >0) || comment.resource.sbt ===undefined);
        });

        var negSbtPublicComments = _.filter(_.values(this.state.comments), (comment) => {
            return comment.resource["public"] && (comment.resource.sbt <0 );
        });

        var comment_components = [];
        if(_.contains(this.state.displayedResources, 'publicCommentsNegSbt'))
            comment_components = comment_components.concat(negSbtPublicComments)
        if(_.contains(this.state.displayedResources, 'privateComments'))
            comment_components = comment_components.concat(privateComments)
        if(_.contains(this.state.displayedResources, 'publicCommentsPosSbt'))
            comment_components = comment_components.concat(posSbtPublicComments)
       if(_.contains(this.state.displayedResources, 'caseReviews') && (this.props.case.resource.caseReviews))
            comment_components = comment_components.concat(this.props.case.resource.caseReviews)
       if(_.contains(this.state.displayedResources, 'remoteSessions') && (this.props.case.resource.remoteSessions))
            comment_components = comment_components.concat(this.props.case.resource.remoteSessions)
       if(_.contains(this.state.displayedResources, 'liveChatTranscripts') && (this.props.case.resource.liveChatTranscripts))
            comment_components = comment_components.concat(this.props.case.resource.liveChatTranscripts)

        var checkboxMapping = [];
        checkboxMapping.push({name:'privateComments',value:privateComments?privateComments.length:0,display:' Private Comments '});
        checkboxMapping.push({name:'publicCommentsPosSbt',value:posSbtPublicComments?posSbtPublicComments.length:0,display:' +SBT Public Comments '});
        checkboxMapping.push({name:'publicCommentsNegSbt',value:negSbtPublicComments?negSbtPublicComments.length:0,display:' -SBT Public Comments '});
        checkboxMapping.push({name:'caseReviews',value:this.props.case.resource.caseReviews?this.props.case.resource.caseReviews.length:0,display:' Case Reviews '});
        checkboxMapping.push({name:'remoteSessions',value:this.props.case.resource.remoteSessions?this.props.case.resource.remoteSessions.length:0,display:' Remote Sessions '});
        checkboxMapping.push({name:'liveChatTranscripts',value:this.props.case.resource.liveChatTranscripts?this.props.case.resource.liveChatTranscripts.length:0,display:' Live Chat Transcript(s) '});

        return (
            <div>
                <SlaAttainment negative={negativeSla} all={allSla}></SlaAttainment>
                <div class="form-group">
                    {this.buildCommentFilters(checkboxMapping)}
                 </div>
                <div
                    id={this.props.id}
                    className='commentsContainer'
                    key='commentsContainer'
                    ref='commentsContainer'>
                 {this.genCommentElements(comment_components)}
                </div>
            </div>
        )
    }
});

module.exports = Component;
