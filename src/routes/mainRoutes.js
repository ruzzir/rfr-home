/* jslint node:true */
'use strict';
var express = require('express');
var mainRouter = express.Router();
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var router = function (nav, copyRight) {
    logger.debug('router = function (nav, copyRight)');

    var controller = require('../controllers/mainController')(nav, copyRight);
    
    mainRouter.use(controller.middleware);

    mainRouter.route('/About')
              .get(controller.showAbout);
    mainRouter.route('/Contact')
              .get(controller.showContact);           

    // mainRouter.route('/:id')
    //     .get(controller.getById);

    return mainRouter;
};

module.exports = router;
