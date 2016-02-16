'use strict';

var regex = /^([\-]{0,1}\d*)([\+\-\*\/])([\-]{0,1}\d*)\=$/;
var async = require('async');

/*
  * METHOD: .parse()
  * DESCRIPTION: Parses a provided mathematical string "expression" in the form of "x+y=" into consumable parts
  * 
  * INPUT:
  *     expression  (string)    e.g. "1+2="
  *     callback    (function)
  *     
  * CALLBACK(error, result):
  *     successful result will be a JSON object in the form of:
  *     {
  *         "first": 1,
  *         "operator": "+",
  *         "second": 2
  *     }
  *     otherwise error will contain a string describing the failure
*/
exports.parse = function(expression, callback){
    var parsedExpression = regex.exec(expression);
    if(!parsedExpression || parsedExpression.length !== 4){
        callback("Invalid expression '" + expression + "'");
    }else{
        callback(null, {
            "first": parseInt(parsedExpression[1]),
            "operator": parsedExpression[2],
            "second": parseInt(parsedExpression[3])
        });
    }
};


/*
  * METHOD: .evaluate()
  * DESCRIPTION: Evaluates a parsed expression using the first number, mathematical operator, and the second number to return the calculated answer
  * 
  * INPUT:
  *     first       (integer)   e.g. 1
  *     operator    (string)    e.g. "+"
  *     second      (integer)   e.g. 2
  *     callback    (function)
  *     
  * CALLBACK(error, answer):
  *     successful answer will be a numeric value
  *     otherwise error will contain a string describing the failure
*/
exports.evaluate = function(first, operator, second, callback){
    switch(operator){
        case '+':
            callback(null, first + second);
            break;
        case '-':
            callback(null, first - second);
            break;
        case '*':
            callback(null, first * second);
            break;
        case '/':
            second == 0 ? callback("Cannot divide by zero.") : callback(null, first / second);
            break;
        default:
            callback("Invalid operator '" +  operator + "'");
    }
};

/*
  * METHOD: .parseAndEvaluate()
  * DESCRIPTION: Convenience method to parse a given string expression, evaluate it, and execute a callback with a descriptive error or the answer
  * 
  * INPUT:
  *     expression  (string)    e.g. "1+2="
  *     callback    (function)
  *     
  * CALLBACK(error, result):
  *     successful result will be a numerical value
  *     otherwise error will contain a string describing the failure
*/
exports.parseAndEvaluate = function(expression, callback){
    async.waterfall([
        function(callback){
            exports.parse(expression, callback);
        },
        function(parsedExpression, callback){
            exports.evaluate(parsedExpression.first, parsedExpression.operator, parsedExpression.second, callback);
        }
    ], callback);
};