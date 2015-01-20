/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Comments             = require('../../cjs/comment/Comments');

describe('Comments', function () {
    afterEach(function() {
        $.ajax.restore();
    });
    
    it('Test stub ajax call ', function (done) {
       
        var comment=
            [
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
                },
                {
                    "resource": {
                        "text": "Bug report changed to ON_QA status ",
                        "createdBy": {
                            "resource": {
                                "fullName": "Unknown"
                            },
                            "resourceReliability": "Fresh"
                        },
                        "lastModifiedBy": {
                            "resource": {
                                "fullName": "Unknown"
                            },
                            "resourceReliability": "Fresh"
                        },
                        "created": "2014-09-19T07:53:27.000Z",
                        "lastModified": "2014-09-19T07:53:27.000Z",
                        "public": false,
                        "sbt": 16057
                    },
                    "resourceReliability": "Fresh",
                    "externalModelId": "a0aA000000CaGzzIAF"
                },
                {
                    "resource": {
                        "text": "Hi,\n\nSystem is good.",
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
                        "created": "2014-09-09T12:17:37.000Z",
                        "lastModified": "2014-09-09T12:20:24.000Z",
                        "public": true,
                        "sbt": 21600
                    },
                    "resourceReliability": "Fresh",
                    "externalModelId": "a0aA000000CYxPWIA1"
                }
            ];


      
       var callBack=sinon.stub($, 'ajax').returns(comment);
        
        
        var instance = ReactTestUtils.renderIntoDocument(
            <Comments  caseNumber="1090296"></Comments>
        );
        
    done();
    });
});