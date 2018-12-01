/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var controller = function (service, nav, copyRight) {
    logger.debug('controller = function (service, nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next) ');

        next();
    };

    var dashboard = function (req, res) {
        logger.debug('monitor = function (req, res)');
        res.render('monitor/dashboard', {
            copyRight: copyRight,
            nav: nav,
            page: 'Monitor Dashboard',
            monitor: {}
        });
    };

    var temperature = function (req, res) {
        logger.debug('temperature = function (req, res)');
        service.getTemperature(req.body, function (err, data) {
            if (err) {
                res.status(200).send(JSON.stringify(err.error));
            } else {
                res.status(200).send(JSON.stringify(data.temps));
            }
        });
    };

    var pics = function (req, res) {
        logger.debug('pics = function (req, res)');

        res.status(200).send('Not Available by berto');
        // service.getPics(req, function (err, datasets) {
        //     if (err) {
        //         res.status(500).send(err);
        //     } else {
        //         res.status(200).send(datasets);
        //     }
        // });
    };

    var visits = function (req, res) {
        logger.debug('visits = function (req, res)');
        service.getVisits(req.body, function (err, data) {
            if (err) {
                res.status(200).send(JSON.stringify(err.error));
            } else {
                res.status(200).send(JSON.stringify(data.visits));
            }
        });
    };

    return {
        dashboard: dashboard,
        middleware: middleware,
        pics: pics,
        temperature: temperature,
        visits: visits
    };
};

module.exports = controller;