var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var tasks = require('./routes/tasks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// requests to /public are for static files
app.use('/public', express.static(__dirname + '/public/'));

// Our routes
app.use('/tasks', tasks);

// index file request
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/views/index.html");
});

var server = app.listen(process.env.PORT || 3000, function () {
  // this function is a callback
  // using 'server' in here works b/c of Closure
  console.log('Listening on port %d ', server.address().port);
});
