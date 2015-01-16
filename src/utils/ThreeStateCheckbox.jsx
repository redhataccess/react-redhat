var React = require('react');
//var Input = require('react-bootstrap/Input');

module.exports = React.createClass({
  getInitialState: function() {
    return { id: 1, selected: false };
  },
  handleChange: function(event) {
    this.setState({id: this.state.id, selected: !this.state.selected});
    this.props.stateChanged(!this.state.selected);
  },
  //http://stackoverflow.com/questions/21581688/react-facebook-managed-state-of-controlled-checkboxes
  render: function() {
    return (
        <div className="form-group">
          <label>
            <input ref="checkbox" type="checkbox" onChange={this.handleChange} checked={this.state.checked} />
            &nbsp;{this.props.label}
          </label>
        </div>
    );
  }
});
