var React = require('react');

var Label = require('react-bootstrap/Label');

var Component = React.createClass({
  propTypes: {
    geo: React.PropTypes.string
  },
  render: function () {
    return <Label key={this.props.geo} bsStyle='info'>{this.props.geo}</Label>;
  }
});

module.exports = Component;
