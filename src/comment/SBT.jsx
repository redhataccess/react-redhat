var React       = require('react');

var Label = require('react-bootstrap/Label');
var moment = require('moment')


var Component = React.createClass({
    displayStyle: function() {
        var sbt;
        sbt = this.props.sbt;

        if (sbt >= 60) {
            return 'success';
        } else if ((0 < sbt  < 60)) {
            return 'warning';
        } else {
            return 'danger';
        }
    },
    render: function() {
        var style;
        if (this.props.sbt != null) {
            style = this.displayStyle();
            return (
                <Label bsStyle={style}>
                    SBT: {moment.duration(this.props.sbt, 'minutes').humanize()}
                </Label>
            )
        } else {
            return null;
        }
    }
});

module.exports = Component;
