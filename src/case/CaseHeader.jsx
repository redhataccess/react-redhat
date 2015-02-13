var React           = require('react');
var padLeft         = require('lodash/string/padLeft');
var CaseProduct     = require('./CaseProduct');
var CaseStatus      =  require('./CaseStatus');
var CaseSeverity    =  require('./CaseSeverity')
var CaseSbrs        = require('./CaseSbrs');
var CaseTags        = require('./CaseTags');
var Spacer          = require('../Spacer');
var Well            = require('react-bootstrap/Well');
var Grid            = require('react-bootstrap/Grid');
var Row             = require('react-bootstrap/Row');
var Col             = require('react-bootstrap/Col');
var ButtonToolbar   = require('react-bootstrap/ButtonToolbar');
var ButtonGroup     = require('react-bootstrap/ButtonGroup');
var Button          = require('react-bootstrap/Button');
var CaseHeaderText  = require('./CaseHeaderText');


var Component = React.createClass({
    
    
    render: function() {

        return (
            <Well key='caseHeader'>
                <Row>
                    <Col md={12}>

                        <CaseHeaderText case={this.props.case}></CaseHeaderText>
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
