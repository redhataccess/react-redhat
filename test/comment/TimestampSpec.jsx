/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Timestamp             = require('../../cjs/comment/Timestamp');

describe('Timestamp', function () {
    it('Should have a default class and test text', function () {
        var text = 'test';
        var instance = ReactTestUtils.renderIntoDocument(
            <Timestamp text={text}></Timestamp>
        );
        assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        assert.equal(instance.props.text, 'test');
    });
});