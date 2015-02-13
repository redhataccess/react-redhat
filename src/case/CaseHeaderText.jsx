var React           = require('react');
var ResourceOpEnum  = require('../enums/ResourceOpEnum.js');
var Label           = require('react-bootstrap/Label');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var Tooltip         = require('react-bootstrap/Tooltip');
var map             = require('lodash/collection/map');
var padLeft         = require('lodash/string/padLeft');
var filter          = require('lodash/collection/filter');

var Component = React.createClass({
    genEntityOpText: function (c) {
        var resourceOp, resourceOpText;
        if (c != null) {
            resourceOp = ResourceOpEnum.getOpFromCase(c);
            resourceOpText = resourceOp.display + (resourceOp.grammar != null ? " " + resourceOp.grammar : "");
            return (
                <span>{resourceOpText}&nbsp;</span>
            );
        }
        return null;
    },
    genFtsLabel: function(c) {
        if (c.resource.isFTSCase == true) {
            return <span>&nbsp;<Label bsStyle="danger">FTS</Label></span>;
        }
        return null;
    },
    genTamLabel: function (c) {
        if (c.resource.isTAMCase == true) {
            return <span>&nbsp;
                <Label bsStyle="primary">TAM</Label>
            </span>;
        }
        return null;
    },
    checkLinkedResourcePresent: function (resourceLinks) {
        var linkedResources = filter(resourceLinks, (link) => link.resource.resourceStatus === 'Linked');
        if(linkedResources.length==0)
        {
            return null;
            
        }
        else
        {
            return true;            
        }
    },
    
    render: function () {
        var caseNumber = padLeft(this.props.case.resource.caseNumber, 8, '0');
        
        if(this.checkLinkedResourcePresent(this.props.case.resource.resourceLinks))
        {
            return (
            <h2 key='header'>
                       {this.genEntityOpText(this.props.case)}
                        Case {caseNumber}
                        {this.genFtsLabel(this.props.case)}
                        {this.genTamLabel(this.props.case)}
            </h2>
            )
        }
        else {
            return (

                <h2 key='header'>
                    <OverlayTrigger placement="top" overlay={<Tooltip>No KCS solutions attached</Tooltip>}>
                        <Label bsStyle="danger">
                       {this.genEntityOpText(this.props.case)}
                            Case {caseNumber}
                        {this.genFtsLabel(this.props.case)}
                        {this.genTamLabel(this.props.case)}
                        </Label>
                    </OverlayTrigger>
                </h2>

            )
        }
    }
});

module.exports = Component;
