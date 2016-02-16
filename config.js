'use strict';

// Recommended that these settings only be changed using environment variables, but you may alternatively change the fallback values in this document
module.exports = {
    "host": process.env.HOST || "http://localhost",     // the domain (with protocol) the running Consumer can be reached at
    "port": process.env.PORT || 7000,                   // the port to run the Consumer on
    "interval": process.env.INTERVAL || 1000,           // the rate (in milliseconds) the Producer process should send requests to the Consumer
    "min": process.env.MIN || 1,                        // the smallest possible random integer to be generated to be used by the Producer process
    "max": process.env.MAX || 100                       // the largest possible random integer to be generated to be used by the Producer process
};