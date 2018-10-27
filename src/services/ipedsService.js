/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var request = require('request');
// var cache = require('memory-cache');
// var cacheAttrs = new cacheAttrs.Cache();  // create new cache instance

var bodyParser = require('body-parser');

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
    logger.debug('ipedsService = function ()');

    var getAttrsList = function (cb) {
        var options = {
            method: 'GET',
            uri: 'https://api.datausa.io/attrs/list',
            json: true
        };
        request(options, function (err, resp, attrs) {
            if (err) {
                logger.error(err);
            } else {
                attrs.data.sort();
                cb(null, attrs);
            }
        }).end();
    };

    var getAttrsDatasets = function (req, cb) {
        logger.debug('body: ' + JSON.stringify(req.body.attrs));
        console.log('http://api.datausa.io/api/logic/?show=' + req.body['attrs'] + '&sumlevel=all');
        if (req.body['attrs']) {
            var options = {
                method: 'GET',
                uri: 'http://api.datausa.io/api/logic/?show=' + req.body['attrs'] + '&sumlevel=all',
                json: true
            };
            request(options, function (err, resp, datasets) {
                if (err) {
                    logger.error(err);
                    cb(err, datasets);
                } else {
                    if (datasets['tables']) {
                        datasets.tables.sort(sortBy('table', false, function (a) {
                            if ( typeof a !== 'undefined' ) {
                                return a.toUpperCase();
                            }
                        }));
                        cb(null, datasets);
                    } else {
                        cb('No datasets returned', {});
                    }
                }
            }).end();
        } else {
            cb('Attribute does not exists', {});
        }
    };

    return {
        getAttrsList: getAttrsList,
        getAttrsDatasets: getAttrsDatasets
    };
};

module.exports = service;