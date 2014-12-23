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

                  <h3 id="sbrs">Sbrs</h3>
                  <p>Display the Sbrs of a User or Resource</p>
                  <ReactPlayground codeText={fs.readFileSync(__dirname + '/../examples/user/Sbrs.js', 'utf8')} />

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
                    <SubNav href="#users" key={1} text="Users">
                      <NavItem href="#geo" key={2}>Geo</NavItem>
                      <NavItem href="#timezone" key={3}>Timezone</NavItem>
                      <NavItem href="#sbrs" key={4}>Sbrs</NavItem>
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