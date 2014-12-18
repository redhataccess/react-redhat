/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var IconWithTooltip = require('../cjs/IconWithTooltip');

describe('IconWithTooltip', function () {
  //it('Should output a spacer with content', function () {
  //  var instance = ReactTestUtils.renderIntoDocument(
  //    <Well>
  //      <strong>Content</strong>
  //    </Well>
  //  );
  //  assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  //});

  it('Should have a spacer class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <IconWithTooltip
          iconName="fa fa-medkit"
          tooltipPrefix='Foo'
          tooltipText="Some Text">
      </IconWithTooltip>

  );
    assert.ok(instance.getDOMNode().className.match(/\bfa fa-medkit\b/));
  });

  //it('Should accept bsSize arguments', function () {
  //    var instance = ReactTestUtils.renderIntoDocument(
  //    <Spacer bsSize='small'></Spacer>
  //    );
  //    assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
  //  });

});