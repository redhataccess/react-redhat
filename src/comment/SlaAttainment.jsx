var React       = require('react');
var Spacer      = require('../Spacer');

var ProgressBar = require('react-bootstrap/ProgressBar');
var Panel       = require('react-bootstrap/Panel');

var Component = React.createClass({
    displayStyle: function() {
        var all, negative, _ref1;
        negative = this.props.negative;
        all = this.props.all;
        this.ratio = Math.round((all - negative) * 100.0 / all);
        if (this.ratio >= 90) {
            return 'success';
        } else if ((80 < (_ref1 = this.ratio) && _ref1 < 90)) {
            return 'warning';
        } else {
            return 'danger';
        }
    },
    render: function() {
        var style;
        if (this.props.all != null) {
            style = this.displayStyle();
            return (
                <Panel header='Comment SLA Attainment'>
                    <ProgressBar bsStyle={style} now={this.ratio} label={` ${this.ratio}%`}></ProgressBar>
                </Panel>
            )
        } else {
            return null;
        }
    }
});

module.exports = Component;
