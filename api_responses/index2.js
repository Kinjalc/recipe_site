var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');
var Recipe = require('./models/recipe.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');

app.use(bodyParser.json());
app.use(jsonParser);

var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
  appId: 'a120429b',
  appKey: '3e1551bafdb518dba63b0555ac4f1482'

});


//request to get nutrition information based on ingredients list.
function getIngredientNutrients(joinedIng, recipeId) {
  // for each ingredient in an array
  for (var i = 0; i < joinedIng.length; i++) {
    var ingBody = joinedIng[i];
    // var ingBody = joinedIng.join("\n");
    // console.log("joined ingredients sent for query are %j", ingBody)
    request({
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'X-APP-ID': 'a120429b',
        'X-APP-KEY': '3e1551bafdb518dba63b0555ac4f1482'
      },
      uri: {
        protocol: 'https:',
        slashes: true,
        auth: null,
        host: 'api.nutritionix.com',
        port: 443,
        hostname: 'api.nutritionix.com',
        hash: null,
        search: null,
        query: null,
        pathname: '/v2/natural',
        path: '/v2/natural',
        href: 'https://api.nutritionix.com/v2/natural'
      },
      body: ingBody

    }, function(error, response, body) {
      if (error) {
        console.log(" ERROR = " + error);
      } else {
        ///response is an object with results as a key and value as nutrition details
        console.log("nutrition status = " + response.statusCode);
        // console.log("nutrition: body = " + response.body);
        var res = response.body;
        res = JSON.parse(res);
        var result = res.results;
        //if ingredient format is not correct
        if (response.statusCode === 400) {


        } else if (response.statusCode === 200) {
          result.forEach(function(ingredient) {
            var nutrient = ingredient.nutrients;
            console.log("nutrient length is: " + nutrient.length);

            if (nutrient.length > 0) {
              //define variable and assign them values in the for -loop below
              var proteinValue;
              var proteinUnit;
              var carbohydratesValue;
              var carbohydratesUnit;
              var lipidValue;
              var lipidUnit;
              var polyUnsatValue;
              var polyUnsatUnit;
              var monoUnsatValue;
              var monoUnsatUnit;
              var satValue;
              var satUnit;
              var cholesterolValue;
              var cholesterolUnit;
              var ironValue;
              var ironUnit;
              var vitaminCValue;
              var vitaminCUnit;
              var vitaminAValue;
              var vitaminAUnit;
              var vitaminB6Value;
              var vitaminB6Unit;
              var vitaminB12Value;
              var vitaminB12Unit;


              //go through each nutrient in the array and look for the nutrients- carbs,lipids,etc
              for (var i = 0; i < nutrient.length; i++) {
                if (nutrient[i].name === "Protein") {
                  proteinValue = nutrient[i].value;
                  proteinUnit = nutrient[i].unit;
                  console.log("this is nutrient info for protein: %j%j ", proteinValue, proteinUnit);
                } else if (nutrient[i].name === "Carbohydrate, by difference") {
                  carbohydratesValue = nutrient[i].value;
                  carbohydratesUnit = nutrient[i].unit;
                  console.log("this is nutrient info for carbs: %j%j ", carbohydratesValue, carbohydratesUnit);
                } else if (nutrient[i].name === "Total lipid (fat)") {
                  lipidValue = nutrient[i].value;
                  lipidUnit = nutrient[i].unit;
                  console.log("this is nutrient info for lipid: %j%j ", lipidValue, lipidUnit);
                } else if (nutrient[i].name === "Fatty acids, total polyunsaturated") {
                  polyUnsatValue = nutrient[i].value;
                  polyUnsatUnit = nutrient[i].unit;
                  console.log("this is nutrient info for polyUnsat: %j%j ", polyUnsatValue, polyUnsatUnit);
                } else if (nutrient[i].name === "Fatty acids, total monounsaturated") {
                  monoUnsatValue = nutrient[i].value;
                  monoUnsatUnit = nutrient[i].unit;
                  console.log("this is nutrient info for monoUnsat: %j%j ", monoUnsatValue, monoUnsatUnit);
                } else if (nutrient[i].name === "Fatty acids, total monounsaturated") {
                  satValue = nutrient[i].value;
                  satUnit = nutrient[i].unit;
                  console.log("this is nutrient info for satValue: %j%j ", monoUnsatValue, monoUnsatUnit);
                } else if (nutrient[i].name === "Iron,FE") {
                  ironValue = nutrient[i].value;
                  ironUnit = nutrient[i].unit;
                  console.log("this is nutrient info for iron: %j%j ", monoUnsatValue, monoUnsatUnit);
                } else if (nutrient[i].name === "Vitamin C, total ascorbic acid") {
                  vitaminCValue = nutrient[i].value;
                  vitaminCUnit = nutrient[i].unit;
                  console.log("this is nutrient info for monoUnsat: %j%j ", vitaminCValue, vitaminCUnit);
                } else if (nutrient[i].name === "Vitamin B-6") {
                  vitaminB6Value = nutrient[i].value;
                  vitaminB6Unit = nutrient[i].unit;
                  console.log("this is nutrient info for B6: %j%j ", vitaminB6Value, vitaminB6Unit);
                } else if (nutrient[i].name === "Vitamin B-6") {
                  vitaminB6Value = nutrient[i].value;
                  vitaminB6Unit = nutrient[i].unit;
                  console.log("this is nutrient info for B6: %j%j ", vitaminB6Value, vitaminB6Unit);
                } else if (nutrient[i].name === "Vitamin B-12") {
                  vitaminB12Value = nutrient[i].value;
                  vitaminB12Unit = nutrient[i].unit;
                  console.log("this is nutrient info for B12: %j%j ", vitaminB12Value, vitaminB12Unit);
                } else if (nutrient[i].name === "Vitamin A, RAE") {
                  vitaminAValue = nutrient[i].value;
                  vitaminAUnit = nutrient[i].unit;
                  console.log("this is nutrient info for vitA: %j%j ", vitaminAValue, vitaminAUnit);
                }
              }

              var ingredientsInsert = {
                  name: ingBody,
                  protein: {
                    value: proteinValue,
                    unit: proteinUnit
                  },
                  carbohydrates: {
                    value: carbohydratesValue,
                    unit: carbohydratesUnit
                  },
                  fat: {
                    value: lipidValue,
                    unit: lipidUnit
                  },
                  monoUnsaturatedFat: {
                    value: monoUnsatValue,
                    unit: monoUnsatUnit
                  },
                  polyUnsaturatedFat: {
                    value: polyUnsatValue,
                    unit: polyUnsatUnit
                  },
                  saturatedFat: {
                    value: satValue,
                    unit: satUnit
                  },
                  cholesterol: {
                    value: cholesterolValue,
                    unit: cholesterolUnit
                  },
                  iron: {
                    value: ironValue,
                    unit: ironUnit
                  },
                  vitaminC: {
                    value: vitaminCValue,
                    unit: vitaminCUnit
                  },
                  vitaminA: {
                    value: vitaminAValue,
                    unit: vitaminAUnit
                  },
                  vitaminB6: {
                    value: vitaminB6Value,
                    unit: vitaminB6Unit
                  },
                  vitaminB12: {
                    value: vitaminB12Value,
                    unit: vitaminB12Unit
                  }
                }
                //   var ingredientInsert = {
                //     name: ingBody,


              //   }
              Recipe.update({
                recipe_name: recipeId
              }, {
                $push: {
                  ingredients: ingredientsInsert
                }
              }, function(err, ingredients) {
                if (err) {
                  console.error(err);
                } else {
                  console.log("success!");
                }
              });
            }

          })
        }
      }
    });
  };
};
//callback function from individual recipes.THIS IS THE RESPONSE WITH INDIVIDUAL RECIPE. From the response, it gets an array of ingredients which will be used to make an http request.
function processRemoteRecipe(error, response, body) {
  if (error) {
    console.log("processRemoteRecipes: ERROR = " + error);
  } else {
    // console.log("processRemoteRecipes: status = " + response.statusCode);
    // console.log("processRemoteRecipes: body = " + response.body);
    var body = JSON.parse(response.body);
    var recipe = body.recipe;
    var recipePublisher = recipe.publisher;
    var recipeIngredients = recipe.ingredients;
    //filtering recipes according to publishes so that it will easy to scrape methods from the same site.

    if (recipePublisher === "All Recipes") {
      console.log("processRemoteRecipes: publisher recipes =  " + recipeIngredients);
      console.log("processRemoteRecipes: publisher recipes =  " + recipePublisher);
      var recipe_id = recipe.recipe_id;
      var rec = Recipe.create({
        title: recipe.title,
        // ingredients: recipe.ingredients,
        source_url: recipe.source_url,
        image_url: recipe.image_url,
        recipe_id: recipe_id,
        method: "Whatever"
      });
      console.log("create recipe: %j", rec);

      // calls getIngredientNutrients to make a http request to get nutrition details
      getIngredientNutrients(recipeIngredients, recipe_id);

    }
  }

}
//make  http request to api to get individual revipe details
function getRemoteRecipe(recipe) {
  //stores the recipe id for each recipe and then uses it to make individual http calls
  var recipeId = recipe.recipe_id;
  var recipeUrl = "http://food2fork.com/api/get?key=ef82898c8dec1bd923cf8abcec885398&rId=";
  recipeUrl += recipeId;
  request({
    url: recipeUrl,
    method: 'GET'

  }, processRemoteRecipe)

}
//call back function after list of recipes. Use the recipe id for each recipe in the list to make individual http requests to get recipe details.
function handleListRecipes(error, response, body) {
  if (error) {

  } else {
    var body = JSON.parse(response.body);
    var count = body.count;
    var recipes = body.recipes;
    // console.log("handleListRecipes: count = " + count);
    // console.log("handleListRecipes: recipes = " + recipes);
    //make a request to get each recipe detail
    recipes.forEach(getRemoteRecipe);
    //for trial calling remoterecipes only for one recipe
    // getRemoteRecipe(recipes[2]);
  }
};

//Gets a list of recipes from api which will give recipe id and some other info for each recipe.

function listRecipes() {

  request_params = {
    url: 'http://food2fork.com/api/search?key=ef82898c8dec1bd923cf8abcec885398&page=1',
    // key: 'ef82898c8dec1bd923cf8abcec885398',
    // page: 1, //Query string data
    method: 'GET' //Specify the method

  };
  //make request to api to get list of recipes. handleListRecipes is the callback function
  request(request_params, handleListRecipes);

};



app.get('/me', function(req, res) {
  //invokes listRecipes
  listRecipes();
});



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


// ef82898c8dec1bd923cf8abcec885398