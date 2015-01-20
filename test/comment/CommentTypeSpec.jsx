/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CommentType             = require('../../cjs/comment/CommentType');

describe('CommentType', function () {
    it('Should have test summary and header as Internal summary test ', function () {
      var testSummary='Test';
      var instance = ReactTestUtils.renderIntoDocument(
            <CommentType summary={testSummary} ></CommentType>
        );
        assert.equal(instance.props.summary,"Test");
        assert.equal(instance.getDOMNode().innerText,"Internal SummaryTest");
    });
});