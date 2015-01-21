var React     = require('react');
var _         = require('lodash');

var Input     = require('react-bootstrap/Input');

var UdsMixin  = require('../utils/UdsMixin');
var RandomUtilsMixin  = require('../utils/RandomUtilsMixin');

module.exports = React.createClass({
  mixins: [UdsMixin, RandomUtilsMixin],
  getInitialState: function() {
    return {
      id: this.getRandomId(),
      tags: this.props.tags != null ? this.props.tags : []
    };
  },
  componentDidMount: function() {
    var self = this;
    this.loadTags().done(function(tags) {
      self.setState({tags: tags});
      self.activateTypeahead();
    }, function (err) {
      console.error(err.stack)
    });
  },
  activateTypeahead: function() {
    var self = this;
    $(`#${this.state.id}`).typeahead({
    //$(this.refs.tagselect.getDOMNode()).typeahead({
      hint: false,
      highlight: true,
      minLength: 1
    }, {
      name: "tag",
      displayKey: "name",
      source: self.substringMatcher(self.state.tags)
    });
    //$(this.refs.tagselect.getDOMNode()).bind("typeahead:selected", (function(a, selected) {
    $(`#${this.state.id}`).bind("typeahead:selected", (function(a, selected) {
      self.valueChanged({
        type: "typeahead",
        target: { value: selected.name }
      });
    }));
  },
  valueChanged: function(event) {
    if (this.props.valueChanged != null && event.type == "typeahead") {
      this.props.valueChanged(event.target.value);
    }
  },
  substringMatcher: function(tags) {
    return function(q, cb) {
      var matches;
      matches = [];
      tags.forEach(function(tag) {
        if (tag.resource.name.indexOf(q) >= 0) {
          matches.push({name: tag.resource.name});
        }
      });
      cb(matches);
    };
  },
  render: function() {
    return (
        <div>
            <Input id={this.state.id} ref="tagselect" type="text" onChange={this.valueChanged} label={this.props.label}/>
        </div>
    );
  }
});
