/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
var pool = require('../common/database.js');
var format = require('pg-format');
logger.debug('init');

//var request = require('request');
// var cache = require('memory-cache');
// var cacheAttrs = new cacheAttrs.Cache();  // create new cache instance

//var bodyParser = require('body-parser');

var sortBy = function (field, reverse, primer) {

    var key = primer ?
        function (x) {
            return primer(x[field]);
        } :
        function (x) {
            return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
};

var service = function () {
    logger.debug('monitorService = function ()');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');

        next();
    };

    var getTemperature = function (req, cb) {
        logger.debug('getTemperature = function (req, res, next) ' + JSON.stringify(req.body));

        pool.connect(function (err, client, done) {
            if (err){
                logger.error('getTemperature db connection error: ' + err);
            } else {
                var results = [];
                //var queryPage = format('SELECT * FROM visits WHERE page = $1::text' );
                var select = format('SELECT log_timestamp as date, type, subtype, celcius, fahrenheit FROM temperature ORDER BY log_timestamp DESC LIMIT 192');
                var query = client.query(select, function (err, res) {                                        
                    client.release();
                    if (err) {
                        logger.error('getTemperature db error: ' + err);                        
                        cb({'error' : 'Not available'}, null);
                    } else {
                        res.rows.forEach(function (item)  {
                            results.push(item);
                        });
                        
                        done();
                        cb(null,{'temps': results});
                    }                    
                });
            }
        });

        //cb(null,{'one': 'one'});
    };

    var getPics = function (res, cb) {
        cb('Monitor pic service not available', {});
        // logger.debug('body: ' + JSON.stringify(req.body.attrs));
        // console.log('http://api.datausa.io/api/logic/?show=' + req.body['attrs'] + '&sumlevel=all');
        // if (req.body['attrs']) {
        //     var options = {
        //         method: 'GET',
        //         uri: 'http://api.datausa.io/api/logic/?show=' + req.body['attrs'] + '&sumlevel=all',
        //         json: true
        //     };
        //     request(options, function (err, resp, datasets) {
        //         if (err) {
        //             logger.error(err);
        //             cb(err, datasets);
        //         } else {
        //             if (datasets['tables']) {
        //                 datasets.tables.sort(sortBy('table', false, function (a) {
        //                     if ( typeof a !== 'undefined' ) {
        //                         return a.toUpperCase();
        //                     }
        //                 }));
        //                 cb(null, datasets);
        //             } else {
        //                 cb('No datasets returned', {});
        //             }
        //         }
        //     }).end();
        // } else {
        //     cb('Attribute does not exists', {});
        // }
    };

    return {
        getTemperature: getTemperature
    };
};

module.exports = service;