var React           = require('react');

var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var Tooltip         = require('react-bootstrap/Tooltip');

var Component = React.createClass({
    displayName: 'IconWithTooltip',
    genTooltipPrefix: function() {
        if ((this.props.tooltipPrefix == null) || this.props.tooltipPrefix === '') {
            return '';
        }
        return this.props.tooltipPrefix + ' ';
    },
    render: function() {
        var tooltip;
        if (this.props.iconName == null) {
            return null;
        }
        tooltip = <Tooltip>{this.genTooltipPrefix() + this.props.tooltipText}</Tooltip>;
        return (
            <OverlayTrigger trigger='hover' placement='right' overlay={tooltip}>
                <i className={this.props.iconName} title={this.props.tooltipText}></i>
            </OverlayTrigger>
        )
    }
});

module.exports = Component;
