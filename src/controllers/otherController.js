/* jslint node:true */
'use strict';
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var controller = function (nav, copyRight) {
    logger.debug('controller = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');
        
        next();
    };

    var napaCC = function (req, res) {
        logger.debug('napaCC = function (req, res)');

        res.render('other/napaCC', {
            copyRight: copyRight,
            nav: nav,
            page: 'NapaCC'
        });
    };

    return {
        napaCC: napaCC,
        middleware: middleware
    };
};

module.exports = controller;



// function getIpeds() {
//     logger.debug('ipeds = function (req, res)');
//     console.log('getIpeds: ' );
//     var di = {};
//     return buildIpeds(di, getAttrsList);
// }

// function getAttrsList(o) {
//     console.log('start getAttrsList');
//     var options = {
//         method: 'GET',
//         uri: 'https://api.datausa.io/attrs/list',
//         json: true
//     };
//     request(options, function (err, resp, attrs) {
//         if (err) {
//             logger.error(err);
//             console.log('getAttrsList***********ERROR: ' + err);
//         } else {
//             //console.log('resp' + JSON.stringify(resp));
//             console.log('end getAttrsList: ' );

//             o.attrs = attrs.data;
//             return buildIpeds(o, getGeoDatasets);
//         }
//     });
// }

// // http://api.datausa.io/attrs/geo/
// function getGeoDatasets(o2) {
//     var BreakException = {};
//     console.log('getGeoDatasets: ' + JSON.stringify(o2));
//     var options = {
//         method: 'GET',
//         uri: '', //'https://api.datausa.io/api/logic/?show=insurance&sumlevel=all',
//         json: true
//     };
//     o2.getGeoDatasets = 'init';
//     options.uri = 'https://api.datausa.io/api/logic/?show=' + o2.attrs[2] + '&sumlevel=all';
//     console.log(2 + ' :--: ' + options.uri);
//     request(options, function (err, resp, datasets) {
//         if (err) {
//             console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ERROR: ' + err);
//             logger.error(err);                            
//         } else {
//             console.log(2 + ' :!: ' + options.uri);
//             //console.log(u + ' ### ' + JSON.stringify(datasets));
//             o2.getGeoDatasets = datasets.tables;
//             return o2;
//         }
//     });
// }

// function buildIpeds(ipeds, fn) {
//     return fn(ipeds);
// }