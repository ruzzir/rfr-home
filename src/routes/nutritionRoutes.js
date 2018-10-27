/*jslint node:true */
'use strict';
var express = require('express');
var routes = express.Router();
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var router = function (nav, copyRight) {
    logger.debug('router = function (nav, copyRight)');

    var controller = require('../controllers/nutritionController')(nav, copyRight);
    
    routes.use(controller.middleware);

    routes.route('/Anthropometrics')
          .get(controller.calcAnthropometrics);
    routes.route('/CalorieCount')
          .get(controller.calcCalorieCount);              
    routes.route('/DiabeticExchange')
          .get(controller.calcDiabeticExchange);
    routes.route('/HarrisBenedict')
          .get(controller.calcHarrisBenedict);

    return routes;
};

module.exports = router;
