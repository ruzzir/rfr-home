/* jslint node:true */
'use strict';
var five = require('johnny-five'); //does NOT work in ubuntu, no gpio
var songs = require('j5-songs');
var childProcess = require('child_process');
//var bodyParser = require('body-parser');
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var board = {}; //new five.Board();
var led, motor, piezo, photoresistor, register;

var controller = function (nav, copyRight) {
    logger.debug('controller = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');

        next();
    };

    var blink = function (req, res) {
        logger.debug('Blink: ' + JSON.stringify(req.body.repeat));
        blinkLed(req.body.repeat * 1);
        res.status(200).send('Blink');
    };

    function blinkLed(numberOfBlinks) {
        logger.debug('blinkLed2: ' + numberOfBlinks);
        var baseTime = 1000; //milliseconds
        var phase = baseTime / 2; //millisecond phase
        var delay = baseTime * numberOfBlinks;
        console.log('delay: ' + delay);

        led.blink(phase);
        setTimeout(function () {
            led.stop().off();
        }, delay);
    }


    var song = function (req, res) {
        logger.debug('Song: ' + JSON.stringify(req.body.tune));

        var tune = songs.load(req.body.tune);
        piezo.play(tune);

        res.status(200).send('Song');
    };

    var gpio = function (req, res) {
        logger.debug('gpio = function (req, res)');
        res.render('gpio/gpio', {
            copyRight: copyRight,
            nav: nav,
            page: 'Gpio',
            gpio: {},
        });
    };

    var sevenSegment = function (req, res) {
        logger.debug('SevenSegment: ' + JSON.stringify(req.body.display));
        var number = req.body.display * 1;
        var decimal = 1;
        if (number < 99) {
            register.display(number + (decimal && '.'));
        } else {
            register.clear();
        }
        res.status(200).send('SevenSegment');
    };

    function numberOfBlinks(repeat) {
        logger.debug('blinkLed: ' + repeat);

        var baseTime = 1000; //milliseconds
        var phase = baseTime / 2; //millisecond phase  
        var delay = baseTime * repeat;

        led.blink(phase);
        setTimeout(function () {
            led.stop().off();
        }, delay);
    }

    var snapshot = function (req, res) {
        logger.debug('Snapshot: width-' + req.body.width);

        // Run raspistill command to take a photo with the camera module
        var now = new Date();
        //var filename = 'data/image/img_' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '.jpg';
        var filename = 'public/images/img.jpg';
        var width = req.body.width * 1;
        var height = req.body.height * 1;
        var timeout = req.body.timeout * 1;
        var args = ['-w', req.body.width, '-h', req.body.height, '-t', req.body.timeout, '-o', filename];
        var spawn = childProcess.spawn('raspistill', args);
        spawn.on('exit', function (code) {
            logger.debug('A photo is saved as ' + filename + ' with exit code, ' + code);
            res.status(200).send('Snapshot');
        }).on('error', function (code) {
            logger.debug('Photo error ' + filename + ' with exit code, ' + code);
            res.status(200).send('Snapshot Error: ' + code);
        });
    };

    function boardReady() {
        logger.debug('boardReady');

        // hardware
        led = new five.Led(6); //five.Led(6);
        motor = new five.Motor({
            pin: 5
        });
        piezo = new five.Piezo(6);
        photoresistor = new five.Sensor({
            pin: 'A2',
            freq: 250
        });
        register = new five.ShiftRegister({
            pins: {
                data: 26,
                clock: 19,
                latch: 13,
            }
        });

        // Inject hardware into the Repl instance's context;
        // allows direct command line access
        board.repl.inject({
            led: led,
            motor: motor,
            pot: photoresistor
        });
    }

    return {
        blink: blinkLed,
        gpio: gpio,
        middleware: middleware,
        sevenSegment: sevenSegment,
        snapshot: snapshot,
        song: song
    };
};

module.exports = controller;