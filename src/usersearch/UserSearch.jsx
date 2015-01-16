var React               = require('react');
var _                   = require('lodash');
var SbrsSelect          = require('./SbrsSelect');
var RegionSelect        = require('./RegionSelect');
var TimezoneSelect      = require('./TimezoneSelect');
var ThreeStateCheckbox  = require('../utils/ThreeStateCheckbox');
var TagSelect           = require('../utils/TagSelect');
var UserSearchResult    = require('./UserSearchResult');
var UdsMixin            = require('../utils/UdsMixin');

var Panel   = require('react-bootstrap/Panel');
var Input   = require('react-bootstrap/Input');
var Grid    = require('react-bootstrap/Grid');
var Row     = require('react-bootstrap/Row');
var Col     = require('react-bootstrap/Col');
var Button  = require('react-bootstrap/Button');
var Glyph   = require('react-bootstrap/Glyphicon');

var Spinner = require('../utils/Spinner');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin, UdsMixin],
  getInitialState: function() {
    return {
      name: "",
      email: "",
      kerberos: "",
      region: "",
      timezone: "",
      title: "",
      sbrs: [],
      ingss: null,
      manager: null,
      active: null,
      skills: [],
      tags: [],
      uql: null,
      users: null,
      isQuerying: false
    };
  },
  componentDidMount: function() {
    var self = this;
    this.loadTags().done(function(tags) {
      self.setState({tags: tags});
    }, function (err) {
      console.error(err.stack)
    });
  },
  genLinkStateCol: function(opts) {
    return (
      <Col xs={6} md={3}>
        <Input type="text" valueLink={this.linkState(opts.name)} label={opts.label} />
      </Col>
    )
  },
  handleStateChange: function(fieldName) {
    return (function(state) {
      console.debug(`${fieldName} updated to ${state}`);
      var hash = {};
      hash[fieldName] = state;
      this.setState(hash);
    }).bind(this);
  },
  genHandleValueChangedCol: function(opts) {
    var Component = null;
    if (opts.type == "region") {
      Component = RegionSelect;
    } else if (opts.type == "timezone") {
      Component = TimezoneSelect;
    } else if (opts.type == "sbr") {
      Component = SbrsSelect;
    } else {
      throw Error(`Please pass in a valid component type, ${opts.type} is not valid`)
    }
    return (
        <Col xs={opts.xs || 6} md={opts.md || 3}>
          <Component valueChanged={this.handleStateChange(opts.name)} label={opts.label}></Component>
        </Col>
    )
  },
  genHandleStateChangedCol: function(opts) {
    return (
        <Col xs={4} md={2}>
          <ThreeStateCheckbox label={opts.label} stateChanged={this.handleStateChange(opts.name)}></ThreeStateCheckbox>
        </Col>
    )
  },
  genSkillRows: function() {
    var self = this;
    return _.map(this.state.skills, (skill) => {
      return (
          <Row>
            <Col xs={4} md={3}>
              <TagSelect
                  label="Skill"
                  value={skill.name}
                  valueChanged={self.handleSkillNameChange.bind(this, skill)}
                  tags={self.state.tags}>
              </TagSelect>
            </Col>
          </Row>
      )
    })
  },
  _makeLikeCond: function(fieldName, fieldValue) {
    return `${fieldName} like "%${fieldValue}%"`
  },
  createQuery: function() {
    var criterias;
    criterias = [
        this.state.name.trim().length > 0 ? this._makeLikeCond("fullName", this.state.name) : null,
        this.state.region.trim().length > 0 ? this._makeLikeCond("superRegion", this.state.region) : null,
        this.state.email.trim().length > 0 ? this._makeLikeCond("email", this.state.email) : null,
        this.state.timezone.trim().length > 0 ? this._makeLikeCond("timezone", this.state.timezone) : null,
        this.state.title.trim().length > 0 ? this._makeLikeCond("title", this.state.title) : null,
        this.state.kerberos.trim().length > 0 ? `(${this._makeLikeCond("kerberos", this.state.kerberos)} or ${this._makeLikeCond("SSO", this.state.kerberos)})` : null,
        (this.state.sbrs && this.state.sbrs.length > 0) ? this.state.sbrs.map((sbr) => "sbrName is \"" + sbr + "\"").reduce((left, right) => left + " and " + right) : null,
        this.translateSkills()
    ];
    criterias = criterias.filter((x) => x != null);
    return criterias.length > 0 ? criterias.reduce((left, right) => left + " and " + right) : ""
  },
  //handleEvent: function(fieldName) {
  //  return (function(event) {
  //    var hash;
  //    hash = {};
  //    hash[fieldName] = event.target.value;
  //    this.setState(hash);
  //  }).bind(this);
  //},
  //handleSkillStateChange: function(index, fieldName) {
  //  return (function(event) {
  //    var skills;
  //    skills = this.state.skills;
  //    skills[index][fieldName] = event.target.value;
  //    return this.setState({
  //      skills: skills
  //    });
  //  }).bind(this);
  //},
  handleSkillNameChange: function(skill) {
    var skills = this.state.skills;
    var skillIdx = _.findIndex(this.state.skills, (s) => s.name == skill.name);
    if (skillIdx != -1) {
      skills[skillIdx].name = skill.name;
      this.setState({
        skills: skills
      });
    }
  },
  addSkill: function() {
    var skills;
    skills = this.state.skills;
    skills.push({
      name: "",
      operator: ">=",
      level: "0"
    });
    return this.setState({
      skills: skills
    });
  },
  removeSkill: function(index) {
    return (function() {
      var skills;
      skills = this.state.skills;
      skills.splice(index, 1);
      console.log(skills);
      return this.setState({
        skills: skills
      });
    }).bind(this);
  },
  translateSkills: function() {
    var skills;
    skills = this.state.skills.filter(function(skill) {
      return skill.name.length > 0;
    });
    if (skills.length > 0) {
      return skills.map(function(skill) {
        return "skillName is \"" + skill.name + "\" and skillLevel " + skill.operator + " " + skill.level;
      }).reduce(function(left, right) {
        return left + " and " + right;
      });
    } else {
      return null;
    }
  },
//href={`#UserSearch/${encodeURIComponent(this.createQuery())}`}
  submitForm: function (e) {
    var self = this;
    e.stopPropagation();
    e.preventDefault();
    this.setState({isQuerying: true});
    this.queryUsers({query: this.createQuery()}).done(function(users){
      self.setState({users: users, isQuerying: false});
    }, function(err){
      console.error(err.stack);
      self.setState({isQuerying: false});
    });
  },
  genSearchResults: function () {
    if (this.state.isQuerying == true) {
      return <Spinner spinnerName="wave" cssRequire={false}></Spinner>
    } else {
      return <UserSearchResult users={this.state.users}></UserSearchResult>
    }
  },
  render: function() {
    var header = (
        <span>
          <Button
              bsStyle="primary"
              style={{color: '#fff'}}
              className="pull-right"
              onClick={this.submitForm.bind(this)}
              disabled={this.createQuery().length == 0}>
            <Glyph glyph="search">&nbsp;Search</Glyph>
          </Button>
          <h4>Search Users</h4>
        </span>
    );
    {/*this.genSkillRows()*/}
    return (
        <Grid>
            <Row>
              <Panel header={header}>
                <Grid style={{width: "100%"}}>
                  <Row>
                {this.genLinkStateCol({name: "name", label: "Name"})}
                {this.genLinkStateCol({name: "email", label: "Email"})}
                {this.genLinkStateCol({name: "kerberos", label: "kerberos"})}
                {this.genLinkStateCol({name: "title", label: "Title"})}
                {this.genHandleValueChangedCol({type: "region", name: "region", label: "Region"})}
                {this.genHandleValueChangedCol({type: "timezone", name: "timezone", label: "Timezone"})}
                {this.genHandleValueChangedCol({type: "sbr", name: "sbrs", label: "Sbrs"})}
                  </Row>
                  <Row>
                {this.genHandleStateChangedCol({name: "ingss", label: "is in gss"})}
                {this.genHandleStateChangedCol({name: "active", label: "is active"})}
                {this.genHandleStateChangedCol({name: "manager", label: "is manager"})}
                  </Row>
                </Grid>
                <Panel style={{marginTop: "20px"}} header={<h3>Filter by skills</h3>}>
                  <Grid style={{width: "100%"}}>
                  </Grid>
                </Panel>
              </Panel>
            </Row>
            <Row>
                {this.genSearchResults()}
            </Row>
        </Grid>
    )
  }
});
