var React   = require('react');
var Input   = require('react-bootstrap/Input');
var regions = ["India", "NA", "LATAM", "EMEA", "APAC"];

module.exports = React.createClass({
    componentDidMount: function() {
        var self = this;
        //$(this.refs.region.getDOMNode()).select2();
        ////$("#region").on("change", this.valueChanged);
        //$(this.refs.region.getDOMNode()).on("change", function() {
        //    self.props.valueChanged.call(null, $(this).val())
        //});
        $(this.refs.region.getDOMNode()).chosen();
        //$("#region").on("change", this.valueChanged);
        $(this.refs.region.getDOMNode()).chosen().change(function() {
            self.props.valueChanged.call(null, $(this).val())
        });
    },
    componentWillUnmount: function() {
        $(this.refs.region.getDOMNode()).off("change");
    },
    genLabel: function(label) {
        if (label != null) {
            return <label className="control-label">{label}</label>
        }
        return null;
    },
    genRegions: function(regions) {
        return regions.map((region) => <option value={region}>{region}</option>)
    },
    valueChanged: function(event) {
        if (this.props.valueChanged != null) {
            return this.props.valueChanged(event.val);
        }
    },
    render: function() {
        return (
            <div className="form-group">
                {this.genLabel(this.props.label)}
                <select ref="region" className="form-control" style={{width: "100%"}}>
                    <option value="">---</option>
                    {this.genRegions(regions)}
                </select>
            </div>
        );

    }
});
