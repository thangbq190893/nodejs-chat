const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

// kết nối mysql
connection.init();
// gọi đến các router
routesApi.configure(app, io);
routerWeb.configure(app);
// gọi đến socket
socket.configure(io);
// start server cùng cổng 4200
server.listen(4200, function () {
    console.log('Server listening on port ' + server.address().port);
});



