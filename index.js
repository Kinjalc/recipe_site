var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');
var Recipe = require('./models/recipe.js');
var mongoose = require('mongoose');
var cors = require('cors');



//mongoose.connect('mongodb://recipe:nutrilicious@ds033699.mongolab.com:33699/recipe_site');
var MongoURI = process.env.MONGO_URI || 'mongodb://localhost/recipes';
mongoose.connect(MongoURI, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('MongoDB connected successfully to ' + MongoURI);
  }
});

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

app.get('/recipes/nutrition/:nutritionPick', function(req, res) {
  var nutritionPick = req.params.nutritionPick;
  if (nutritionPick === "highFat") {
    Recipe.find({
      percentFat: {
        $gte: 50
      }
    }, function(err, recipes) {
      if (err) {
        res.send(err);
      } else {
        res.json(recipes);
      }
    })
  } else if (nutritionPick === "highProtein") {
    Recipe.find({
      percentProtein: {
        $gte: 30
      }
    }, function(err, recipes) {
      if (err) {
        res.send(err);
      } else {
        res.json(recipes);
      }
    })
  } else if (nutritionPick === "highCarbohydrates") {
    Recipe.find({
      percentCarbohydrates: {
        $gte: 50
      }
    }, function(err, recipes) {
      if (err) {
        res.send(err);
      } else {
        res.json(recipes);
      }
    })
  } else if (nutritionPick === "lowFat") {
    Recipe.find({
      percentFat: {
        $lte: 33
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


var server = app.listen(process.env.PORT || 3000);
});
