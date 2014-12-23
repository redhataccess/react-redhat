/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Role            = require('../../cjs/user/Role');

describe('Role', function () {
    afterEach(function() {
        $.ajax.restore();
    });
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
        assert.equal(instance.getDOMNode().nodeName, 'DIV');
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
        assert.equal(instance.getDOMNode().nodeName, 'DIV');
        assert($.ajax.calledWithMatch({ url: "/user/ABC123" }));
        //assert.equal($.ajax.calledOnce, true);
        //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        //assert.equal(instance.props.timezone, 'New York');
        done();
    });
    it('Should be wrapped in a div', function (done) {
        sinon.stub($, 'ajax');
        var roles = [
            {
                "resource": {
                    "name": "unified-sbr-coach-primary",
                    "description": "Primary SBR Coach",
                    "sbrs": [
                        "Web Services"
                    ]
                },
                "resourceReliability": "Fresh",
                "externalModelId": 21
            },
            {
                "resource": {
                    "name": "unified-sbr-coach-primary",
                    "description": "Primary SBR Coach",
                    "sbrs": [
                        "Web Services"
                    ],
                    "superRegion": "EMEA"
                },
                "resourceReliability": "Fresh",
                "externalModelId": 21
            }
        ];

        var instance = ReactTestUtils.renderIntoDocument(
            <Role role={roles[1]} userId='ABC123'></Role>
        );
        assert.equal(instance.getDOMNode().nodeName, 'DIV');
        assert.equal(instance.getDOMNode().children[0].nodeName, 'SPAN');
        //assert.equal(instance.getDOMNode().children[1].children.length, 3);
        //assert.equal(instance.getDOMNode().children[1].children[0].innerText, 'Primary SBR Coach');
        //assert.equal(instance.getDOMNode().children[1].children[1].innerText, 'EMEA');
        //assert.include(instance.getDOMNode().children[1].children[2].innerText, 'Web Services');
        assert.equal($.ajax.calledOnce, false);
        //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        //assert.equal(instance.props.timezone, 'New York');
        done();
    });
});
