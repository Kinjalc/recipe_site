var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var request = require('request');
// request.debug = true;
// require("request-debug")(request);
var Recipe = require('./models/recipe.js');
var mongoose = require('mongoose');


var MongoURI = process.env.MONGO_URI || 'mongodb://localhost/recipes';
mongoose.connect(MongoURI, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + MongoURI + '. ' + err);
  } else {
    console.log('MongoDB connected successfully to ' + MongoURI);
  }
});

app.use(bodyParser.json());
app.use(jsonParser);

var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
  appId: 'a120429b', //'1e6399d7',
  appKey: '3e1551bafdb518dba63b0555ac4f1482' //'4088d6a1aca0376052356e4872c24b68'

});
var calculateValues = function() {
  // recipes = [{
  //   "_id": "55bb96c8b608931f120783b3",
  //   "title": "Banana Banana Bread",
  //   "source_url": "http://allrecipes.com/Recipe/Banana-Banana-Bread/Detail.aspx",
  //   "image_url": "http://static.food2fork.com/254186ea50.jpg",
  //   "recipe_id": "2734",
  //   "__v": 0,
  //   "calculated": false,
  //   "servingSize": "4",
  //   "ingredients": [{
  //     "name": "1 teaspoon baking soda",
  //     "_id": "55bb96c9b608931f120783c8",
  //     "vitaminB12": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 0
  //     },
  //     "carbohydrates": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "id": "55bb96c9b608931f120783c8"
  //   }, {
  //     "name": "1/4 teaspoon salt",
  //     "_id": "55bb96c9b608931f120783ca",
  //     "vitaminB12": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 0
  //     },
  //     "carbohydrates": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "id": "55bb96c9b608931f120783ca"
  //   }, {
  //     "name": "2 cups all-purpose flour",
  //     "_id": "55bb96c9b608931f120783d2",
  //     "vitaminB12": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0.10999999999999999,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 0.3875,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 1.0325,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 0.21749999999999997,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 2.45
  //     },
  //     "carbohydrates": {
  //       "value": 190.775,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 25.825,
  //       "unit": "g"
  //     },
  //     "id": "55bb96c9b608931f120783d2"
  //   }, {
  //     "name": "1/2 cup butter",
  //     "_id": "55bb96cab608931f120783d8",
  //     "vitaminB12": {
  //       "value": 0.19295,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0.003405,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 776.34,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 58.30268000000001,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 3.453805,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 23.858835,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 92.05985000000001
  //     },
  //     "carbohydrates": {
  //       "value": 0.0681,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 0.96475,
  //       "unit": "g"
  //     },
  //     "id": "55bb96cab608931f120783d8"
  //   }, {
  //     "name": "2 1/3 cups mashed overripe bananas",
  //     "_id": "55bb96cab608931f120783dc",
  //     "id": "55bb96cab608931f120783dc"
  //   }, {
  //     "name": "2 eggs, beaten",
  //     "_id": "55bb96cab608931f120783dd",
  //     "vitaminB12": {
  //       "value": 0.89,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0.17,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 160,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 3.126,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 1.911,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 3.658,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 9.51
  //     },
  //     "carbohydrates": {
  //       "value": 0.72,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 12.56,
  //       "unit": "g"
  //     },
  //     "id": "55bb96cab608931f120783dd"
  //   }, {
  //     "name": "3/4 cup brown sugar",
  //     "_id": "55bb96cab608931f120783df",
  //     "vitaminB12": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminB6": {
  //       "value": 0.067896,
  //       "unit": "mg"
  //     },
  //     "vitaminA": {
  //       "value": 0,
  //       "unit": "µg"
  //     },
  //     "vitaminC": {
  //       "value": 0,
  //       "unit": "mg"
  //     },
  //     "saturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "polyUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "monoUnsaturatedFat": {
  //       "value": 0,
  //       "unit": "g"
  //     },
  //     "fat": {
  //       "value": 0
  //     },
  //     "carbohydrates": {
  //       "value": 162.43703999999997,
  //       "unit": "g"
  //     },
  //     "protein": {
  //       "value": 0.19871999999999998,
  //       "unit": "g"
  //     },
  //     "id": "55bb96cab608931f120783df"
  //   }],
  //   "id": "55bb96c8b608931f120783b3"
  // }]
  Recipe.find({
    _id: "55bb96c8b608931f120783b2",
    // source_url: source_Url
    //calculated: false
  }, function(err, recipes) {
    if (recipes) {
      // console.log("1 " + recipes);
      recipes.forEach(function(recipe) {
        var recipeFindId = recipe.id
        var ingredientsArray = recipe.ingredients;
        if (ingredientsArray.length !== 0) {
          // console.log("4 " + ingredientsArray);
          var proteinVal = 0;
          var carbVal = 0;
          var fatVal = 0;
          var monoUnSatVal = 0;
          var polyUnSatVal = 0;
          var satVal = 0;
          var vitCVal = 0;
          var vitAVal = 0;
          var vitB6Val = 0;
          var vitB12Val = 0;

          ingredientsArray.forEach(function(ingredient) {
            // console.log(ingredient.protein.value);
            console.log('values: ' + ingredient.protein.value);
            console.log('values: ' + ingredient.carbohydrates.value);
            if (ingredient.protein) {
              proteinVal += ingredient.protein.value || 0;
            }
            if (ingredient.carbohydrates) {
              carbVal += ingredient.carbohydrates.value || 0;
            }
            if (ingredient.fat) {
              fatVal += ingredient.fat.value || 0;
            }
            // console.log('cals: ' + proteinVal);
            // console.log('cals: ' + carbVal);
            // console.log('cals: ' + fatVal)
            if (ingredient.saturatedFat) {
              satVal += ingredient.saturatedFat.value || 0;
            }
            if (ingredient.polyUnsaturatedFat) {
              polyUnSatVal += ingredient.polyUnsaturatedFat.value || 0;
            }
            if (ingredient.monoUnsaturatedFat) {
              monoUnSatVal += ingredient.monoUnsaturatedFat.value || 0;
            }
            // satVal += ingredient.saturatedFat.value;
            if (ingredient.vitaminC) {
              vitCVal += ingredient.vitaminC.value || 0;
            }
            if (ingredient.vitaminA) {
              vitAVal += ingredient.vitaminA.value || 0;
            }
            if (ingredient.vitaminB6) {
              vitB6Val += ingredient.vitaminB6.value || 0;
            }
            if (ingredient.vitaminB12) {
              console.log("came here");
              console.log(ingredient.vitaminB12);
              vitB12Val += ingredient.vitaminB12.value || 0;
            }

            // console.log(fatVal);
          });

          var totalCal = (4 * proteinVal) + (4 * carbVal) + (9 * fatVal);

          var totalProtPerc = (((proteinVal * 4) / totalCal)) * 100;


          var totalCarbPerc = (((carbVal * 4) / totalCal)) * 100;


          var totalFatPerc = (((fatVal * 9) / totalCal)) * 100;

          console.log("Here are the values:");
          console.log(totalCal);
          console.log(proteinVal);
          console.log(carbVal);
          console.log(fatVal);
          // console.log('cals: ' + totalCal);
          Recipe.update({
            _id: recipeFindId
          }, {
            $set: {
              totalCalories: totalCal,
              percentProtein: totalProtPerc,
              percentCarbohydrates: totalCarbPerc,
              percentFat: totalFatPerc,
              monoUnsaturatedFat: monoUnSatVal,
              polyUnsaturatedFat: polyUnSatVal,
              saturatedFat: satVal,
              vitaminC: vitCVal,
              vitaminA: vitAVal,
              vitaminB6: vitB6Val,
              vitaminB12: vitB12Val,
              calculated: true

            }
          }, {
            upsert: true,
            multi: true
          }, function(err, ingredients) {
            if (err) {
              console.error(err);
              console.log("Recipe id is");
              console.log(recipeFindId);
            } else {
              console.log("ingredient updated!");
            }
          });
        }

      })
    }

  })
}

function processNutrientsHandler(ingredient, sourceUrl, ingBody) {
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
    for (var j = 0; j < nutrient.length; j++) {
      if (nutrient[j].name === "Protein") {
        proteinValue = nutrient[j].value;
        proteinUnit = nutrient[j].unit;
        //console.log("this is nutrient info for protein: %j%j ", proteinValue, proteinUnit);
      } else if (nutrient[j].name === "Carbohydrate, by difference") {
        carbohydratesValue = nutrient[j].value;
        carbohydratesUnit = nutrient[j].unit;

      } else if (nutrient[j].name === "Total lipid (fat)") {
        lipidValue = nutrient[j].value;

      } else if (nutrient[j].name === "Fatty acids, total polyunsaturated") {
        polyUnsatValue = nutrient[j].value;
        polyUnsatUnit = nutrient[j].unit;

      } else if (nutrient[j].name === "Fatty acids, total monounsaturated") {
        monoUnsatValue = nutrient[j].value;
        monoUnsatUnit = nutrient[j].unit;

      } else if (nutrient[j].name === "Fatty acids, total saturated") {
        satValue = nutrient[j].value;
        satUnit = nutrient[j].unit;
        //console.log("this is nutrient info for satValue: %j%j ", monoUnsatValue, monoUnsatUnit);
      } else if (nutrient[j].name === "Iron,FE") {
        ironValue = nutrient[j].value;
        ironUnit = nutrient[j].unit;

      } else if (nutrient[j].name === "Vitamin C, total ascorbic acid") {
        vitaminCValue = nutrient[j].value;
        vitaminCUnit = nutrient[j].unit;

      } else if (nutrient[j].name === "Vitamin B-6") {
        vitaminB6Value = nutrient[j].value;
        vitaminB6Unit = nutrient[j].unit;

      } else if (nutrient[j].name === "Vitamin B-12") {
        vitaminB12Value = nutrient[j].value;
        vitaminB12Unit = nutrient[j].unit;

      } else if (nutrient[j].name === "Vitamin A, RAE") {
        vitaminAValue = nutrient[j].value;
        vitaminAUnit = nutrient[j].unit;

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
        // cholesterol: {
        //   value: cholesterolValue,
        //   unit: cholesterolUnit
        // },
        // iron: {
        //   value: ironValue,
        //   unit: ironUnit
        // },
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
    var recipeUpdate = Recipe.update({
      source_url: sourceUrl
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


}





function getIngredientNutrients(joinedIng, sourceUrl, finalCallback) {
  joinedIng.forEach(function(ing) {
    var ingBody = ing;
    // var ingBody = joinedIng.join("\n");
    console.log("joined ingredient sent for query are %j", ingBody)
    var getNutrientInfoRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'X-APP-ID': 'a120429b', //'1e6399d7',
        'X-APP-KEY': '3e1551bafdb518dba63b0555ac4f1482' //'4088d6a1aca0376052356e4872c24b68'
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

    };
    request(getNutrientInfoRequest, function(error, response, body) {
      if (error) {
        console.log(" ERROR = " + error);
        finalCallback(e);
      } else {
        ///response is an object with results as a key and value as nutrition details
        console.log("1: nutrition status = " + response.statusCode);
        // console.log("nutrition: body = " + response.body);
        var res = response.body;
        res = JSON.parse(res);
        var result = res.results;
        //if ingredient format is not correct
        if (response.statusCode === 400) {
          console.log("Bad request code " + response.statusCode);
          var badReqIngredient = ingBody;
          badReqIngredient = badReqIngredient.replace(/boneless|skinless|shredded|peeled|sliced|pounded|diced|pitted|melted|powdered|flavoured|flavoring|cleaned|keep|refrigerated|chilled|cold|whole|new|and|grated|room|temperature|thawed|frozen|coarsely|chopped|confectioners'|white|softened|mashed|beaten|canned|drained|lightly|uncooked|peeled|ripe|mashed|,/ig, function replacer(match) {

            return "";
          });
          console.log("2: %j", badReqIngredient)
          badReqIngredient = badReqIngredient.replace(/pound|pounds/ig, function replaceValues(match) {
            return "lb"
          });
          console.log("3: %j", badReqIngredient)
          badReqIngredient = badReqIngredient.replace(/ounce|ounces/ig, function replaceValues(match) {
            return "oz"
          })

          badReqIngredient = badReqIngredient.replace(/ *\([^)]*\) */g, "");



          request({
            // jar: null,
            method: 'POST',
            headers: {
              'Content-Type': 'text/plain',
              'X-APP-ID': 'a120429b', //'1e6399d7',
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
            body: badReqIngredient

          }, function(error, resp, body) {
            if (error) {
              console.log(" ERROR = " + error);
              finalCallback(error);
            } else {

              ///response is an object with results as a key and value as nutrition details


              var res = resp.body;
              res = JSON.parse(res);
              var result = res.results;
              if (resp.statusCode === 200) {
                console.log("4 nutrition status = " + resp.statusCode);
                console.log("5b badReqIngredient %j", ingBody)
                result.forEach(function(ingredient) {
                  processNutrientsHandler(ingredient, sourceUrl, ingBody)
                })
                finalCallback(null, result);
              } else {
                console.log("6: ingBody %j", ingBody)
                var ingredientsInsert = {
                  name: ingBody
                }
                var recipeUpdate = Recipe.update({
                  source_url: sourceUrl
                }, {
                  $push: {
                    ingredients: ingredientsInsert
                  }
                }, function(err, ingredients) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(" bad ing success!");
                  }
                })
              }

            }
          })


        } else if (response.statusCode === 200) {
          result.forEach(function(ingredient) {
            processNutrientsHandler(ingredient, sourceUrl, ingBody)
          })
          finalCallback(null, result);
        }
      }
    });

  });
}




//callback function from individual recipes.THIS IS THE RESPONSE WITH INDIVIDUAL RECIPE. From the response, it gets an array of ingredients which will be used to make an http request.
function processRemoteRecipe(error, response, body) {
  if (error) {
    console.log("processRemoteRecipes: ERROR = " + error);
  } else {

    var body = JSON.parse(response.body);
    var recipe = body.recipe;
    var recipePublisher = recipe.publisher;
    var recipeIngredients = recipe.ingredients;
    //filtering recipes according to publishes so that it will easy to scrape methods from the same site.

    if (recipePublisher === "All Recipes") {

      var source_url = recipe.source_url;
      var rec = Recipe.create({
        title: recipe.title,
        // ingredients: recipe.ingredients,
        source_url: recipe.source_url,
        image_url: recipe.image_url,
        recipe_id: recipe.recipe_id
      });
      console.log("create recipe: %j", rec);

      // calls getIngredientNutrients to make a http request to get nutrition details
      // getIngredientNutrients(recipeIngredients, source_url, function(r) {
      //   return;
      // });

      (new Promise(function(resolve, reject) {
        getIngredientNutrients(recipeIngredients, source_url, function(e, r) {
          if (e) {
            return reject(e);
          }
          resolve(r);
        });
      })).then(function() {
        calculateValues();
      }).catch(function(err) {

      });
    }

  }
}


//make  http request to api to get individual revipe details
function getRemoteRecipe(recipe) {
  console.log("getRemoteRecipe:")
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

    recipes.forEach(getRemoteRecipe);
  }
};

//Gets a list of recipes from api which will give recipe id and some other info for each recipe.

function listRecipes() {

  request_params = {
    url: 'http://food2fork.com/api/search?key=ef82898c8dec1bd923cf8abcec885398&page=1',

    method: 'GET'

  };
  //make request to api to get list of recipes. handleListRecipes is the callback function
  request(request_params, handleListRecipes);

};




//invokes listRecipes
// listRecipes();
calculateValues();



var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
