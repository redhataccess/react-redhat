var React               = require('react');
//var Router              = require('react-router/dist/react-router');
var User                = require('../user/User');


var Accordion           = require('react-bootstrap/Accordion');
var Panel               = require('react-bootstrap/Panel');
var Table               = require('react-bootstrap/Table');
//var NavigationActions   = require('../../actions/NavigationActions');

var Component = React.createClass({
    displayName: 'Case Associates',
  //  mixins: [Router.State],
    openUser: function(user) {
    //    var params = this.getParams(),
   //         query = this.getQuery();
      //  NavigationActions.navigateToTasks(user, params, query);
    },
    displayOwner: function(owner) {
        if (owner == null) {
            return [ 'danger', <span></span>];
        } else {
            return [
                'default',
                <tr key={owner.externalModelId}>
                    <td>Owner</td>
                    <td><User openUser={this.openUser} resource={owner}></User></td>
                </tr>
            ];
        }
    },
    render: function() {
        var associates, associatesUI, owner, associateElements, self = this;
        owner = this.props.owner;
        associates = this.props.associates;

        var [ownerStyle, ownerElement] = this.displayOwner(owner);

        associateElements = _.map(associates, function (associate) {
            return (
                <tr>
                    <td>{associate.resource.role}</td>
                    <td><User openUser={self.openUser} resource={associate.resource.associate}></User></td>
                </tr>
            )
        });

        associatesUI = <span>No Red Hat Associates are assigned to this Case.</span>;
        if ((associates != null) || (ownerElement != null)) {
            associatesUI = (
                <Table responsive={true}>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Associate</th>
                        </tr>
                    </thead>
                    <tbody>
                    {ownerElement}
                    {associateElements}
                    </tbody>
                </Table>
            )
        }
        return (
            <Accordion>
                <Panel
                    eventKey='caseSupportAssociates'
                    key='caseSupportAssociates'
                    header='Support Associates'
                    bsStyle={ownerStyle}
                    collapsable={true}
                    defaultExpanded={false}
                >{associatesUI}</Panel>
            </Accordion>
        )
    }
});

module.exports = Component;
