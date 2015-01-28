var React       = require('react');

var Accordion   = require('react-bootstrap/Accordion');
var Panel       = require('react-bootstrap/Panel');

var Component = React.createClass({
    render: function() {
        var summary;
        summary = <span>No internal summary available.</span>
        if (this.props.summary != null) {
            summary = <pre className='case description paneled'>{this.props.summary}</pre>;
        }
        return (
            <Accordion>
                <Panel
                    eventKey='caseSummary'
                    key='caseSummary'
                    header='Internal Summary'
                    collapsable={true}
                    defaultExpanded={false}>
                {summary}
                </Panel>
            </Accordion>
        )
    }
});

module.exports = Component;
