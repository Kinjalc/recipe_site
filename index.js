var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');
var Recipe = require('./models/recipe.js');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.connect('mongodb://localhost/recipes');


// var corsOptions = {
//   methods: ['GET', 'PUT', 'POST'],
//   origin: 'http://localhost:000/',
//   credentials: true
// };

//app.use(cors(corsOptions))
app.use(cors());
app.use(bodyParser.json());
app.use(jsonParser);

app.get('/recipes', function(req, res) {

  Recipe.find({}, function(err, recipes) {
    if (err) {
      res.send(err);
    } else {
      res.json(recipes);
    }
  })
});

app.get('/recipes/:recipeId', function(req, res) {
  var recipeId = req.params.recipeId;
  Recipe.find({
    _id: recipeId
  }, function(err, recipe) {
    if (err) {
      res.send(err);
    } else {
      res.json(recipe);
    }
  })
});

app.get('/:nutritionPick', function(req, res) {
  var nutritionPick = req.params.nutritionPick;
  if (nutritionPick === "highFat") {
    Recipe.find({
      percentFat: {
        $gte: 34
      }
    }, function(err, recipes) {
      if (err) {
        res.send(err);
      } else {
        res.json(recipes);
      }
    })
  }


  // Recipe.find({
  //   percentFat: {
  //     $gte: 34
  //   }
  // }, function(err, recipes) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json(recipes);
  //   }
  // })

});


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
