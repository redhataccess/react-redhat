var React           = require('react');
var _               = require('lodash');
var Sbrs            = require('./Sbrs');
var Geo             = require('./Geo');
var RoleDescription = require('./RoleDescription');

var Label           = require('react-bootstrap/Label');
var Popover         = require('react-bootstrap/Popover');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');

module.exports = React.createClass({
    // Both role and user are UDS resource objects
    propTypes: {
        role: React.PropTypes.object,
        userId: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            parentUser: void 0
        };
    },
    refreshParentComponent: function() {
        var self = this;
        if (this.props.role.resource.parentUser != null) {
            $.ajax({
                url: `/user/${this.props.role.resource.parentUser.externalModelId}`,
                success: (result) => {
                    self.setState({parentUser: _.first(_.isString(result) ? JSON.parse(result) : result)})
                }
            });
        }
    },
    componentDidMount: function() {
        this.refreshParentComponent();
    },
    render: function() {
        var role, overlayPopover, geoComponent, sbrsComponent;
        role = this.props.role;

        overlayPopover = (
            <Popover key='sbr-popover' title={role.resource.description}>
                <Sbrs sbrs={role.resource.sbrs}></Sbrs>
            </Popover>
        );
        geoComponent = role.resource.superRegion != null ? <Geo geo={role.resource.superRegion}></Geo> : null;
        sbrsComponent = role.resource.sbrs != null ? <Sbrs sbrs={role.resource.sbrs}></Sbrs>: null;
        return (
            <span key='role-container'>
                &nbsp;
                <OverlayTrigger key='role-overlay' overlay={overlayPopover} placement='bottom'>
                    <div key='role-overlay-container'>
                        <RoleDescription {...this.props}></RoleDescription>
                        {geoComponent}
                        {sbrsComponent}
                    </div>
                </OverlayTrigger>
            </span>
        )
    }
});
