var React           = require('react');
var _               = require('lodash');
var Sbrs            = require('./Sbrs');
var Geo             = require('./Geo');
var RoleDescription = require('./RoleDescription');

var Label           = require('react-bootstrap/Label');
var Popover         = require('react-bootstrap/Popover');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');

var UdsMixin        = require('../utils/UdsMixin');

module.exports = React.createClass({
    displayName: "Role",
    mixins: [UdsMixin],
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
    componentDidMount: function() {
        var self = this,
            sfId = this.props.role.resource.parentUser && this.props.role.resource.parentUser.externalModelId;

        // Only search if the parentUser is null or is different from the props
        if (this.props.role.resource.parentUser != null && (this.state.parentUser && this.state.parentUser.externalModelId != sfId)) {
            this.queryUser({id: this.props.role.resource.parentUser.externalModelId}).done(function(user) {
                self.setState({parentUser: user});
            }, function (err) {
                console.error(err.stack)
            });
        }
    },
    render: function() {
        var role, geoComponent, sbrsComponent;
        role = this.props.role;

        geoComponent = role.resource.superRegion != null ? <span>&nbsp;<Geo geo={role.resource.superRegion}></Geo></span> : null;
        sbrsComponent = role.resource.sbrs != null ? <span>&nbsp;<Sbrs sbrs={role.resource.sbrs}></Sbrs></span> : null;
        return (
            <div key='role-container'>
                <RoleDescription {...this.props} parentUser={this.state.parentUser}></RoleDescription>
                {geoComponent}
                {sbrsComponent}
            </div>
        )
    }
});
