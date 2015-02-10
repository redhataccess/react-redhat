var React       = require('react');

var Label = require('react-bootstrap/Label');
var moment = require('moment')


var Component = React.createClass({
    displayStyle: function() {
        var sbt;
        sbt = this.props.sbt;

        if (sbt >= 60) {
            return 'success';
        } else if (sbt > 0 && sbt < 60) {
            return 'warning';
        } else {
            return 'danger';
        }
    },
    displayComponent: function() {
        var sbt = this.props.sbt,
            humanized = moment.duration(this.props.sbt, 'minutes').humanize(); 

        if (sbt >= 60) {
            return <span>SBT: {humanized}</span>;
        } else if (sbt > 0 && sbt < 60) {
            return <span>Breaching in {humanized}</span>;
        } else {
            return <span>Breached by {humanized}</span>;
        }
    },
    render: function() {
        var style;
        if (this.props.sbt != null) {
            style = this.displayStyle();
            return (
                <Label bsStyle={style}>{this.displayComponent()}</Label>
            )
        } else {
            return null;
        }
    }
});

module.exports = Component;
