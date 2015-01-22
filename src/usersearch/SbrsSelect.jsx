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
        if (this.state.values == null || this.state.values.length == 0) {
            var self = this;
            this.setState({loading: true});
            this.loadSbrs().then(function(sbrs) {
                self.setState({sbrs: sbrs});
            }).catch(function (err) {
                console.error(err.stack)
            }).done(function() {
                self.setState({loading: false});
            });
        }
    },
    render: function() {
        var sbrs = this.props.values || this.state.sbrs;
        if (this.state.loading == true) {
            return <Spinner></Spinner>;
        }
        if (sbrs && sbrs.length == 0) {
            return null;
        }
        return (
            <SelectMultiple
                label={this.props.label}
                values={sbrs}
                valueChanged={this.props.valueChanged}>
            </SelectMultiple>
        )
    }
});
