'use strict';

var React = require('react');
var fs = require('fs');

var Affix = require('react-bootstrap/Affix');
var Nav = require('react-bootstrap/Nav');
var SubNav = require('react-bootstrap/SubNav');
var NavItem = require('react-bootstrap/NavItem');

var NavMain = require('./NavMain');
var PageHeader = require('./PageHeader');
var PageFooter = require('./PageFooter');
var ReactPlayground = require('./ReactPlayground');

var ComponentsPage = React.createClass({
  getInitialState: function () {
    return {
      activeNavItemHref: null,
      navOffsetTop: null
    };
  },

  handleNavItemSelect: function (key, href) {
    this.setState({
      activeNavItemHref: href
    });

    window.location = href;
  },

  componentDidMount: function () {
    var elem = this.refs.sideNav.getDOMNode(),
        domUtils = Affix.domUtils,
        sideNavOffsetTop = domUtils.getOffset(elem).top,
        sideNavMarginTop = parseInt(domUtils.getComputedStyles(elem.firstChild).marginTop, 10),
        topNavHeight = this.refs.topNav.getDOMNode().offsetHeight;

    this.setState({
      navOffsetTop: sideNavOffsetTop - topNavHeight - sideNavMarginTop,
      navOffsetBottom: this.refs.footer.getDOMNode().offsetHeight
    });
  },

  render: function () {
    return (
        <div>
          <NavMain activePage="components" ref="topNav" />

          <PageHeader
            title="Components"
            subTitle="" />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">

                {/* User */}
                <div className="bs-docs-section">
                  <h1 id="users" className="page-header">User</h1>
                  {/*<h2 id="buttons-options">Options</h2>*/}
                  <p>Pass any UDS compatible user via the <code>resource</code> prop.</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/user/User.js', 'utf8')} />
                  <div className="bs-callout bs-callout-warning">
                    <h4>UDS response</h4>
                    <p>Make sure that you pass the raw UDS object to <code>User</code>.  The actual user object
                    is contained withing the <code>response.resource</code> but there is other metadata required on
                    the main response object such as the <code>externalModelId</code>.
                    </p>
                  </div>

                  <h3 id="geo">Geo</h3>
                  <p>Display the Geo of a User or Resource</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/user/Geo.js', 'utf8')} />

                  <h3 id="timezone">Timezone</h3>
                  <p>Display the Timezone of a User or Resource</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/user/Timezone.js', 'utf8')} />

                  <h3 id="timezoneSelect">Timezone Select</h3>
                  <p>Select a Timezone</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/usersearch/TimezoneSelectExample.js', 'utf8')} />

                  <h3 id="sbrs">Sbrs</h3>
                  <p>Display the Sbrs of a User or Resource</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/user/Sbrs.js', 'utf8')} />

                  <h3 id="userSearch">User Search</h3>
                  <div className="bs-callout bs-callout-info">
                    <h4>End user application</h4>
                    <p>In your end user application you will need to <code>npm install select2 --save</code>
                    and <code>npm install typeahead.js --save</code>.   After you do this you can then require in the
                    code in your react component like so: <code>require('select2');</code> and <code>require('typeahead.js')</code>.
                    Remember to require in the css as well into your index or entry point for those two libraries.
                    </p>
                  </div>
                  <p>Search for current users</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/usersearch/UserSearchExample.js', 'utf8')} />

                </div>

                {/* Case */}
                <div className="bs-docs-section">
                  <h1 id="cases" className="page-header">Case Related Components</h1>

                  <h3 id="timestamp">Timestamp</h3>
                  <p>Displays the Timestamp</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/comment/Timestamp.js', 'utf8')} />

                  <h3 id="slaAttainment">SLA Attainment</h3>
                  <p>Displays the SLA attainment</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/comment/SlaAttainment.js', 'utf8')} />

                  <h3 id="commentType">Comment Type</h3>
                  <p>Displays the comment Type</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/comment/CommentType.js', 'utf8')} />

                  <h3 id="comment">Comment</h3>
                  <p>Displays one comment</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/comment/Comment.js', 'utf8')} />

                  <h3 id="comments">Comments</h3>
                  <p>Displays all the comments</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/comment/Comments.js', 'utf8')} />

                  <h3 id="caseSummary">Case Summary</h3>
                  <p>Displays the case summary</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseSummary.js', 'utf8')} />

                  <h3 id="caseDescription">Case Description</h3>
                  <p>Displays the case description</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseDescription.js', 'utf8')} />

                  <h3 id="caseResourceLinks">Case Resource Links</h3>
                  <p>Displays the case resource links</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseResourceLinks.js', 'utf8')} />

                  <h3 id="caseIssueLinks">Case Issue Links</h3>
                  <p>Displays the case issue links</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseIssueLinks.js', 'utf8')} />

                  <h3 id="caseProduct">Case Product</h3>
                  <p>Displays the case products</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseProduct.js', 'utf8')} />


                  <h3 id="caseHeader">Case Header</h3>
                  <p>Displays the case headers</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseHeader.js', 'utf8')} />

                  <h3 id="caseAssociates">Case Associates</h3>
                  <p>Displays the case associates</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/CaseAssociates.js', 'utf8')} />

                  <h3 id="case">Case</h3>
                  <p>Displays the cases</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/case/Case.js', 'utf8')} />
                </div>

              </div>

              <div className="col-md-3">
                <Affix
                  className="bs-docs-sidebar hidden-print"
                  role="complementary"
                  offsetTop={this.state.navOffsetTop}
                  offsetBottom={this.state.navOffsetBottom}>
                  <Nav
                    className="bs-docs-sidenav"
                    activeHref={this.state.activeNavItemHref}
                    onSelect={this.handleNavItemSelect}
                    ref="sideNav">
                    <SubNav href="#users" key="users" text="Users">
                      <NavItem href="#geo" key="geo">Geo</NavItem>
                      <NavItem href="#timezone" key="timezone">Timezone</NavItem>
                      <NavItem href="#timezoneSelect" key="timezoneSelect">Timezone Select</NavItem>
                      <NavItem href="#sbrs" key="sbrs">Sbrs</NavItem>
                      <NavItem href="#userSearch" key="userSearch">User Search</NavItem>
                    </SubNav>
                    <SubNav href="#cases" key="cases" text="Cases">
                      <NavItem href="#timestamp" key="timestamp">Timestamp</NavItem>
                      <NavItem href="#slaAttainment" key="slaAttainment">SLA Attainment</NavItem>
                      <NavItem href="#commentType" key="commentType">Comment Type</NavItem>
                      <NavItem href="#comment" key="comment">Comment</NavItem>
                      <NavItem href="#comments" key="comments">Comments</NavItem>
                    </SubNav>
                    {/*<NavItem href="#panels" key={5}>Panels</NavItem>*/}
                  </Nav>
                  <a className="back-to-top" href="#top">
                  Back to top
                  </a>
                </Affix>
              </div>
            </div>
          </div>

          <PageFooter ref="footer" />
        </div>
      );
  }
});

module.exports = ComponentsPage;
