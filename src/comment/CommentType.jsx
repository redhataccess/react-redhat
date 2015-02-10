var React       = require('react');

var Label = require('react-bootstrap/Label');
var moment = require('moment')


var Component = React.createClass({
    displayStyle: function() {
        if(this.props.resource) {
            if (this.props.resource.questionSets) {
                return ['info', 'Content Review'];
            } else if (this.props.resource.public) {
                return ['success', 'Public'];
            } else if (!this.props.resource.public) {
                return ['danger', 'Private'];
            } else if (this.props.resource.subject && this.props.resource.body) {
                return ['warning', 'Account Note'];
            } else {
                return ['default', 'Unknown Update'];
            }
        }
        
    },
    render: function() {
            if(this.props.resource) {
                var [style,text] = this.displayStyle();
                return (
                    <Label bsStyle={style}>
                    {text}
                    </Label>
                )
            }else{
                return null;
            }

    }
});

module.exports = Component;
