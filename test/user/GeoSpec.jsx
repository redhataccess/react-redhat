/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var Geo             = require('../../cjs/user/Geo');

describe('Geo', function () {
    it('Should have an info class and NA geo', function () {
        var geo = 'NA';
        var instance = ReactTestUtils.renderIntoDocument(
            <Geo geo={geo}></Geo>
        );
        assert.ok(instance.getDOMNode().className.match(/\binfo\b/));
        // instance is undefined/instance.firstChild is undefined here
        assert.equal(instance.props.geo, 'NA');
    });
});