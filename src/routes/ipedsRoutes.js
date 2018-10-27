/*jslint node:true */
'use strict';
var express = require('express');
var routes = express.Router();
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var router = function (nav, copyRight) {
    logger.debug('router = function (nav, copyRight)');

    var service = require('../services/ipedsService.js')();
    var controller = require('../controllers/ipedsController')(service, nav, copyRight);
    
    routes.use(controller.middleware);

    routes.route('/')
          .get(controller.ipeds);
    routes.route('/Attrs')
          .post(controller.attrs);
    routes.route('/AttrsDatasets')
          .post(controller.attrsDatasets);

    return routes;
};

module.exports = router;