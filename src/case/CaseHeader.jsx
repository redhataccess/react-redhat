var React       = require('react');
var S           = require('string');
var CaseProduct = require('./CaseProduct');
var Well        = require('react-bootstrap/Well');

var Component = React.createClass({
    render: function() {
        var caseNumber = S(this.props.case.caseNumber).padLeft(8, '0').s;
        return (
            <Well key='caseHeader'>
                <div>
                    <div className='pull-left'>
                        <h2 key='header'>{`Case ${caseNumber}`}</h2>
                    </div>
                    <div className='pull-right'>
                        <CaseProduct case={this.props.case} key='product'></CaseProduct>
                    </div>
                </div>
                <div className='clearfix'></div>
                <span key='headerSubject'>{this.props.case.subject}</span>
            </Well>
        )
    }
});

module.exports = Component;
