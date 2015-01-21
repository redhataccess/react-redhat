var React           = require('react');
var _               = require('lodash');

var SelectMultiple  = require('../utils/SelectMultiple');
var Spinner         = require('../utils/Spinner');
var UdsMixin        = require('../utils/UdsMixin');

module.exports = React.createClass({
    displayName: "SbrsSelect",
    mixins: [UdsMixin],
    getInitialState: function() {
        return {
            sbrs: [],
            loading: false
        };
    },
    componentDidMount: function() {
        var self = this;
        this.setState({loading: true});
        this.loadSbrs().done(function(sbrs) {
            console.debug("Ajax found " + sbrs.length + " sbrs");
            self.setState({sbrs: sbrs, loading: false});
        }, function (err) {
            console.error(err.stack)
        });
    },
    render: function() {
        if (this.state.loading == true) {
            return <Spinner></Spinner>;
        }
        if (this.state.sbrs && this.state.sbrs.length == 0) {
            return null;
        }
        return (
            <SelectMultiple
                label={this.props.label}
                values={this.state.sbrs}
                valueChanged={this.props.valueChanged}>
            </SelectMultiple>
        )
    }
});
