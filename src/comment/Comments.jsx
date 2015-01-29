var React           = require('react/addons');
var moment          = require('moment');
var cx              = React.addons.classSet;
var _               = require('lodash');
var moment          = require('moment');
var Comment         = require('./Comment');
var SlaAttainment   = require('./SlaAttainment');
var UdsMixin        = require('../utils/UdsMixin');

var Component = React.createClass({
    displayName: 'Comments',
    mixins: [UdsMixin],

    getInitialState: function() {
        return {
            'loading': false,
            'comments': []
        };
    },
    genCommentElements: function() {
        var comments = [];
        if (this.state.comments && _.keys(this.state.comments).length > 0) {
            if (_.isNumber(this.props.limit)) {
                comments = this.state.comments.slice(0, this.props.limit);
            }
            comments = this.state.comments;
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
                comments.sort((a, b) => +moment(b.resource.lastModified) - +moment(a.resource.lastModified));
                self.setState({
                    // 'comments': _.zipObject(_.map(comments, (c) => [c['externalModelId'], c] )),
                    'comments': comments,
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
            return <i className='fa fa-spinner fa-spin'></i>
        }
        if (this.state.comments == null) {
            return <Alert bsStyle='warning' key='alert'>No case comments found for this case</Alert>
        }
        var negativeSla = _.filter(this.state.comments, (comment) => {
            return comment.resource["public"] && (comment.resource.sbt != null) && comment.resource.sbt < 0;
        }).length;
        var allSla = _.filter(this.state.comments, function(comment) {
            return (comment.resource.sbt != null) && comment.resource["public"];
        }).length;

        return (
            <div>
                <SlaAttainment negative={negativeSla} all={allSla}></SlaAttainment>
                <div
                    id={this.props.id}
                    className='commentsContainer'
                    key='commentsContainer'
                    ref='commentsContainer'>
                {this.genCommentElements()}
                </div>
            </div>
        )
    }
});

module.exports = Component;
