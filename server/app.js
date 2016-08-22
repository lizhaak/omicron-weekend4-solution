var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

var server = app.listen(process.env.PORT || 3000, function () {
  // this function is a callback
  // using 'server' in here works b/c of Closure
  console.log('Listening on port %d ', server.address().port);
});
