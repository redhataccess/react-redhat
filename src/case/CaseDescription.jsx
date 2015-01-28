var React       = require('react');

var Accordion   = require('react-bootstrap/Accordion');
var Panel       = require('react-bootstrap/Panel');

var Component = React.createClass({
    displayName: 'CaseDescription',
    render: function() {
        var description;
        description = <span>No description available.</span>;
        if (this.props.description != null) {
            description = <pre className='case description paneled'>{this.props.description}</pre>;
        }
        return (
            <Accordion key='accordion'>
                <Panel
                    eventKey='caseDescription'
                    key='caseDescription'
                    header='Customer Description'
                    collapsable={true}
                    defaultExpanded={false}>{description}</Panel>
            </Accordion>
        )
    }
});

module.exports = Component;
