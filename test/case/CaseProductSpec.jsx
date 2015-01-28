/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var CaseProduct             = require('../../cjs/case/CaseProduct');

describe('CaseProduct', function () {
    it('Should display case product ', function () {
        var input={
            "caseNumber": 1090296,
            "subject": "Test Subject",
            "product": {
                "resource": {
                    "line": {
                        "resource": {
                            "name": "Test Product",
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
          <CaseProduct case={input} key='product'></CaseProduct>
        );
       assert.ok(instance.getDOMNode().innerText.match("Test Product 7.0"));
    
    });
});