var React   = require('react');
var moment  = require('moment');

var Label   = require('react-bootstrap/Label');

var Component = React.createClass({
    displayName: 'Timestamp',
    getInitialState: function() {
        return {
            timestamp: this.props.timestamp
        };
    },
    componentWillReceiveProps: function(nextProps) {
        return this.setState({
            timestamp: nextProps.timestamp
        });
    },
    render: function() {
        var text, ts;
        ts = moment(this.props.timestamp).format('lll');
        if (this.props.text != null) {
            text = "" + this.props.text + ": " + ts;
        } else {
            text = ts;
        }
        return <Label bsStyle='default'>{text}</Label>
    }
});

module.exports = Component;

