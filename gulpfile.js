/* gulp is a task manager for web projects.
   kick-off at the command line with: gulp serve 
   (serve is a task in this file) */

/*jslint node:true */
'use strict';
var gulp = require('gulp');             //task manager
var jshint = require('gulp-jshint');    //style & syntax
var jscs = require('gulp-jscs');        //style & syntax
var nodemon = require('gulp-nodemon');  //monitor file changes

var jsfiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
    return gulp.src(jsfiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

//copy source file locations where needed in html/template
// ** Bower not installed. Obsoleted. **
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream,
        inject = require('gulp-inject'),
        injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
            read: false
        }),
        injectOptions = {
            ignorePath: '/public'
        },
        options = {
            bowerJson: require('./bower.json'),
            directory: './public/lib',
            ignorePath: '../../public'
        };

    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});


//restart server on source file changes
//run style & inject tasks before serve
//style & inject run async, be sure one doesn't depend on other.
//  set dependency option if there is a dependecy

//gulp 3.x version
// gulp.task('serve', ['style'], function () {
//     var options = {
//         script: 'index.js', //main application file to restart
//         delayTime: 1,       //delay of one second
//         env: {
//             'PORT': 3000
//         },
//         watch: jsfiles      //source files to be monitored
//     };

//     return nodemon(options)
//         .on('restart', function (ev) {
//             console.log('Restarting...');
//         });
// });

// gulp 4.0 version
gulp.task('serve', gulp.series('style', function (done) {
    var options = {
        script: 'index.js', //main application file to restart
        delayTime: 1, //delay of one second
        env: {
            'PORT': 3000
        },
        watch: jsfiles //source files to be monitored
    };

    nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
    done();  //gulp cb() signals async completion, gulp automatically passes a callback function to your task as its first argument. 
}));