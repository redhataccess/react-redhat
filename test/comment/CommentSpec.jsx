/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Comment             = require('../../cjs/comment/Comment');

describe('Comment', function () {
    it('Should display comment ', function () {

        var commentResource=[
            {
                "resource": {
                    "text": "It seems working ok on limited testing.",
                    "createdBy": {
                        "resource": {
                            "fullName": "User, Test"
                        },
                        "resourceReliability": "Fresh"
                    },
                    "lastModifiedBy": {
                        "resource": {
                            "fullName": "User, Test"
                        },
                        "resourceReliability": "Fresh"
                    },
                    "created": "2014-09-15T11:30:44.000Z",
                    "lastModified": "2014-09-15T11:30:44.000Z",
                    "public": true,
                    "sbt": 21599
                },
                "resourceReliability": "Fresh",
                "externalModelId": "a0aA000000CZco6IAD"
            }];
        var comment=[];
        comment.resource=commentResource[0].resource;
       
      var instance = ReactTestUtils.renderIntoDocument(
          <Comment id="a0aA000000CZco6IAD" key="a0aA000000CZco6IAD" comment={comment}></Comment>
        );

        assert.ok(instance.getDOMNode().children[0].innerText.match("User, Test"));
        assert.ok(instance.getDOMNode().children[1].innerText.match("It seems working ok on limited testing"));
        
        
    
    });
});