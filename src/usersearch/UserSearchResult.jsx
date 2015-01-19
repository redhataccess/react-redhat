var React               = require('react');
var _                   = require('lodash');

var Table               = require('react-bootstrap/Table');
var Panel               = require('react-bootstrap/Panel');

var User                = require('../user/User');
var Geo                 = require('../user/Geo');
var Timezone            = require('../user/Timezone');
var Sbrs                = require('../user/Sbrs');

module.exports = React.createClass({
  displayName: "UserSearchResult",
  propTypes: {
    // Optionally pass in a function to determine what happens when a user button is clicked
    openUser: React.PropTypes.func
  },
  genTableData: function(users) {
      var self = this;
      return _.map(users, function(user) {
          return (
              <tr key={user.externalModelId}>
                  <td><User openUser={self.props.openUser} resource={user} size="medium"></User></td>
                  <td><Geo geo={user.resource.superRegion}></Geo></td>
                  <td><Timezone timezone={user.resource.timezone}></Timezone></td>
                  <td><Sbrs sbrs={user.resource.sbrs}></Sbrs></td>
              </tr>
          )
      })
  },
  render: function() {
    if (this.props.users == null) {
      return null;
    } else if (this.props.users.length == 0) {
        return (
            <Panel>
                <h4>Search Results</h4>
                <p>{`Found ${this.props.users.length} users`}</p>
            </Panel>
        )
    }
    var header = <h4>{`${this.props.users.length} users found`}</h4>;
    return (
        <Panel header={header}>
            <h4>Search Results</h4>
            <Table striped={true} bordered={true} hover={true} className="react-tablesorter">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Region</th>
                        <th>Timezone</th>
                        <th>SBR Groups</th>
                    </tr>
                </thead>
                <tbody>
                {this.genTableData(this.props.users)}
                </tbody>
            </Table>
        </Panel>
    );
  }
});
