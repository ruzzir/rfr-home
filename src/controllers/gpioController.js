/* jslint node:true */
'use strict';
var five = require('johnny-five');  //does NOT work in ubuntu, no gpio
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
        logger.debug('blinkLed: ');
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
        var data1 = {}; //JSON.parse('data.tsv');
        res.render('gpio/gpio', {
            copyRight: copyRight,
            nav: nav,
            page: 'Gpio',
            gpio: {},
            data: data1
        });
    };
    
    var sevenSegment = function (req, res) {
        logger.debug('SevenSegment: ' + JSON.stringify(req.body.display));
        var number = req.body.display * 1;
        var decimal = 1;
        // if (number < 99) {
        //     register.display(number + (decimal && '.'));
        // } else {
        //     register.clear();
        // }
        res.status(200).send('SevenSegment');
    };
    
    function numberOfBlinks(numberOfBlinks) {
        logger.debug('blinkLed: ' + numberOfBlinks);
        
        var baseTime = 1000; //milliseconds
        var phase = baseTime / 2; //millisecond phase  
        var delay = baseTime * numberOfBlinks;
    
        led.blink(phase);
        setTimeout(function () {
            led.stop().off();
        }, delay);
    }

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
        song: song
    };
};

module.exports = controller;