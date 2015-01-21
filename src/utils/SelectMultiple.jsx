var React = require('react');
var _     = require('lodash');

module.exports = React.createClass({
  componentDidMount: function() {
    var self = this;
    //$(this.refs.selectmultiple.getDOMNode()).select2();
    //$(this.refs.selectmultiple.getDOMNode()).on("change", function() {
    //  self.props.valueChanged.call(null, $(this).val())
    //});
    //http://harvesthq.github.io/chosen/options.html
    $(this.refs.selectmultiple.getDOMNode()).chosen({multiple: true});
    $(this.refs.selectmultiple.getDOMNode()).chosen().change(function() {
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
  genOptions: function(sbrs) {
    return _.map(sbrs, (sbr) => <option value={sbr}>{sbr}</option>)
  },
  valueChanged: function(event) {
    if (this.props.valueChanged != null) {
      return this.props.valueChanged(event.val);
    }
  },
  render: function() {
    return (
      <div>
        {this.genLabel(this.props.label)}
        <select ref="selectmultiple" className="form-control" multiple={true} style={{width: "100%"}}>
          {this.genOptions(this.props.values)}
        </select>
      </div>
    );
  }
});
