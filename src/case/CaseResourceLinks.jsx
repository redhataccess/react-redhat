var React       = require('react');
var _           = require('lodash');
var Timestamp   = require('../comment/Timestamp');

var Accordion   = require('react-bootstrap/Accordion');
var Panel       = require('react-bootstrap/Panel');
var Table       = require('react-bootstrap/Table');

Component = React.createClass({
    render: function() {
        var linkedResources, resourcesUI, tableBody;
        linkedResources = _.filter(this.props.resourceLinks, (link) => link.resource.resourceStatus === 'Linked');
        resourcesUI = <span>No external resources attached.</span>;
        if (linkedResources.length > 0) {
            tableBody = _.map(linkedResources, (link) => {
                var resourceNumber = null;
                if (link.resource.resourceType === 'KnowledgeBaseSolution') {
                    resourceNumber = <a target='_blank' href={`https://access.redhat.com/solutions/${link.resource.resourceId}`}>{link.resource.resourceId}</a>;
                } else {
                    resourceNumber = <span>{link.resource.resourceId}</span>;
                }
                return (
                    <tr key={link.resource.resourceId}>
                        <td>{resourceNumber}</td>
                        <td>{link.resource.resourceType}</td>
                        <td>{link.resource.title}</td>
                        <td>{link.resource.resourceStatus}</td>
                        <td><Timestamp text='Attached' timestamp={link.resource.attached}></Timestamp></td>
                    </tr>
                )
            });
            resourcesUI = (
                <Table responsive={true}>
                    <thead>
                        <tr>
                            <th>{'#'}</th>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {tableBody}
                    </tbody>
                </Table>
            )
        }
        return (
            <Accordion>
                <Panel
                    eventKey='caseDescription'
                    key='caseDescription'
                    header='Linked Resources (KnowledgeBase, Documentation, Support Cases, ...)#TypeTitleStatus'
                    collapsable={true}
                    defaultExpanded={false}>{resourcesUI}</Panel>
            </Accordion>
        )
    }
});

module.exports = Component;
