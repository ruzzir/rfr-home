/*jslint node:true */
'use strict';
var express = require('express');
var helmet = require('helmet');

var app = express();

app.use(helmet({
    frameguard: {
      action: 'deny'
    }
  }));
    
process.title = 'rfr-home';

// var options = {
//     key: fs.readFileSync('rfrhomeKey.key'),
//     cert: fs.readFileSync('rfrhomeCert.crt')
//   };

var port = process.env.PORT || 3000,  //TODO port option taken from gulpfile.js. Where is 'process' defined?
    copyRight = { name: 'Distant Flag', year: '2018' },
    nav = [
        { Link: '/',Text: 'Home' },
        { Link: '/About', Text: 'About'},
        { Link: '/Contact', Text: 'Contact' }
    ];

var logger = require('./src/common/log.js')(); // requires winston and configures transports for winstons default logger    

var ipedsRouter = require('./src/routes/ipedsRoutes')(nav, copyRight);
var gpioRouter = require('./src/routes/gpioRoutes')(nav, copyRight);
var mainRouter = require('./src/routes/mainRoutes')(nav, copyRight);
var monitorRouter = require('./src/routes/monitorRoutes')(nav, copyRight);
var nutritionRouter = require('./src/routes/nutritionRoutes')(nav, copyRight);
var otherRouter = require('./src/routes/otherRoutes')(nav, copyRight);

//middleware - .use() indicates middleware, use by express first
//logger.log.debug('index middleware');
app.use(express['static']('public'));   //static pages (first location checked)

//Views
//logger.log.debug('index Views');
app.set('views', './src/views');    //templates
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

//Routes
logger.debug('index Routes');
app.use('/', mainRouter);
app.use('/Gpio', gpioRouter);
app.use('/Ipeds', ipedsRouter);
app.use('/Monitor', monitorRouter);
app.use('/Nutrition', nutritionRouter);
app.use('/Other', otherRouter);

app.get('/', function (req, res, next) {
    res.render('index', {
        copyRight: copyRight,
        nav: nav,
        page: 'Home'        
    });
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});
// var server = https.createServer(options, app)
//                   .listen(port, function(){
//     console.log('Express server listening on port ' + port);
//   });