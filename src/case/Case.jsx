var React               = require('react/addons');

var Spacer              = require('../Spacer');
var User                = require('../user/User');


var CaseHeader          = require('./CaseHeader');
var CaseDescription     = require('./CaseDescription');
var CaseSummary         = require('./CaseSummary');
var CaseAssociates      = require('./CaseAssociates');
var CaseIssueLinks      = require('./CaseIssueLinks');
var CaseResourceLinks   = require('./CaseResourceLinks');
var Comments            = require('../comment/Comments');


var Alert               = require('react-bootstrap/Alert');
var Grid                = require('react-bootstrap/Grid');

var Component = React.createClass({
    displayName: 'Case',

    getInitialState: function() {
        return {
            'case': void 0,
            'loading': true
        };
    },
    componentDidMount: function() {
        this.setState({'case': this.props.case, 'loading': false});
    },
    render: function() {
        if (this.state.loading == true) {
            return <i className='fa fa-spinner fa-spin'></i>;
        }
        if (this.state.case == null && this.state.loading == false) {
            return <Alert bsStyle='warning' key='alert'>
            {`No case found with case number: ${this.props.case.resource.caseNumber}`}
            </Alert>;
        }
        return (
            <div>
                <CaseHeader case={this.props.case.resource} key='caseHeader'></CaseHeader>
                <div key='caseMetaData'>
                    <CaseDescription description={this.props.case.resource.description}></CaseDescription>
                    <CaseSummary summary={this.props.case.resource.summary}></CaseSummary>
                    <CaseAssociates owner={this.props.case.resource.owner} associates={this.state.case.resource.caseAssociates}></CaseAssociates>
                    <CaseResourceLinks resourceLinks={this.props.case.resource.resourceLinks}></CaseResourceLinks>
                </div>
                <hr />
                <Comments caseNumber={this.props.case.resource.caseNumber}></Comments>
            </div>
        )
    }
});

module.exports = Component;
