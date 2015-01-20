/*global describe, beforeEach, afterEach, it, assert */

var React           = require('react');
var ReactTestUtils  = require('react/lib/ReactTestUtils');
var SlaAttainment             = require('../../cjs/comment/SlaAttainment');

describe('SlaAttainment', function () {
    it('Should have a default class and 20% sla', function () {
        var allSla = '100';
        var negativeSla='80';

        var instance = ReactTestUtils.renderIntoDocument(
            <SlaAttainment negative={negativeSla} all={allSla}></SlaAttainment>
        );
        assert.ok(instance.getDOMNode().className.match(/\bdefault\b/));
        assert.equal(instance.getDOMNode().children[0].innerText,"Comment SLA Attainment");
        assert.equal(instance.getDOMNode().children[1].innerText," 20%");
    });
});