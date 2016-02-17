'use strict';

var config = require('../../config.js'),
    request = require('request'),
    logger = require('log4js').getLogger(),
    operators = ['+', '-', '*', '/'];

/*
  * FUNCTION: randomInt()
  * DESCRIPTION: Returns a random integer between the MIN and MAX bounds as specified in the config.js file
*/
exports.randomInt = function(){
    return Math.floor(Math.random()*(config.max - config.min) + config.min);
}

/*
  * FUNCTION: randomOperator()
  * DESCRIPTION: Returns a random mathematic operator from the "operators" array defined near the top of this file
*/
exports.randomOperator = function(){
    return operators[Math.floor(Math.random()*operators.length)];
}

/*
  * FUNCTION: randomExpression()
  * DESCRIPTION: Uses randomInt() and randomOperator() to return a random mathematical expression in the form of [integer][operator][integer]=
*/
exports.randomExpression = function(){
    return exports.randomInt().toString() + exports.randomOperator() + exports.randomInt().toString() + "=";
}

/*
  * FUNCTION: sendExpression()
  * DESCRIPTION: Sends an expression to the Consumer to be evaluated and logs the Consumer's answer
  * 
  * INPUT:
  *     expression  (string)    e.g. "1+2="
  *     callback    (function)  
  *
  * CALLBACK(error, answer):
  *     successful answer will be a numeric value
  *     otherwise error will contain a string describing the failure
*/
exports.sendExpression = function(expression, callback){
    logger.debug("Sending expression '" + expression + "' to Consumer...");
    request.post(config.host + ':' + config.port, {
        "form": {
            "expression": expression
        }
    }, function(err, httpResponse, body){
        if(err){
            logger.debug("Unable to communicate with Consumer. Make sure the Consumer is running.");
        }else{
            logger.debug("Consumer responded to '" + expression + "' with: " + body);
        }
        if(typeof callback == 'function'){
            callback(err, body);
        }
    });
}

/*
  * FUNCTION: runOnInterval()
  * DESCRIPTION: Continously sends a randomly-generated expression to the Consumer for evaluation at an interval defined in the config.js file
*/
exports.runOnInterval = function(){
    exports.sendExpression(exports.randomExpression());
    setTimeout(function(){
        exports.runOnInterval();
    }, config.interval);
}