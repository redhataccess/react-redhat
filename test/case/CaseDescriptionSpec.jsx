/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseDescription             = require('../../cjs/case/CaseDescription');

describe('CaseDescription', function () {
    it('Should display case description ', function () {

       
      var instance = ReactTestUtils.renderIntoDocument(
          <CaseDescription description="Test Description"></CaseDescription>
        );

        assert.ok(instance.getDOMNode().children[0].children[0].innerText.match("Customer Description"));
        assert.ok(instance.getDOMNode().children[0].children[1].innerText.match("Test Description"));
    
    });
});