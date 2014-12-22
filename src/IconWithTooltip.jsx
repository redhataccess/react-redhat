var React           = require('react');

var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var Tooltip         = require('react-bootstrap/Tooltip');

var Component = React.createClass({
    displayName: 'IconWithTooltip',
    propTypes: {
        // Optional string to prefix the tooltip with
        tooltipPrefix: React.PropTypes.string,
        // Text of the tooltip itself
        tooltipText: React.PropTypes.string,
        // Icon name, for example using font-awesome you may pass 'fa fa-user'
        iconName: React.PropTypes.string
    },
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
