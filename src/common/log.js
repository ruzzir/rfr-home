/*jslint node:true */
'use strict';

var winston = require('winston');

// default npm levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
winston.level = 'info';  // TODO pass in with configs

var winstonLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.File) ({
            filename: './logs/winston.log',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level: 'error',
            name: 'file1',
            timestamp: true,
            json: false
        }),
        new (winston.transports.Console) ({
            handleExceptions: true,
            humanReadableUnhandledException: true,
            level: winston.level,
            name: 'console1',
            prettyPrint: true,
            colorize: true
        })
    ]
});

// don't need Loggly?
// var Loggly = require('winston-loggly').Loggly;
// var logglyOptions={ subdomain: 'mysubdomain', inputToken: 'efake000-000d-000e-a000-xfakee000a00' };
// logger.add(Loggly, logglyOptions);

// Return the calling module's filename.
var getLabel = function (callingModule) {
    var label = '';
    if (callingModule != null && callingModule.filename != null) {
        var parts = callingModule.filename.split('/');
        //return parts[parts.length - 2] + '/' + parts.pop(); // Return the last folder name in the path
        label = parts.pop();
    }

    return label;
};

// logger.add(logger.transports.File, {
//     filename: './logs/winston.log',
//     handleExceptions: true,
//     humanReadableUnhandledException: true
// });
var logger = function (callingModule) {

    winstonLogger.transports.file1.label = getLabel(callingModule);
    winstonLogger.transports.console1.label = getLabel(callingModule);

    // return {
    //     log: winstonLogger
    // };
    return winstonLogger;
}; 

//module.exports = logger;
module.exports = function(callingModule) {    
    var myLogger = {
        error: function(text) {
            winstonLogger.error('[' + getLabel(callingModule) + '] ' + text);
        },
        warn: function(text) {
            winstonLogger.warn('[' + getLabel(callingModule) + '] ' + text);
        },
        info: function(text) {
            winstonLogger.info('[' + getLabel(callingModule) + '] ' + text);
        },
        debug: function(text) {
            winstonLogger.debug('[' + getLabel(callingModule) + '] ' + text);
        }
    };

    return myLogger;
};
