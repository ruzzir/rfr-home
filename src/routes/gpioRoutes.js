/*jslint node:true */
'use strict';
var express = require('express');
var routes = express.Router();
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var router = function (nav, copyRight) {
    logger.debug('router = function (nav, copyRight)');

    var controller = require('../controllers/gpioController.js')(nav, copyRight);
    
    routes.use(controller.middleware);

    
    routes.route('/')
          .get(controller.gpio);
    routes.route('/Blink')
          .post(controller.blink);          
    routes.route('/SevenSegment')
          .post(controller.sevenSegment);
    routes.route('/Snapshot')
          .post(controller.snapshot);
    routes.route('/Song')
          .post(controller.song);

    return routes;
};

module.exports = router;