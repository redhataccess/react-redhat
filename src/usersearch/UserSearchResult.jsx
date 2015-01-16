var React               = require('react');
var _                   = require('lodash');

var UserSearchOverview  = require('./userSearchOverview');

var Table               = require('react-bootstrap/Table');
var Panel               = require('react-bootstrap/Panel');

module.exports = React.createClass({
  displayName: "UserSearchResult",
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
                {_.map(this.props.users, function(u) { return <UserSearchOverview user={u}></UserSearchOverview>})}
                </tbody>
            </Table>
        </Panel>
    );
  }
});
