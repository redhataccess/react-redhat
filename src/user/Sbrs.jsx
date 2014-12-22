var React   = require('react');
var _       = require('lodash');

var Label   = require('react-bootstrap/Label');

module.exports = React.createClass({
    propTypes: {
        sbrs: React.PropTypes.array
    },
    render: function() {
        var sbrs = _.map(this.props.sbrs, (sbr) => {
            return (
                <span key={`container-${sbr}`}>
                    <a href={`#SBRs/${encodeURIComponent(sbr)}`} key={`link-${sbr}`}>
                        <Label bsStyle='primary' key={sbr}>{sbr}</Label>
                    </a>
                    &nbsp;
                </span>
            )
        });
        return (
            <span>{sbrs}</span>
        )
    }
});
