var React           = require('react/addons');
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
        // If the limit is defined (mainly for testing and docs) take the first 0...limit comments for display
        if (_.isNumber(this.props.limit)) {
            return _.map(_.values(this.state.comments).slice(0, this.props.limit), (c) => <Comment id={c['externalModelId']} key={c['externalModelId']} comment={c}></Comment>);
        }
        return _.map(this.state.comments, (c) => <Comment id={c['externalModelId']} key={c['externalModelId']} comment={c}></Comment>);
    },
    queryComments: function(props) {
        var self = this;
        this.setState({'loading': true});
        var opts = {
            caseNumber: `${props.caseNumber}`
        };
        this.getComments(opts)
            .then((comments) => {
                self.setState({
                    'comments': _.zipObject(_.map(comments, (c) => [c['externalModelId'], c] )),
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
        var negativeSla = _.filter(_.values(this.state.comments), (comment) => {
            return comment.resource["public"] && (comment.resource.sbt != null) && comment.resource.sbt < 0;
        }).length;
        var allSla = _.filter(_.values(this.state.comments), function(comment) {
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
