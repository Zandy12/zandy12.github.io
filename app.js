'use strict';
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Running node.js 1.5 in Visual Studio Community. require() will not work.
var data = JSON.parse(require('fs').readFileSync('.\\data.json') + '');


var app = express();

// Create an array with project data from data.json
let projects = [
    data.projects[0], data.projects[1], data.projects[2], data.projects[3], data.projects[4]
];

// view engine setup
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

// NOTE: console logs are recorded in the terminal 

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

// for loop for creating the project pages
for (let i = 0; i < projects.length; ++i) {
    app.get(`/project_${projects[i].id}`, (req, res) => {
        res.render('project', { title: projects[i].project_name, description: projects[i].description, tools: projects[i].technologies, liveLink: projects[i].live_link, GitHub: projects[i].github_link, img: projects[i].image_urls[1] });
    });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*****************
  ERROR HANDLERS
******************/

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
}); 

app.listen(3000, () => {
    console.log("The application is working successfully on port 3000.");
});