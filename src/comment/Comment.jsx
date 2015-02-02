var React       = require('react/addons');
var cx          = React.addons.classSet;

var Timestamp   = require('./Timestamp');
var User        = require('../user/User');
var Badge       = require('react-bootstrap/Badge');
var CommentType = require('./CommentType');
var SBT         = require('./SBT');

var Component = React.createClass({
    displayName: 'Comment',
    genCommentClasses: function(c) {
        var classSet;
        classSet = {
            'comment': true,
            'private': c["public"] === false,
            'public': c["public"] === true
        };
        return cx(classSet);
    },
    genPanelBodyClasses: function(c) {
        var classSet;
        classSet = {
            'panel-body': true,
            'private': c["public"] === false,
            'public': c["public"] === true
        };
        return cx(classSet);
    },
    genPreClasses: function(c) {
        var classSet;
        classSet = {
            'private': c["public"] === false,
            'public': c["public"] === true,
            'paneled': true
        };
        return cx(classSet);
    },
    render: function() {
        var comment, commentResource, header, timestamp,badge,commentType,sbt;
        commentResource = this.props.comment;
        comment = commentResource.resource || null;
        badge=<Badge>{this.props.comment.resource.commentNumber}</Badge>;
        commentType=<CommentType></CommentType>;
        if(this.props.comment.resource.sbt) {
            sbt = <SBT sbt={this.props.comment.resource.sbt}></SBT>
        }
        else
        {
            sbt=null;
            
        }
        if (comment.created === comment.lastModified) {
            timestamp = <Timestamp text='created' timestamp={comment.created}></Timestamp>;
        } else {
            timestamp = (
                <span>
                    <Timestamp text='Created' timestamp={comment.created}></Timestamp>
                    &nbsp;
                    <Timestamp text='Last modified' timestamp={comment.lastModified}></Timestamp>
                </span>
            )
        }
        header = (
            <span>
                <div className='pull-left'>
                    <User resource={comment.createdBy}></User>
                </div>
                <div className='pull-right'>
                    <span>
                        &nbsp;
                {timestamp}
                        
                        </span>
                <span>
                    &nbsp;
                {sbt}
                </span>
                </div>
            </span>
        );
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'> {header}</h3>
                    <div className='clearfix'></div>
                </div>
                <div className={this.genPanelBodyClasses(comment)}>
                    <pre className={this.genPreClasses(comment)}>{comment.text}</pre>
                </div>
            </div>
        )
    }
});

module.exports = Component;
