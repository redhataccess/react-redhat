var React           = require('react');
var _               = require('lodash');
var Sbrs            = require('./Sbrs');
var Geo             = require('./Geo');

var Label          = require('react-bootstrap/Label');
var Popover        = require('react-bootstrap/Popover');
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');

module.exports = React.createClass({
    displayName: 'RoleDescription',
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
    // If this is a parent role add the user className
    // TODO -- this assumes font-awesome, but that dependency should be configurable
    genParentUserIcon: function(isParent) {
      if (isParent) {
          return <i key='fa-users' className='fa fa-users'></i>;
      }
    },
    // TODO this is too complicated and needs to be rewritten
    genParentUser: function(isParent, userId, role) {
        if (isParent && (userId != null)) {
            return (
                <a key={role.resource.name} className='label-link' href={`#Roles/${encodeURIComponent(role.resource.name)}/${userId}`}>
                {role.resource.description}
                </a>
            )
        } else {
            if (this.state.parentUser != null) {
                return (
                    <span>
                        <span key={role.resource.description}>{role.resource.description}</span>
                        <span key='colon'>: </span>
                        <a key={role.resource.parentRole.resource.name} className='label-link' href={`#Roles/${encodeURIComponent(role.resource.parentRole.resource.name)}/${this.state.parentUser.externalModelId}`}>
                        {this.state.parentUser.resource.fullName}
                        </a>
                    </span>
                )
            } else {
                return <span key={role.resource.description}>{role.resource.description}</span>
            }
        }
    },
    render: function() {
        var isParent, role, roleStyle, userId;
        role = this.props.role;
        userId = this.props.userId;
        isParent = role.resource.parentRole == null;
        if (!isParent) {
            roleStyle = 'danger';
        } else {
            roleStyle = 'default';
        }
        return (
            <span key='role-description'>
                <Label key='role-description' bsStyle={roleStyle}>
                {this.genParentUserIcon(isParent)}
                {this.genParentUser(isParent, userId, role)}
                </Label>
            </span>
        )
    }
});
