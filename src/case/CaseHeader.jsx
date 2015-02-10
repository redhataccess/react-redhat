var React       = require('react');
var padLeft     = require('lodash/string/padLeft');
var CaseProduct = require('./CaseProduct');
var CaseStatus  =  require('./CaseStatus');
var CaseSeverity =  require('./CaseSeverity')
var CaseSbrs    = require('./CaseSbrs');
var CaseTags    = require('./CaseTags');

var Spacer      = require('../Spacer');
var ResourceOpEnum    = require('../enums/ResourceOpEnum.js');

var Well            = require('react-bootstrap/Well');
var Grid            = require('react-bootstrap/Grid');
var Row             = require('react-bootstrap/Row');
var Label           = require('react-bootstrap/Label');
var Col             = require('react-bootstrap/Col');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var Tooltip         = require('react-bootstrap/Tooltip');
var ButtonToolbar   = require('react-bootstrap/ButtonToolbar');
var ButtonGroup     = require('react-bootstrap/ButtonGroup');
var Button          = require('react-bootstrap/Button');

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
    genTamLabel: function(c) {
        if (c.resource.isTAMCase == true) {
            return <span>&nbsp;<Label bsStyle="primary">TAM</Label></span>;
        }
        return null;
    },
    render: function() {
        var caseNumber = padLeft(this.props.case.resource.caseNumber, 8, '0');
        return (
            <Well key='caseHeader'>
                <Row>
                    <Col md={12}>
                        <h2 key='header'>
                            {this.genEntityOpText(this.props.case)}
                            Case {caseNumber}
                            {this.genFtsLabel(this.props.case)}
                            {this.genTamLabel(this.props.case)}
                        </h2>
                        <span>
                            <CaseProduct case={this.props.case.resource} key='product'></CaseProduct>
                            <CaseSbrs case={this.props.case} key='sbrs'></CaseSbrs>
                            <CaseTags case={this.props.case} key='tags'></CaseTags>
                        </span>
                        <Spacer />
                        <div className='clearfix'></div>
                        <CaseStatus case={this.props.case} key='status'></CaseStatus>
                        &nbsp; &nbsp;
                        <CaseSeverity case={this.props.case} key='severity'></CaseSeverity>
                        <div className='clearfix'></div>
                        <Spacer />
                        {/* Text dates are not flowing with the above, need to figure out a better way to visually display*/}
                        {/*<TaskDates task={this.props.case} key='dates'></TaskDates>*/}
                        {/*/////////////////////////////////////////////////////////////////////////////////*/}
                        {/*Case link buttons */}
                        {/*/////////////////////////////////////////////////////////////////////////////////*/}
                        <ButtonToolbar>
                            <ButtonGroup>
                                <Button bsSize="small" target='_blank' href={`https://na7.salesforce.com/${this.props.case.externalModelId}`}>Salesforce</Button>
                                <Button bsSize="small" target='_blank' href={`https://unified.gsslab.rdu2.redhat.com/cli#Case/number/${this.props.case.resource.caseNumber}`}>Unified</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Spacer />
                <strong key='headerSubject'>{this.props.case.resource.subject}</strong>
                <Spacer />
            </Well>
        )
    }
});

module.exports = Component;
