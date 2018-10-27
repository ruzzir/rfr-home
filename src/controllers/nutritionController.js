/*jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var controller = function (nav, copyRight) {
    logger.debug('controller = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');
        var page = req.url.replace(/[^a-zA-Z0-9]+/g, '');
        /* TODO rfr unblock following for login redirect
        if (!req.user) {
            res.redirect('/');
        }
        */

        // mongodb.connect(url, function (err, database) {
        //     if (err) {
        //         logger.error(page + ' mongodb connection error: ' + err);                
        //     } else {
        //         var db = database.db('rfrhome');  //can also be included on var url
        //         var collection = db.collection('visits');
        //         var query = { page: page };
        //         var update = { $inc: { count: 1 } };
        //         var options = { upsert: true };

        //         collection.findOneAndUpdate(query, update, options, function(err,doc) {
        //             if (err) { 
        //                 logger.error(page + ' mongodb findOneAndUpdate: ' + err);
        //             }
        //             database.close();
        //         });  
        //     }
        // });        

        next();
    };

    var calcAnthropometrics = function (req, res) {
        logger.debug('calcAnthropometrics = function (req, res)');
        // var url = 'mongodb://localhost:27017/library';
        // mongodb.connect(url, function (err, database) {
        //     var db = database.db('library'),
        //        collection = db.collection('books');

        //     collection.find({}).toArray(
        //         function (err, results) {
        //             res.render('bookListView', {
        //                 title: 'Books',
        //                 nav: nav,
        //                 books: results,
        //                 copyRight: copyRight
        //             });
        //         }
        //     );
        // });
        res.render('nutrition/anthropometrics', {
            copyRight: copyRight,
            nav: nav,
            page: 'Anthropometrics'
        });
    };

    var calcDiabeticExchange = function (req, res) {
        logger.debug('calcDiabeticExchange = function (req, res)');
        
        res.render('nutrition/diabeticExchange', {
            copyRight: copyRight,
            nav: nav,
            page: 'DiabeticExchange'
        });
    };

    var calcHarrisBenedict = function (req, res) {
        logger.debug('calcHarrisBenedict = function (req, res)');

        res.render('nutrition/harrisBenedict', {
            copyRight: copyRight,
            nav: nav,
            page: 'HarrisBenedict'
        });
    };

    var calcCalorieCount = function (req, res) {
        logger.debug('calcCalorieCount = function (req, res)');

        res.render('nutrition/calorieCount', {
            copyRight: copyRight,
            nav: nav,
            page: 'CalorieCount'
        });
    };

    return {
        calcAnthropometrics: calcAnthropometrics,
        calcCalorieCount: calcCalorieCount,
        calcDiabeticExchange: calcDiabeticExchange,
        calcHarrisBenedict: calcHarrisBenedict,
        middleware: middleware
    };
};

module.exports = controller;