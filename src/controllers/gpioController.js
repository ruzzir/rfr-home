/* jslint node:true */
'use strict';
var five = require('johnny-five');  //does NOT work in ubuntu, no gpio
var bodyParser = require('body-parser');
var songs = require('j5-songs');
//var bodyParser = require('body-parser');
var logger = require('../common/log.js')(module); // this retrieves default logger which was configured in common/log.js
logger.debug('init');

var board = new five.Board();
var led, motor, piezo, photoresistor, register, servoPins, servo1, servo2;

var controller = function (nav, copyRight) {
    logger.debug('controller = function (nav, copyRight)');

    var middleware = function (req, res, next) {
        logger.debug('middleware = function (req, res, next)');

        next();
    };

    board.on('ready', boardReady);

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
        logger.debug('Song: ' + JSON.stringify(req.body.song));

        var tune = songs.load(req.body.tune);
        piezo.play(tune);

        // Plays a song
        // piezo.play({
        //     // song is composed by an array of pairs of notes and beats
        //     // The first argument is the note (null means "no note")
        //     // The second argument is the length of time (beat) of the note (or non-note)
        //     song: [
        //         ['E5', 1/4],
        //         [null, 1/4],
        //         ['E5', 1/4],
        //         [null, 3/4],
        //         ['E5', 1/4],
        //         [null, 3/4],
        //         ['C5', 1/4],
        //         [null, 1/4],
        //         ['E5', 1/4],
        //         [null, 3/4],
        //         ['G5', 1/4],
        //         [null, 7/4],
        //         ['G4', 1/4],
        //         [null, 7/4]
        //     ],
        //     tempo: 200
        // });

        // Plays the same song with a string representation
        // piezo.play({
        //     // song is composed by a string of notes
        //     // a default beat is set, and the default octave is used
        //     // any invalid note is read as "no note"
        //     song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
        //     beats: 1 / 4,
        //     tempo: 100
        // });

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

    function boardReady() {
        logger.debug('boardReady');
    
        // hardware
        led = new five.Led(6);
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
        //servoPins = [9, 10];
        servo1 = new five.Servo({
            pin: 9,
            range: [0, 180],
            startAt: 90 
        });
        servo2 = new five.Servo({
            pin: 10,
            range: [0, 180],
            startAt: 90 
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
        servo1: servo11,
        servo2: servo22,
        sevenSegment: sevenSegment,
        song: song
    };
};

module.exports = controller;