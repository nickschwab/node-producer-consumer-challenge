'use strict';

// load libraries and application variables
var config = require('../../config.js'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    consumer = require('../../apps/consumer/consumer.js'),
    expression = require('../../apps/consumer/expression.js'),
    producer = require('../../apps/producer/producer.js');
    
chai.should();
chai.use(sinonChai);

// The following tests are grouped under the context of the Producer
describe('Producer', function(){
    
    beforeEach(function(callback){
        consumer.listen(function(){
            callback();
        });
    });
    
    // unit test to confirm the producer can create a random integer within the allotted window
    describe('producer.randomInt()', function(){
        it('Should return with a number between ' + config.min + ' and ' + config.max + ', inclusive.', function(){
            var rand = producer.randomInt();
            (rand >= config.min && rand <= config.max).should.equal(true);
        })
    });
    
    // unit test to confirm the producer can select a valid random math operator
    describe('producer.randomOperator()', function(){
        it('Should return with one of: +,-,*,/', function(){
            ['+','-','*','/'].indexOf(producer.randomOperator()).should.not.equal(-1);
        })
    });
    
    // unit test to confirm the producer can return a random expression
    describe('producer.randomExpression()', function(){
        it('Should return a string matching the RegEx rule', function(){
            expression.regex().test(producer.randomExpression()).should.equal(true);
        })
    });
    
    // unit test to confirm the producer can communicate with the consumer and receive a correct answer
    describe('producer.sendExpression()', function(){
        it('Should callback with an answer of 5', function(done){
            producer.sendExpression('2+3=', function(err, result){
                result.should.equal('5');
                done();
            });
        });
    });
    
    afterEach(function(){
        consumer.close();
    });
    
});