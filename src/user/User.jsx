var React   = require('react');
var moment  = require('moment');
var _       = require('lodash');
var S       = require('string');

var Spacer              = require('../Spacer');

var Geo                 = require('./Geo');
var Timezone            = require('./Timezone');
var Role                = require('./Role');
var OverlayTrigger      = require('react-bootstrap/OverlayTrigger');
var Popover             = require('react-bootstrap/Popover');
var SplitButton         = require('react-bootstrap/SplitButton');
var MenuItem            = require('react-bootstrap/MenuItem');
var Glyph               = require('react-bootstrap/Glyphicon');

module.exports = React.createClass({
    displayName: 'User',
    propTypes: {
        // This represents the UDS user resource
        resource: React.PropTypes.object,
        // Bootstrap button bsSize
        size: React.PropTypes.number,
        // Optionally pass in a function to determine what happens when a user button is clicked
        openUser: React.PropTypes.func,
        unifiedUrl: React.PropTypes.string,
        skillMatrixUrl: React.PropTypes.string
    },
    getDefaultProps: function () {
      return {
          unifiedUrl: "https://unified.gsslab.rdu2.redhat.com",
          skillMatrixUrl: "http://skillmatrix-jtrantin.itos.redhat.com",
          salesforceUrl: "https://unified.gsslab.rdu2.redhat.com/cli"
      }
    },
    openUser: function() {
        var user = this.props.resource.resource;
        if (this.props.openUser != null) {
            this.props.openUser(this.props.resource);
        } else {
            $(location).attr('href', "#User/" + (_.first(user.sso)));
        }
        return false;
    },
    calendar: function() {
        var user = this.props.resource.resource;
        if (this.props.calendar != null) {
            this.props.calendar(this.props.resource);
        } else {
            $(location).attr('href', "#Calendar/" + (_.first(user.sso)));
        }
        return false;
    },
    sendEmail: function() {
        var user = this.props.resource.resource;
        if (this.props.sendEmail != null) {
            this.props.sendEmail(this.props.resource);
        } else {
            $(location).attr('href', "mailto:" + (_.find(user.email, function(email) {
                return email.addressType = 'PRIMARY';
            }).address));
        }
        return false;
    },
    salesForce: function() {
        var user = this.props.resource;
        if (this.props.salesForce != null) {
            this.props.salesForce(this.props.resource);
        } else {
            window.open(this.props.salesforceUrl + "/" + user.externalModelId, '_blank');
        }
        return false;
    },
    skillMatrix: function() {
        var user = this.props.resource;
        if (this.props.skillMatrix != null) {
            this.props.skillMatrix(this.props.resource);
        } else {
            window.open(this.props.skillMatrixUrl + "/member.jsf?id=" + user.resource.skillMatrixId, '_blank');
        }
        return false;
    },
    formatMonth: function (month) {
        return S(month).padLeft(2, '0').s
    },
    engineerReport: function() {
        var hash,
            user = this.props.resource.resource;
        if (this.props.engineerReport != null) {
            this.props.engineerReport(this.props.resource);
        } else {
            if (moment().month() < 12) {
                hash = "#EngineerReport/" + user.kerberos + "/" + (moment().year()) + "-" + (this.formatMonth(moment().month() + 1)) + "-01/" + (moment().year()) + "-" + (this.formatMonth(moment().month() + 2)) + "-01";
                //$(location).attr('hash', "#EngineerReport/" + user.kerberos + "/" + (moment().year()) + "-" + (moment().month()) + "-01/" + (moment().year()) + "-" + (moment().month() + 1) + "-01");
                window.open(this.props.unifiedUrl + "/cli" + hash);
            } else {
                hash = "#EngineerReport/" + user.kerberos + "/" + (moment().year()) + "-" + (this.formatMonth(moment().month() + 1)) + "-01/" + (moment().year() + 1) + "-01-01";
                //$(location).attr('hash', "#EngineerReport/" + user.kerberos + "/" + (moment().year()) + "-" + (moment().month()) + "-01/" + (moment().year() + 1) + "-01-01");
                window.open(this.props.unifiedUrl + "/cli" + hash);
            }
        }
        return false;
    },
    render: function() {
        var geoStyle, popover, style, title, user, roles, skillMatrixMenuItem, engineerReportMenuItem, actionsPopover;
        if (!(this.props.resource && this.props.resource.resource)) {
            return null;
        } else {
            user = this.props.resource.resource;
        }

        if (user.email == null) {
            return <span>{user.fullName}</span>
        } else {
            roles = _.map(user.roles, (role) => <Role role={role} userId={user.externalModelId}></Role>);
            popover = (
                <Popover title={user.fullName}>
                    <div>{user.title}</div>
                    <Geo geo={user.superRegion}></Geo>
                    &nbsp;
                    <Timezone timezone={user.timezone}></Timezone>
                    &nbsp;
                    <Spacer />
                    {roles}
                </Popover>
            );

            style = 'default';
            if (user.isManager) {
                style = 'warning';
            }
            if (user.superRegion === 'EMEA') {
                geoStyle = 'primary';
            } else if (user.superRegion === 'APAC') {
                geoStyle = 'danger';
            } else if (user.superRegion === 'India') {
                geoStyle = 'success';
            } else if (user.superRegion === 'NA') {
                geoStyle = 'default';
            } else if (user.superRegion === 'LATAM') {
                geoStyle = 'warning';
            }
            //title = <span><b>{`${user.superRegion}: ${user.fullName}`}</b></span>;
            title = (
                <span onClick={this.openUser} className="user-text-container pointer">
                    {user.superRegion != null ? <b>{user.superRegion},&nbsp;</b>: null}
                    <span>{user.fullName}</span>
                    {user.isManager ? <b>&nbsp;(M)</b> : null}
                </span>
            );


            //skillMatrixMenuItem = user['skillMatrixId'] != null ? <MenuItem onSelect={this.skillMatrix} href={location.hash} key="skillMatrix">Open in SkillMatrix</MenuItem> : null;
            //engineerReportMenuItem = user['skillMatrixId'] != null ? <MenuItem onSelect={this.engineerReport} href={location.hash} key="engineerReport">Engineer Report</MenuItem> : null;
            skillMatrixMenuItem = user['skillMatrixId'] != null ? <li><a onClick={this.skillMatrix} href={location.hash} key="skillMatrix">Open in SkillMatrix</a></li> : null;
            engineerReportMenuItem = user['skillMatrixId'] != null ? <li><a onClick={this.engineerReport} href={location.hash} key="engineerReport">Engineer Report</a></li> : null;

            //<MenuItem onSelect={this.sendEmail} href={location.hash} key="email">Send E-Mail</MenuItem>
            //<MenuItem onSelect={this.salesForce} href={location.hash} key="salesforce">Open in Salesforce</MenuItem>
//{/*TODO -- disabling the calendar link until I can generate it in the form of a UQL query like: (kerberos%20like%20%22%25smendenh%25%22%20or%20SSO%20like%20%22%25smendenh%25%22)*/}
//{/*<MenuItem onSelect={this.calendar} href={location.hash} key="calendar">View Calendar</MenuItem>*/}
//{skillMatrixMenuItem }
//{engineerReportMenuItem }
            actionsPopover = (
                <Popover title="User Actions">
                    <ul className="user-actions">
                        <li><a onClick={this.sendEmail} href={location.hash} key="email">Send E-Mail</a></li>
                        <li><a onClick={this.salesForce} href={location.hash} key="salesforce">Open in Salesforce</a></li>
                        {skillMatrixMenuItem }
                        {engineerReportMenuItem }
                    </ul>
                </Popover>
            );
            return (
                <span ref="user">
                    <OverlayTrigger trigger='click' placement='right' overlay={actionsPopover}>
                        <Glyph glyph="cog" style={{cursor: "pointer"}}></Glyph>
                    </OverlayTrigger>
                    &nbsp;
                    <OverlayTrigger trigger='hover' placement='right' overlay={popover}>
                    {title}
                    </OverlayTrigger>
                </span>
            );
        }
    }
});
