'use strict';

// load libraries and application variables
var config = require('../../config.js'),
    logger = require('log4js').getLogger(),
    chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    expression = require('../../apps/consumer/expression.js'),
    consumer = require('../../apps/consumer/consumer.js');
    
chai.should();
chai.use(sinonChai);

// The following tests are grouped under the context of the Consumer
describe('Consumer', function(){
    
    // unit test to confirm the expression parser is correctly parsing a valid expression
    describe('expression.parse()', function(){
        it('Should callback with a 3-attribute object', function(){
            var cb = sinon.spy();
            expression.parse('2+3=', cb);
            cb.should.have.been.calledWith(null, {
                'first': 2,
                'operator': '+',
                'second': 3
            });
        });
    });
    
    // unit test to confirm the expression evaluator is calculating the correct answer
    describe('expression.evaluate()', function(){
        it('Should callback with the answer: 5', function(){
            var cb = sinon.spy();
            expression.evaluate(2, '+', 3, cb);
            cb.should.have.been.calledWith(null, 5);
        });
    });
    
    // unit test to confirm the consumer is listening
    describe('consumer.listen()', function(){
        it('Consumer should report that it is listening on the configured port', function(done){
            var spy = sinon.spy(consumer, 'listen');
            consumer.listen();
            expect(spy).to.not.have.thrown();
            consumer.close();
            done();
        });
    });
    
});