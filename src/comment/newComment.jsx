var React                 = require('react');
var cx                    = React.addons.classSet;
var _                     = require('lodash');
var strata                = require('stratajs');
var Spacer                = require('react-redhat/Spacer');

// React Bootstrap imports
var Label                 = require('react-bootstrap/Label');
var Modal                 = require('react-bootstrap/Modal');
var Button                = require('react-bootstrap/Button');
var Input                 = require('react-bootstrap/Input');
var DropdownButton        = require('react-bootstrap/DropdownButton');
var MenuItem              = require('react-bootstrap/MenuItem');
var Accordion             = require('react-bootstrap/Accordion');
var Panel                 = require('react-bootstrap/Panel');
var Alert                 = require('react-bootstrap/Alert');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      isSaving: false,
      comment: this.props.comment
    };
  },
  componentWillUnmount: function() {
    this.props.setComment(this.state.comment);
  },
  getDefaultValue: function(component) {
    var items = _.filter(this.state.comment, (item) => item.name === component );
    if ((items != null) && items.length > 0) {
      return items.pop().value;
    }
  },
  toggleCommentType: function() {
    var items = _.filter(this.state.comment, (item) => item.name !== 'public' );
    this.setState({
      comment: _.union(items, [
        {
          'name': 'public',
          'value': !this.getDefaultValue('public')
        }
      ])
    });
  },
  updateStatus: function(newStatus) {
    var items = _.filter(this.state.comment, (item) => item.name !== 'status' && item.name !== 'internalStatus');
    var status, intStatus;
    switch(newStatus) {
      case "woc":
        status = "Waiting on Customer";
        intStatus = "Waiting on Customer";
        break;
      case "worh":
        status = "Waiting on Red Hat";
        intStatus = "Waiting on Owner";
        break;
      case "wocon":
        status = "Waiting on Red Hat";
        intStatus = "Waiting on Contributor";
        break;
      case "closed":
        status = "Closed";
        intStatus = "Closed";
        break;
      default:
        console.debug("No status found, setting to WoRH/WoO");
        status = "Waiting on Red Hat";
        intStatus = "Waiting on Owner";
        break;
    };
    this.setState({
      comment: _.union(items, [
        {
          'name': 'status',
          'value': status
        }, {
          'name': 'internalStatus',
          'value': intStatus
        }
      ])
    });
  },
  submitNewComment: function() {
    var newComment, newStatus, comment, commentType, self, url, self = this;
    this.setState({isSaving: true});
    commentType = self.getDefaultValue('public') ? 'public' : 'private';
    url = "" + this.props.url + "/" + commentType;
    comment = $(self.refs['comment'].getDOMNode()).children('textarea').val().trim();
    // https://github.com/redhataccess/redhat_access_angular_ui/blob/master/app/common/services/strataService.js
    newComment = {
      'text': $(self.refs['comment'].getDOMNode()).children('textarea').val().trim(),
      'public': self.getDefaultValue('public') ? "true" : "false",
      'draft': "false"
    };
    newStatus = {
      'status': self.getDefaultValue('status'),
      'internalStatus': self.getDefaultValue('internalStatus')
    };
    var errFunc = (err) => console.error(err.stack || err);
    // TODO -- Q'ify this to prevent waterfall
    // strata.cases.comments.post(this.props.caseNumber, newComment, (response) => {
    //   console.debug(JSON.stringify(response));
    //   strata.cases.put(this.props.caseNumber, newStatus, (response) => {
    //     console.debug(JSON.stringify(response));
    //   }, errFunc)
    // }, errFunc)

    $.ajax({
      url: url,
      type: 'POST',
      xhrFields: {'withCredentials': true},
      data: JSON.stringify(comment),
      contentType: "application/json; charset=utf-8",
      error: (function(jqXHR, textStatus, errorThrown) {
        console.error("Error submitting a new comment." + (errorThrown.stack || errorThrown));
        self.hide();
        // return self.props.showDangerAlert("Cannot submit comment. You most probably need to login to http://gss.my.salesforce.com");
      }).bind(this),
      success: (function(result, textStatus, jqXHR) {
        console.log("Comment saved: " + result + " updating status.");
        strata.cases.put(this.props.caseNumber, newStatus, (response) => {
          console.debug(JSON.stringify(response));
        }, errFunc)
        self.setState({
          isSaving: false,
          comment: _.filter(this.state.comment, function(item) {
            return item.name === 'status' || item.name === 'internalStatus' || item.name === 'public';
          })
        });
        // self.props.onRequestHide();
        // self.props.showSuccessAlert("Comment submitted successfully");
        // TODO 
        // return self.props.refreshParentComponent();
      }).bind(this)
    });
    return false;
  },
  hide: function() {
    var items, textAreas;
    textAreas = _.filter(_.map($(this.getDOMNode()).find('textarea'), function(textarea) {
      if (textarea.value.trim() !== '') {
        return {
          'name': textarea.id,
          'value': textarea.value
        };
      }
    }), function(item) {
      return item != null;
    });
    items = _.filter(this.state.comment, (item) => item.name === 'status' || item.name === 'internalStatus' || item.name === 'public');
    this.setState({'comment': _.union(items, textAreas)});
    // return this.props.onRequestHide();
  },
  render: function() {
    var commentStyle, self, statusStyle, textareaStyle;
    self = this;
    commentStyle = self.getDefaultValue("public") ? 'success' : 'danger';
    statusStyle = 'success';
    if (self.getDefaultValue("status") === 'Waiting on Customer') {
      statusStyle = 'info';
    } else if (self.getDefaultValue("status") === 'Waiting on Red Hat') {
      statusStyle = 'warning';
    }

    textareaStyle = cx({private: !this.getDefaultValue("public")});
    // var caseStatus = <CaseStatus status={this.getDefaultValue("status")} internalStatus={this.getDefaultValue("internalStatus")}></CaseStatus>;
    // var caseStatus = this.getDefaultValue("status") + " / " + this.getDefaultValue("internalStatus");
    {/*<MenuItem onSelect={this.updateStatus} key="wocon" eventKey="wocon">Waiting on Contributor</MenuItem>*/}
    var caseStatus = this.getDefaultValue("internalStatus");
    return (
      <Accordion>
        <Panel eventKey="newComment" key="newComment" header="New Comment" collapsable={true}  defaultExpanded={false}>
          <form onSubmit={this.submitNewComment}>
            <div className="pull-left">
              <DropdownButton pullRight={true} disabled={false} title={caseStatus}>
                <MenuItem onSelect={this.updateStatus} key="woc" eventKey="woc">Waiting on Customer</MenuItem>
                <MenuItem onSelect={this.updateStatus} key="worh" eventKey="worh">Waiting on Owner</MenuItem>
                {/*We can't set this in strata yet.*/}
                <MenuItem onSelect={this.updateStatus} key="wocon" eventKey="wocon">Waiting on Contributor</MenuItem>
                <MenuItem onSelect={this.updateStatus} key="closed" eventKey="closed">Closed</MenuItem>
              </DropdownButton>
            </div>
            <div className="pull-right">
              <Button bsSize="small" onClick={this.toggleCommentType} bsStyle={commentStyle}>
              {this.getDefaultValue("public") ? "Public" : "Private"}
              </Button>
            </div>
            <br />
            <br />
            <br />
            <Input type="textarea" ref="comment" className={textareaStyle} rows={10} defaultValue={this.getDefaultValue("comment")}/>
            <Spacer />
            <div>
              <div className="pull-left">
                <Alert bsStyle="warning">Adding a comment and updating the status <b>does work</b> but it will take 2 mins for the UDS cache to be invalidated and the comment to show up.  This is a work in progress.</Alert>
              </div>
              <div className="pull-right">
                <Button type="submit" disabled={this.state.isSaving}>Submit</Button>
              </div>
            </div>
          </form>
        </Panel>
      </Accordion>
    );
  }
});