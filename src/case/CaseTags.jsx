var React   = require('react');

var Spacer  = require('../Spacer');
var Label   = require('react-bootstrap/Label');

var Component = React.createClass({
    displayName: 'Case SBRs',
    getDefaultProps: function() {
        return {
            // Determines whether to add a spacer preceding the labels or not
            spacer: true
        };
    },
    render: function() {
        if (this.props.case == null 
            || this.props.case.resource.tags == null 
            || this.props.case.resource.tags.length == 0) {
            return null;
        }
                // {this.props.spacer == true ? <Spacer /> : null}
        return (
            <div>
                <div className='clearfix'></div>
                {this.props.case.resource.tags.map((t) => <span key="t"><Label bsStyle="default">{t}</Label>&nbsp;</span>)}
                &nbsp;
            </div>
        )
    }
});

module.exports = Component;