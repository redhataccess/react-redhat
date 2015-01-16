var React           = require('react');
var _               = require('lodash');

var SelectMultiple  = require('../utils/SelectMultiple');
var UdsMixin        = require('../utils/UdsMixin');

module.exports = React.createClass({
    displayName: "SbrsSelect",
    mixins: [UdsMixin],
    getInitialState: function() {
        return {
            sbrs: []
        };
    },
    componentDidMount: function() {
        var self = this;
        this.loadSbrs().done(function(sbrs) {
            self.setState({sbrs: sbrs});
        }, function (err) {
            console.error(err.stack)
        });
    },
    render: function() {
        var sbrs = {};
        this.state.sbrs.forEach((sbr) => sbrs[sbr] = sbr );
        return (
            <SelectMultiple
                label={this.props.label}
                values={sbrs}
                valueChanged={this.props.valueChanged}>
            </SelectMultiple>
        )
    }
});
