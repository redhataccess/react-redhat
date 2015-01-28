/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseIssueLinks             = require('../../cjs/case/CaseIssueLinks');

describe('CaseIssueLinks', function () {
    it('Should display case issue links ', function () {

        var issueLinks=[
                {
                    "resource": {
                        "issueNumber": "10591431",
                        "source": "Bugzilla",
                        "summary": "Test Feature 1",
                        "description": "Test Description"
                    },
                    "resourceReliability": "Fresh"
                }
            ];
       
      var instance = ReactTestUtils.renderIntoDocument(
          <CaseIssueLinks issueLinks={issueLinks}></CaseIssueLinks>
        );

        assert.ok(instance.getDOMNode().innerText.match("#TypeTitleSummary"));
    
    });
});