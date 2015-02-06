var React           = require('react/addons');
var Label           = require('react-bootstrap/Label');

var Component = React.createClass({
    propTypes: {
        'case': React.PropTypes.object.isRequired
    },
    displayName: 'CaseStatus',

    displayStatus: function() {
        var status = this.props.case.resource.status;
        var internalStatus = this.props.case.resource.internalStatus;
        if(status == internalStatus == 'Waiting on Customer')
            return ['info', status];
        else if (status == 'Waiting on Customer')
            return ['info', "WoC / " + internalStatus];
        else if (status == 'Waiting on Red Hat')
            return ['warning', internalStatus];
        else if (status == internalStatus)
            return ['success', status];
        else
            return ['success', status + " / " + internalStatus];
    },
    render: function() {
        if (this.props.case == null)
        {
            return null;
        }
        var [style, status] = this.displayStatus();
        return (
            <span>
                <Label bsStyle={style}>{status}</Label>
            </span>
        )
    }
});
module.exports = Component;