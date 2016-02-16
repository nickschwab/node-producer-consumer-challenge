'use strict';

// load libraries and application variables
var config = require('../../config.js'),
    connect = require('connect'),
    app = connect(),
    http = require('http'),
    bodyParser = require('body-parser'),
    logger = require('log4js').getLogger(),
    expression = require('./expression.js'),
    server;
    
// parse application/x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json requests
app.use(bodyParser.json());
    
// handler for all incoming requests
app.use(function(req, res){
    
    logger.debug("Consumer received expression '" + req.body.expression + "'");
    
    // send the request to the helper for processing, log and respond with the result
    expression.parseAndEvaluate(req.body.expression, function(err, answer){
        logger.debug(req.body.expression + ": " + (err || answer));
        res.end(err || answer.toString());
    });
});

// function to begin listening on the configured port
exports.listen = function(callback){
    // create the http server to listen on a specified port
    server = http.createServer(app).listen(config.port);
    logger.debug('Consumer listening on port ' + config.port);
    
    if(typeof callback == 'function'){
        callback(null, 'Consumer listening on port ' + config.port);
    }
    
};

// function to stop listening on the configured port
exports.close = function(){
    server.close();
}