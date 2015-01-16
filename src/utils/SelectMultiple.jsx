var React = require('react');

//require('select2');

module.exports = React.createClass({
  componentDidMount: function() {
    var self = this;
    $(this.refs.selectmultiple.getDOMNode()).select2();
    //$(this.refs.selectmultiple.getDOMNode()).on("change", this.valueChanged);
    $(this.refs.selectmultiple.getDOMNode()).on("change", function() {
      self.props.valueChanged.call(null, $(this).val())
    });
  },
  componentWillUnmount: function() {
    $(this.refs.selectmultiple.getDOMNode()).off("change");
  },
  genLabel: function(label) {
    if (label != null) {
      return <label className="controlLabel">{label}</label>
    }
    return null;
  },
  genOptions: function(values) {
    return Object.keys(values).map(((key) => <option value={key}>{values[key]}</option>))
  },
  valueChanged: function(event) {
    if (this.props.valueChanged != null) {
      return this.props.valueChanged(event.val);
    }
  },
  render: function() {
    if (this.props.values != null) {
      return (
          <div>
          {this.genLabel(this.props.label)}
            <select ref="selectmultiple" className="form-control" multiple={true} style={{width: "100%"}}>
            {this.genOptions(this.props.values)}
            </select>
          </div>
      );
    }
  }
});
