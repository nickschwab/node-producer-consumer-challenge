Node.js Producer-Consumer Challenge
=========================
[![Build Status](https://travis-ci.org/nickschwab/node-producer-consumer-challenge.svg?branch=master)](https://travis-ci.org/nickschwab/node-producer-consumer-challenge)

The assignment is to build a simple Producer/Consumer system. In this system the Generator (Producer) will send a series of random arithmetic expressions, while the Evaluator (Consumer) will accept these expressions, compute the result and then report the solution to the Generator (Producer).

## Requirements

### Engines
- Node.js >= 0.10.42
- NPM >= 1.4.29

### Dependencies
- Async 1.5.2
- body-parser 1.15.0
- connect 3.4.1
- log4js 0.6.31
- request 2.69.0

### Dev Dependencies
- Mocha 2.4.5
- Sinon-Chai 2.8.0


## Setup & Configuration

1. Run `npm install`
1. Optionally edit `config.js` to define a custom host, port, and other basic options

## Running unit tests

1. Run `npm test`
1. Watch the magic happen

## Starting the Consumer

The Consumer listens for requests containing an `expression` POST parameter, parses the mathematical expression, evaluates it, and responds to the requester with the answer (or error). All incoming requests to the Consumer are logged to the console, as are the answers for each expression.

1. Run `npm run consumer`
1. Optionally make a POST request to [http://localhost:7000/](http://localhost:7000/) using Content-Type `application/x-www-form-urlencoded` or `application/json` with an `expression` payload (e.g. 2+3=)

## Starting a Producer

An instance of the Producer will form an expression consisting of 2 random integers and a random mathematical operator (+, -, *, /) at a rate of once per second (unless otherwise specified via an environment variable or by altering the `config.js` file). After constructing each random expression, it will attempt to send it to the Consumer via an HTTP POST request to be evaluated and receive an answer. Each generated expression is logged to the console, as are the answers received from the Consumer.

1. Run `npm run producer`

## Screenshot

![Screenshot](https://raw.githubusercontent.com/nickschwab/node-producer-consumer-challenge/master/images/screenshot.png)

## UML Activity Diagram

![Activity Diagram](https://raw.githubusercontent.com/nickschwab/node-producer-consumer-challenge/master/images/activity-diagram.png)

## UML Sequence Diagram

![Sequence Diagram](https://raw.githubusercontent.com/nickschwab/node-producer-consumer-challenge/master/images/sequence-diagram.png)