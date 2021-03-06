/* jslint node:true */
'use strict';
var five = require('johnny-five'); //does NOT work in ubuntu, no gpio
var songs = require('j5-songs');
var childProcess = require('child_process');
//var bodyParser = require('body-parser');
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

// Raspberry pi
// var Raspi = require("raspi-io");
// var board = new five.Board({
//   io: new Raspi()
// });

var board = {}; //new five.Board();   // arduino
var led, motor, piezo, photoresistor, register, servoPins, servo1, servo2;

var controller = function (nav, copyRight) {
    logger.debug('controller = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');

        next();
    };

    //board.on('ready', boardReady);

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
            gpio: {}
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

    var servo11 = function (req, res) {
        logger.debug('Servo1: ' + JSON.stringify(req.body.degree));
        var angle = req.body.degree * 1;

        if (angle !== null) {
            servo1.to(angle);
        }
        res.status(200).send('Servo1');

        // if (servos) {

        //     var value = req.params.value; // optional, may be null
        //     switch (req.params.mode) {
        //         case 'min': // 0 degrees
        //             logger.error('Servo min: ' + JSON.stringify(req.params.mode));
        //             servos.min();
        //             break;
        //         case 'max':
        //             servos.max();
        //             break;
        //         case 'stop': // use after sweep
        //             servos.stop();
        //             break;
        //         case 'sweep':
        //             servos.sweep();
        //             break;
        //         case 'to':
        //             if (value !== null) {
        //                 servos.to(value);
        //             }
        //             break;
        //         default:
        //             logger.debug('Servo unknown mode: ' + req.params.mode);
        //             break;
        //     }
        //     res.status(200).send('Servo');
        // } else {
        //     res.status(500).send('Board not ready');
        // }
        //res.status(500).send('Board not ready');
    };

    var servo22 = function (req, res) {
        logger.debug('Servo2: ' + JSON.stringify(req.body.degree));
        var angle = req.body.degree * 1;

        if (angle !== null) {
            servo2.to(angle);
        }
        res.status(200).send('Servo2');
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
        logger.debug('Snapshot');

        // Run raspistill command to take a photo with the camera module
        //var now = new Date();
        //var filename = 'data/image/img_' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() + '.jpg';
        var passcode = ' ** add security code ** ';
        if (passcode.localeCompare(req.body.code) === 0) {
            var filename = 'public/images/img.jpg';
            var args = ['-w', req.body.width,
                '-h', req.body.height,
                '-rot', req.body.rotate,
                '-ifx', req.body.effect,
                '-q', req.body.quality,
                '-sh', req.body.sharpness,
                '-t', req.body.timeout,
                '-o', filename
            ];
            var spawn = childProcess.spawn('raspistill', args);
            spawn.on('exit', function (code) {
                logger.debug('A photo is saved as ' + filename + ' with exit code, ' + code);
                res.status(200).send('Snapshot');
            }).on('error', function (code) {
                logger.debug('Photo error ' + filename + ' with exit code, ' + code);
                res.status(200).send('Snapshot Error: ' + code);
            });
        } else {
            res.status(200).send('Snapshot Error');
        }
    };

    function boardReady() {
        logger.debug('boardReady');

        // hardware
        led = new five.Led(6); // 'P1-40'
        // motor = new five.Motor({
        //     pin: 5
        // });
        piezo = new five.Piezo(6); // 'P1-31'
        // photoresistor = new five.Sensor({
        //     pin: 'A2',
        //     freq: 250
        // });
        register = new five.ShiftRegister({
            pins: {
                data: 26, // 'P1-37'
                clock: 19, // 'P1-35'
                latch: 13, // 'P1-33'
            }
        });
        //servoPins = [9, 10];
        // ** Need to figure out raspberry pi pin designations 'P1-##'
        servo1 = new five.Servo({
            pin: 9,
            range: [10, 170],
            startAt: 90
        });
        servo2 = new five.Servo({
            pin: 10,
            range: [10, 170],
            startAt: 90
        });

        // Inject hardware into the Repl instance's context;
        // allows direct command line access
        // board.repl.inject({
        //     led: led,
        //     motor: motor,
        //     pot: photoresistor
        // });
    }

    return {
        blink: blinkLed,
        gpio: gpio,
        middleware: middleware,
        servo1: servo11,
        servo2: servo22,
        sevenSegment: sevenSegment,
        snapshot: snapshot,
        song: song
    };
};

module.exports = controller;