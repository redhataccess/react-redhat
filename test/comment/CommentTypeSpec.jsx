/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CommentType             = require('../../cjs/comment/CommentType');

describe('CommentType', function () {
    it('Should have comment type ', function () {
        var commentResource=[
            {
                "resource": {
                    "text": "It seems working ok on limited testing",
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
      var instance = ReactTestUtils.renderIntoDocument(
            <CommentType resource={commentResource} ></CommentType>
        );       
    });
});