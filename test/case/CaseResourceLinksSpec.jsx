/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseResourceLinks             = require('../../cjs/case/CaseResourceLinks');

describe('CaseResourceLinks', function () {
    it('Should display case resource links ', function () {
    var resourceLinks=[
            {
                "resource": {
                    "resourceId": 40231,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T14:02:21.000Z",
                    "resourceStatus": "Linked",
                    "title": "Test Resource Links"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 368162,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T11:08:53.000Z",
                    "resourceStatus": "Linked",
                    "title": "Test Resource Links 2"
                },
                "resourceReliability": "Fresh"
            },
            {
                "resource": {
                    "resourceId": 543221,
                    "resourceType": "KnowledgeBaseSolution",
                    "attached": "2014-05-06T14:02:26.000Z",
                    "resourceStatus": "Linked",
                    "title": "Test Resource Link 3"
                },
                "resourceReliability": "Fresh"
            }
        ];
       
      var instance = ReactTestUtils.renderIntoDocument(
          <CaseResourceLinks resourceLinks={resourceLinks}></CaseResourceLinks>
        );
        assert.ok(instance.getDOMNode().innerText.match("#TypeTitleStatus#TypeTitleStatus40231KnowledgeBaseSolutionTest Resource Links"));
    });
});