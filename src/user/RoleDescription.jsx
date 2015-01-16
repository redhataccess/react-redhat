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
    genParentUserIcon: function(isParent) {
      if (isParent) {
          return <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
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
            if (this.props.parentUser != null) {
                return (
                    <span>
                        <span key={role.resource.description}>{role.resource.description}</span>
                        <span key='colon'>: </span>
                        <a key={role.resource.parentRole.resource.name} className='label-link' href={`#Roles/${encodeURIComponent(role.resource.parentRole.resource.name)}/${this.props.parentUser.externalModelId}`}>
                        {this.props.parentUser.resource.fullName}
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
