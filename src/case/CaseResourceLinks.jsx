var React       = require('react');
var map         = require('lodash/collection/map');
var filter      = require('lodash/collection/filter');
var Timestamp   = require('../comment/Timestamp');
var OverlayTrigger  = require('react-bootstrap/OverlayTrigger');
var Tooltip         = require('react-bootstrap/Tooltip');
var Label           = require('react-bootstrap/Label');
var Accordion   = require('react-bootstrap/Accordion');
var Panel       = require('react-bootstrap/Panel');
var Table       = require('react-bootstrap/Table');

var IconWithTooltip = require('../IconWithTooltip');

Component = React.createClass({
    render: function() {
        var linkedResources, resourcesUI, tableBody;
        var headerText = 'Linked Resources (KnowledgeBase, Documentation, Support Cases, ...)';
        linkedResources = filter(this.props.resourceLinks, (link) => link.resource.resourceStatus === 'Linked');
        resourcesUI = <span>No external resources attached.</span>;
        if (linkedResources.length > 0) {
            headerText = 'Linked Resources (KnowledgeBase, Documentation, Support Cases, ...)';
            tableBody = map(linkedResources, (link) => {
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
                        <td>
                            <Timestamp text='Attached' timestamp={link.resource.attached}></Timestamp>
                        </td>
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
            return (
                <Accordion>
                    <Panel
                        eventKey='caseDescription'
                        key='caseDescription'
                        header={headerText}
                        collapsable={true}
                        defaultExpanded={false}>{resourcesUI}
                       </Panel>
                </Accordion>)
        }
        else
        
        {

            var tooltip = <Tooltip placement="bottom">No KCS Solutions attached</Tooltip>;
        
            headerText = (
                   <span >
                       {headerText}
                     <span style={{color: "#a30000"}} >
                      <OverlayTrigger trigger='hover'  overlay={tooltip}>
                          <i className="fa fa-exclamation-circle"></i>
                      </OverlayTrigger>
                     </span>
                   </span>
            )
            return (
                <Accordion>
                    <Panel
                        eventKey='caseDescription'
                        key='caseDescription'
                        header={headerText}
                        collapsable={true}
                        defaultExpanded={false}>{resourcesUI}</Panel>
                </Accordion>
            )
        }
       
        
    }
});

module.exports = Component;
