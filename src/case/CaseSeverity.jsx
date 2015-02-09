var React           = require('react/addons');
var Label           = require('react-bootstrap/Label');

var Component = React.createClass({
    propTypes: {
        'case': React.PropTypes.object.isRequired
    },
    displayName: 'CaseSeverity',
    displayStyle: function (severity)
    {
        if(severity == '1 (Urgent)') {
            return 'danger';
        }
        else if (severity == '2 (High)') {
            return 'warning';
        }
        else if (severity == '3 (Normal)') {
            return 'info';
        }
        else if (severity == '4 (Low)') {
            return 'default'
        }
    },
    render: function() {
        if (this.props.case == null)
        {
            return null;
        }
        return (
            <span>
                <Label bsStyle={this.displayStyle(this.props.case.resource.severity)}>{this.props.case.resource.severity}</Label>
                &nbsp; / &nbsp;
                <Label bsStyle={this.displayStyle(this.props.case.resource.internalPriority)}>{this.props.case.resource.internalPriority}</Label>
            </span>
        )
    }
});
module.exports = Component;