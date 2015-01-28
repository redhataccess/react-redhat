/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseSummary             = require('../../cjs/case/CaseSummary');

describe('CaseSummary', function () {
    it('Should display case summary ', function () {

       
      var instance = ReactTestUtils.renderIntoDocument(
          <CaseSummary summary="Test Summary"></CaseSummary>
        );

        assert.ok(instance.getDOMNode().children[0].children[0].innerText.match("Internal Summary"));
        assert.ok(instance.getDOMNode().children[0].children[1].innerText.match("Test Summary"));
    
    });
});