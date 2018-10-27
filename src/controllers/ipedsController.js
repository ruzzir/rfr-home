/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var controller = function (service, nav, copyRight) {
    logger.debug('controller = function (service, nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');

        next();
    };

    var ipeds = function (req, res) {
        logger.debug('ipeds = function (req, res)');

        res.render('other/ipeds', {
            copyRight: copyRight,
            nav: nav,
            page: 'Ipeds',
            ipeds: {}
        });
    };

    var attrs = function (req, res) {
        logger.debug('attrs = function (req, res)');

        service.getAttrsList(function (err, attrsList) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(attrsList);
            }
        });
    };

    var attrsDatasets = function (req, res) {
        logger.debug('attrsDatasets = function (req, res)');

        service.getAttrsDatasets(req, function (err, datasets) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(datasets);
            }
        });
    };

    return {
        ipeds: ipeds,
        attrs: attrs,
        attrsDatasets: attrsDatasets,
        middleware: middleware
    };
};

module.exports = controller;