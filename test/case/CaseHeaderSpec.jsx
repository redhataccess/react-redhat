/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseHeader             = require('../../cjs/case/CaseHeader');

describe('CaseHeader', function () {
    it('Should display case header ', function () {
        var input={
                "caseNumber": 1090296,

                "subject": "Test Subject",


                "product": {
                    "resource": {
                        "line": {
                            "resource": {
                                "name": "Red Hat Enterprise Linux",
                                "family": "PLATFORM"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 265
                        },
                        "version": {
                            "resource": {
                                "name": "7.0"
                            },
                            "resourceReliability": "Fresh",
                            "externalModelId": 11848
                        }
                    },
                    "resourceReliability": "Fresh"
                }

            };





        var instance = ReactTestUtils.renderIntoDocument(
            <CaseHeader case={input} key='caseHeader'></CaseHeader>
        );

        assert.ok(instance.getDOMNode().innerText.match("Red Hat Enterprise Linux 7.0Test Subject"));

    
    });
});