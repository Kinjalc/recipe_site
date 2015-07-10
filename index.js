var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');

app.use(bodyParser.json());
app.use(jsonParser);

var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
  appId: 'a120429b',
  appKey: '3e1551bafdb518dba63b0555ac4f1482'

});

function processRemoteRecipe(error, response, body) {
  if (error) {
    console.log("processRemoteRecipes: ERROR = " + error);
  } else {
    console.log("processRemoteRecipes: status = " + response.statusCode);
    console.log("processRemoteRecipes: body = " + response.body);
    var body = JSON.parse(response.body);
    var recipe = body.recipe;
    var recipePublisher = recipe.publisher;
    var recipeIngredients = recipe.ingredients;

    if (recipePublisher === "All Recipes") {
      console.log("processRemoteRecipes: publisher recipes =  " + recipeIngredients);
      console.log("processRemoteRecipes: publisher recipes =  " + recipePublisher);

    }


  }

}

function getRemoteRecipe(recipe) {
  var recipeId = recipe.recipe_id;
  console.log("processOneRecipe : recipe id to make request " + recipeId);
  var recipeUrl = "http://food2fork.com/api/get?key=ef82898c8dec1bd923cf8abcec885398&rId=";
  recipeUrl += recipeId;
  request({
    url: recipeUrl,
    method: 'GET' //Specify the method

  }, processRemoteRecipe)

}

function handleListRecipes(error, response, body) {
  if (error) {
    console.log("handleListRecipes: ERROR = " + error);
  } else {
    console.log("handleListRecipes: status = " + response.statusCode);
    console.log("handleListRecipes: body = " + response.body);
    var body = JSON.parse(response.body);
    var count = body.count;
    var recipes = body.recipes;
    console.log("handleListRecipes: count = " + count);
    console.log("handleListRecipes: recipes = " + recipes);
    recipes.forEach(getRemoteRecipe);
  }
};

function listRecipes() {
  request_params = {
    url: 'http://food2fork.com/api/search?key=ef82898c8dec1bd923cf8abcec885398&page=1',
    // key: 'ef82898c8dec1bd923cf8abcec885398',
    // page: 1, //Query string data
    method: 'GET' //Specify the method

  };

  request(request_params, handleListRecipes);
};



app.get('/me', function(req, res) {
  listRecipes()
  //Lets configure and request
  // request({
  //   url: 'http://food2fork.com/api/search',
  //   key: 'ef82898c8dec1bd923cf8abcec885398',
  //   page: 1, //Query string data
  //   method: 'GET' //Specify the method

  // }, function(error, response, body) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log(response.statusCode, body);
  //     var parsedBody = JSON.parse(body);
  //     var recipes = parsedBody.recipes
  //     var promiseRecipeArray = [];
  //     recipes.forEach(function(recipe) {
  //       //   var recipeId = recipe.recipe_id;
  //       //   promiseRecipeArray.push(new Promise(function(resolve, response) {
  //       //     request({
  //       //       url: 'http://food2fork.com/api/get?key=ef82898c8dec1bd923cf8abcec885398&rId=35382',
  //       //       key: 'ef82898c8dec1bd923cf8abcec885398',
  //       //       rId: recipeId,
  //       //       method: 'GET' //Specify the method

  //       //     })

  //       //   }));
  //       // }

  //       // promiseRecipeArray.then(function(recipesArray) {
  //       //   return Promise.all(recipesArray)
  //       // Promise.all(promiseRecipeArray);
  //       // }).then(function(allrecipesResponse) {
  //       // res.json(allrecipesResponse);
  //       console.log("Recipe is " + recipe);
  //     }); // end of recipes.forEach
  //   }; // end of else

  //   // res.json(req || {});
  // }); // end of search for recipe request
});



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


// ef82898c8dec1bd923cf8abcec885398
