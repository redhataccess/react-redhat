/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Spacer         = require('../cjs/Spacer');

describe('Spacer', function () {
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
      <Spacer className='spacer'></Spacer>
    );
    assert.ok(instance.getDOMNode().className.match(/\bspacer\b/));
  });

  //it('Should accept bsSize arguments', function () {
  //    var instance = ReactTestUtils.renderIntoDocument(
  //    <Spacer bsSize='small'></Spacer>
  //    );
  //    assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
  //  });

});