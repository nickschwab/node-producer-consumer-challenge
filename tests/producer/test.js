'use strict';

// load libraries and application variables
var config = require('../../config.js'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    consumer = require('../../apps/consumer/consumer.js'),
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
    
    // unit test to confirm the producer can communicate with the consumer
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