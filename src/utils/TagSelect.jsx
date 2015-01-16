var React = require('react');
var Input = require('react-bootstrap/Input');
var _     = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tags: this.props.tags != null ? this.props.tags : []
    };
  },
  componentDidMount: function() {
    if (this.state.tags.length === 0) {
      $.get("/user/metadata/tags?where=skillName like \"%25\"", (function(result) {
        var tags;
        if ((result != null) && result.length > 0) {
          console.debug("result is object: " + _.isObject(result));
          tags = _.isObject(result) ? result : JSON.parse(result);
          this.setState({ tags: tags });
          this.activateTypeahead();
        } else {
          this.setState({ tags: [] });
        }

      }).bind(this));
    } else {
      this.activateTypeahead();
    }
  },
  activateTypeahead: function() {
    var self = this;
    $(this.refs.tagselect.getDOMNode()).typeahead({ hint: true, highlight: true, minLenght: 1 }, {
      name: "tag" + this.state.id,
      displayKey: "name",
      source: this.substringMatcher(this.state.tags)
    });
    $(this.refs.tagselect.getDOMNode()).bind("typeahead:selected", (function(a, selected) {
      self.valueChanged({target: {value: selected.name}});
    }));
  },
  valueChanged: function(event) {
    if (this.props.valueChanged != null) {
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
          <Input ref="tagselect" type="text" value={this.props.value} onChange={this.valueChanged} label={this.props.label}/>
        </div>
    );
  }
});
