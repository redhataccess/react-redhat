/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Role            = require('../../cjs/user/Role');

describe('Role', function () {
    //beforeEach(function() {
    //    sinon.stub($, 'get').yieldsTo('success', {
    //        count: '100',
    //        message: 'oh boy, 100 pickles!'
    //    });
    //});
    afterEach(function() {
        $.ajax.restore();
    });
    //it('Should be wrapped in a span', function () {
    //    var role = {
    //        "resource": {
    //            "name": "unified-sbr-coach-primary",
    //            "description": "Primary SBR Coach",
    //            "sbrs": [
    //                "Web Services"
    //            ]
    //        },
    //        "resourceReliability": "Fresh",
    //        "externalModelId": 21
    //    };
    //    var userId = 'XCD55401';
    //
    //    var instance = ReactTestUtils.renderIntoDocument(
    //        <Role role={role} userId={userId}></Role>
    //    );
    //    assert.equal(instance.getDOMNode().nodeName, 'SPAN');
    //});
    it('No ajax call', function (done) {
        sinon.stub($, 'ajax');
        var role = {
            "resource": {
                "name": "unified-sbr-coach-primary",
                "description": "Primary SBR Coach",
                "sbrs": [
                    "Web Services"
                ]
            },
            "resourceReliability": "Fresh",
            "externalModelId": 21
        };
        var userId = 'XCD55401';

        var instance = ReactTestUtils.renderIntoDocument(
            <Role role={role} userId={userId}></Role>
        );
        assert.equal(instance.getDOMNode().nodeName, 'SPAN');
        assert.equal($.ajax.calledOnce, false);
        //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        //assert.equal(instance.props.timezone, 'New York');
        done();
    });
    it('Should call ajax for parentResource', function (done) {
        var stubbedUserResponse = [
            {
                "resource": {
                    "fullName": "Some Manager"
                },
                "resourceReliability": "Fresh",
                "externalModelId": "012345679abcdefghi"
            }
        ];
        sinon.stub($, 'ajax').yieldsTo('success', stubbedUserResponse);
        var role = {
            "resource": {
                "name": "unified-ssme",
                "description": "Senior Software Maintenance Engineer",
                "parentUser": {
                    "resourceReliability": "Fresh",
                    "externalModelId": "ABC123"
                },
                "parentRole": {
                    "resource": {
                        "name": "unified-manager",
                        "description": "People Manager"
                    },
                    "resourceReliability": "Fresh",
                    "externalModelId": 27
                },
                "superRegion": "NA"
            },
            "resourceReliability": "Fresh",
            "externalModelId": 34
        };
        var userId = 'XCD55401';

        var instance = ReactTestUtils.renderIntoDocument(
            <Role role={role} userId={userId}></Role>
        );
        assert.equal(instance.getDOMNode().nodeName, 'SPAN');
        assert($.ajax.calledWithMatch({ url: "/user/ABC123" }));
        //assert.equal($.ajax.calledOnce, true);
        //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        //assert.equal(instance.props.timezone, 'New York');
        done();
    });
    //it('Should be wrapped in a span', function (done) {
    //    var roles = [
    //        {
    //            "resource": {
    //                "name": "unified-sbr-coach-primary",
    //                "description": "Primary SBR Coach",
    //                "sbrs": [
    //                    "Web Services"
    //                ]
    //            },
    //            "resourceReliability": "Fresh",
    //            "externalModelId": 21
    //        },
    //        {
    //            "resource": {
    //                "name": "unified-sbr-coach-primary",
    //                "description": "Primary SBR Coach",
    //                "sbrs": [
    //                    "Web Services"
    //                ],
    //                "superRegion": "EMEA"
    //            },
    //            "resourceReliability": "Fresh",
    //            "externalModelId": 21
    //        },
    //        {
    //            "resource": {
    //                "name": "unified-ssme",
    //                "description": "Senior Software Maintenance Engineer",
    //                "parentUser": {
    //                    "resourceReliability": "Fresh",
    //                    "externalModelId": "000123"
    //                },
    //                "parentRole": {
    //                    "resource": {
    //                        "name": "unified-manager",
    //                        "description": "People Manager"
    //                    },
    //                    "resourceReliability": "Fresh",
    //                    "externalModelId": 27
    //                },
    //                "superRegion": "NA"
    //            },
    //            "resourceReliability": "Fresh",
    //            "externalModelId": 34
    //        }
    //    ];
    //    var role;
    //
    //    var instance = ReactTestUtils.renderIntoDocument(
    //        <Role role={} user={}></Role>
    //    );
    //    assert.equal(instance.getDOMNode().nodeName, 'SPAN');
    //    assert.equal($.ajax.calledOnce, true);
    //    //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
    //    //assert.equal(instance.props.timezone, 'New York');
    //    done();
    //});
});
