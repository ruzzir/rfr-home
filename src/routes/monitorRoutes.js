/*jslint node:true */
'use strict';
var express = require('express');
var routes = express.Router();
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var router = function (nav, copyRight) {
    logger.debug('router = function (nav, copyRight)');

    var service = require('../services/monitorService.js')();
    // logger.debug('service: ' + JSON.stringify(service));
    var controller = require('../controllers/monitorController.js')(service, nav, copyRight);
    logger.debug('controller' + JSON.stringify(controller));
    //routes.use(controller.middleware);

    routes.route('/')
          .get(controller.dashboard);
    routes.route('/Dashboard')
          .get(controller.dashboard);      
    routes.route('/Pics')
          .get(controller.pics);
    routes.route('/Temperature')
          .get(controller.temperature);      
    routes.route('/Visits')
          .get(controller.visits);
    routes.route('*')
          .get(controller.dashboard);      

    return routes;
};

module.exports = router;