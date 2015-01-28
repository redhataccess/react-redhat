var React           = require('react/addons');
var WebUtilsMixin   = require('../utils/WebUtilsMixin');

var Label           = require('react-bootstrap/Label');

var Component = React.createClass({
    propTypes: {
      'case': React.PropTypes.object.isRequired
    },
    displayName: 'CaseProduct',
    mixins: [WebUtilsMixin],
    render: function() {
        var product, version;
        if (this.isDefined(this, 'props.case.resource.product')) {
            return null;
        }
        product = this.props.case.product.resource;
        version = this.getDefined(product, 'version.resource.name') || "";
        return <Label bsStyle='default' key='caseProduct'>{`${product.line.resource.name} ${version}`}</Label>;
    }
});

module.exports = Component;
