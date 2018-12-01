/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
var pool = require('../common/database.js');
var format = require('pg-format');
logger.debug('init');

var mainController = function (nav, copyRight) {
    logger.debug('mainController = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');
        var page = req.url.replace(/[^a-zA-Z0-9]+/g, ' ');
        page = page.substring(0, 30);
        /* TODO rfr unblock following for login redirect
        if (!req.user) {
            res.redirect('/');
        }
        */

        pool.connect(function (err, client, done) {
            if (err){
                logger.error(page + ' db connection error: ' + err);
            } else {
                //var queryPage = format('SELECT * FROM visits WHERE page = $1::text' );
                var upsert = format('INSERT INTO visits (page, count, other) VALUES ($1, $2, $3) ON CONFLICT (page) DO UPDATE SET count = visits.count + 1 WHERE visits.page = $1');
                client.query(upsert, [page, 1, {}], function (err, res) {
                    if (err) {
                        logger.error(page + ' page db error: ' + err);
                    } else {
                        logger.debug('SQL results: ' + res.rowCount);
                    }                    
                });                
            }
            done();  // ends pool connection
        });

        next();
    };

    var showAbout = function (req, res) {
        //var page = req.url.replace(/[^a-zA-Z0-9]+/g, '');        
        logger.debug('showAbout = function (req, res)');

        res.render('about', {
            copyRight: copyRight,
            nav: nav,
            page: 'About'
        });
    };

    var showContact = function (req, res) {
        logger.debug('showContact = function (req, res)');

        res.render('contact', {
            copyRight: copyRight,
            nav: nav,
            page: 'Contact'
        });
    };

    return {
        showAbout: showAbout,
        showContact: showContact,
        middleware: middleware
    };
};

module.exports = mainController;