const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server, {path: '/nodejs-angular'});

// require module kết nối database
var connection = require('./common/connection');
var socket = require('./common/socket');
// require module router
var routesApi = require('./routes/routes-api');
var routerWeb = require('./routes/router-web');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// kết nối mysql
connection.init();
// gọi đến các router
routesApi.configure(app, io);
routerWeb.configure(app);
// gọi đến socket
socket.configure(io);
// start server cùng cổng 4200
server.listen(4201, function () {
    console.log('Server listening on port ' + server.address().port);
});



