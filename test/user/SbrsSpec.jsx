/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Sbrs            = require('../../cjs/user/Sbrs');

describe('Sbrs', function () {
    it('Should be wrapped in a span', function () {
        var sbrs = [];

        var instance = ReactTestUtils.renderIntoDocument(
            <Sbrs sbrs={sbrs}></Sbrs>
        );
        assert.equal(instance.getDOMNode().nodeName, 'SPAN');
        //assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        //assert.equal(instance.props.timezone, 'New York');

    });
    it('Should contain Webservers', function () {
        var sbrs = ["JVM & Diagnostics", "JBoss Base AS", "Webservers"];
        var instance = ReactTestUtils.renderIntoDocument(
            <Sbrs sbrs={sbrs}></Sbrs>
        );
        assert.equal(instance.getDOMNode().nodeName, 'SPAN');
        assert.lengthOf(instance.getDOMNode().childNodes, 3);
        assert.include(instance.getDOMNode().childNodes[2].innerText, 'Webservers');
    });
});
