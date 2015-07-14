var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');
var Recipe = require('./models/recipe.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

// app.use(bodyParser.json());
// app.use(jsonParser);





var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
