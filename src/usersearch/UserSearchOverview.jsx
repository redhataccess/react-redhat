var React             = require('react');
var Geo      = React.createFactory(require('../user/Geo'));
var Timezone = React.createFactory(require('../user/Timezone'));
var User     = React.createFactory(require('../user/User'));
var Sbrs     = React.createFactory(require('../user/Sbrs'));

module.exports = React.createClass({
  render: function() {
    var user = this.props.user;
    return (
       <tr>
           <td><User resource={user} size="medium"></User></td>
           <td><Geo geo={user.resource.superRegion}></Geo></td>
           <td><Timezone timezone={user.resource.timezone}></Timezone></td>
           <td><Sbrs sbrs={user.resource.sbrs}></Sbrs></td>
       </tr>
    );
  }
});
