/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Timezone        = require('../../cjs/user/Timezone');

describe('Timezone', function () {
    it('Should have an info class and timezone New York', function () {
        var timezone = 'New York';
        var instance = ReactTestUtils.renderIntoDocument(
            <Timezone timezone={timezone}></Timezone>
        );
        assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        assert.equal(instance.props.timezone, 'New York');

    });
});
