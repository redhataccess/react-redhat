var React       = require('react/addons');
var cx          = React.addons.classSet;
var Timestamp   = require('./Timestamp');
var User        = require('../user/User');
var Badge       = require('react-bootstrap/Badge');
var CommentType = require('./CommentType');
var SBT         = require('./SBT');
var Autolinker      = require('autolinker');

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
        var commentNumber="";
       if(this.props.comment.resource.commentNumber)
       {
           commentNumber=this.props.comment.resource.commentNumber;
           
       }
        comment = commentResource.resource || null;
        commentType=<CommentType resource={this.props.comment.resource}></CommentType>;
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
        
        var commentText = (comment && comment.text && Autolinker.link(comment.text)) || "";
        
        header = (
            <div>
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
                    <span>
                         &nbsp;
                        {commentType}
                    </span>
                   
                    <span>
                    &nbsp;
                        <Badge>{commentNumber.toString()}</Badge>
                    </span>
                   
                </div>
            </div>
        );
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h3 className='panel-title'> {header}</h3>
                    <div className='clearfix'></div>
                </div>
                <div className={this.genPanelBodyClasses(comment)}>
                    <pre className={this.genPreClasses(comment)} dangerouslySetInnerHTML={{__html: commentText}} ></pre>
                </div>
            </div>
        )
    }
});

module.exports = Component;
