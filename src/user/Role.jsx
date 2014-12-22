var React           = require('react');
var _               = require('lodash');
var Sbrs            = require('./Sbrs');
var Geo             = require('./Geo');

var Label          = require('react-bootstrap/Label');
var Popover        = require('react-bootstrap/Popover');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');

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
        var isParent, role, roleDesc, roleDescRes, roleStyle, userId, roleLink, overlayPopover, geoComponent, sbrsComponent;
        role = this.props.role;
        userId = this.props.userId;
        isParent = role.resource.parentRole == null;
        roleDescRes = [];
        if (isParent) {
            roleDescRes.push(<i className='fa fa-users'></i>);
            //roleDescRes.push(' ');
        }
        if (isParent && (userId != null)) {
            roleLink = (
                <a className='label-link' href={`#Roles/${encodeURIComponent(role.resource.name)}/${userId}`}>
                {role.resource.description}
                </a>
            );
            roleDescRes.push(roleLink);
        } else {
            if (this.state.parentUser != null) {
                roleLink = (
                    <span>
                        <span>{role.resource.description}</span>
                        <span>: </span>
                        <a className='label-link' href={`#Roles/${encodeURIComponent(role.resource.parentRole.resource.name)}/${this.state.parentUser.externalModelId}`}>
                        {this.state.parentUser.resource.fullName}
                        </a>
                    </span>
                )
            } else {
                roleLink = <span>{role.resource.description}</span>
            }
            roleDescRes.push(roleLink);
        }
        roleDesc = <span>{roleDescRes}</span>;
        if (!isParent) {
            roleStyle = 'danger';
        }
        if (isParent) {
            roleStyle = 'default';
        }
        overlayPopover = (
            <Popover title={role.resource.description}>
                <Sbrs sbrs={role.resource.sbrs}></Sbrs>
            </Popover>
        );
        geoComponent = role.resource.superRegion != null ? <Geo geo={role.resource.superRegion}></Geo> : null;
        sbrsComponent = role.resource.sbrs != null ? <Sbrs sbrs={role.resource.sbrs}></Sbrs>: null;
        return (
            <span>
                &nbsp;
                <OverlayTrigger overlay={overlayPopover} placement='bottom'>
                    <div>
                        <Label bsStyle={roleStyle}>{roleDesc}</Label>
                        {geoComponent}
                        {sbrsComponent}
                    </div>
                </OverlayTrigger>
            </span>
        )
    }
});
