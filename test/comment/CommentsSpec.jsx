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
                        "text": "It seems working ok on limited testing:\n\nuid=1000(test) gid=1000(test) groups=1000(test) context=system_u:system_r:httpd_t:s0\n\nwhen running shell_exec('id') from PHP with mpm-itk and \"AssignUserID test test\" @ virtualhost definition. Need to do wider feature/load -testing but looks good so far.",
                        "createdBy": {
                            "resource": {
                                "fullName": "Mattila, Toni"
                            },
                            "resourceReliability": "Fresh"
                        },
                        "lastModifiedBy": {
                            "resource": {
                                "fullName": "Mattila, Toni"
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
                        "text": "Bug report changed to ON_QA status by Errata System.\nA QE request has been submitted for advisory RHBA-2014:18431-01\nhttps://errata.devel.redhat.com/advisory/18431",
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
                        "text": "Hi,\n\nSystem is RHEL 7 x86_64.",
                        "createdBy": {
                            "resource": {
                                "fullName": "Mattila, Toni"
                            },
                            "resourceReliability": "Fresh"
                        },
                        "lastModifiedBy": {
                            "resource": {
                                "fullName": "Mattila, Toni"
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


      
       var stub=sinon.stub($, 'ajax').returns(comment);
        var instance = ReactTestUtils.renderIntoDocument(
            <Comments  caseNumber="1090296"></Comments>
        );
        
    done();
    });
});