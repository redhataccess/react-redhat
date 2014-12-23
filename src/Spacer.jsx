var React = require('react');

var Component = React.createClass({
    displayName: 'Spacer',
    render: function() {
        // If the className is set, assume that the margin styling is set that way, otherwise, set the default
        // margin-bottom of 10px.  Override this in your own style by setting the className on this component
        var divStyle = this.props.className != null ? {} : { 'marginBottom': '10px' };

        return <div {...this.props} style={divStyle}></div>;
    }
});

module.exports = Component;
