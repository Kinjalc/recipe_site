var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');
var Recipe = require('./models/recipe.js');

var calculateValues = function() {
  Recipe.find({}, function(err, recipes) {
    if (recipes) {
      // console.log("1 " + recipes);
      recipes.forEach(function(recipe) {

        // console.log("2 " + recipe);


        var recipeFindId = recipe.id
        var ingredientsArray = recipe.ingredients;
        if (ingredientsArray.length !== 0) {
          // console.log("4 " + ingredientsArray);
          var proteinVal = 0;
          var carbVal = 0;
          var fatVal = 0;
          ingredientsArray.forEach(function(ingredient) {
            // console.log(ingredient.protein.value);
            if (ingredient.protein.value && ingredient.carbohydrates.value && ingredient.fat.value) {

              proteinVal += ingredient.protein.value;
              carbVal += ingredient.carbohydrates.value;
              fatVal += ingredient.fat.value;
            }

            // console.log(fatVal);
          });
          // console.log('cals: ' + proteinVal);
          // console.log('cals: ' + carbVal);
          // console.log('cals: ' + fatVal);
          var totalCal = (4 * proteinVal) + (4 * carbVal) + (9 * fatVal);

          var totalProtPerc = (((proteinVal * 4) / totalCal)) * 100;


          var totalCarbPerc = (((carbVal * 4) / totalCal)) * 100;


          var totalFatPerc = (((fatVal * 9) / totalCal)) * 100;


          // console.log('cals: ' + totalCal);
          Recipe.update({
            _id: recipeFindId
          }, {
            $set: {
              totalCalories: totalCal,
              percentProtein: totalProtPerc,
              percentCarbohydrates: totalCarbPerc,
              percentFat: totalFatPerc,
              calculated: true

            }
          }, {
            upsert: true,
            multi: true
          }, function(err, ingredients) {
            if (err) {
              console.error(err);
            } else {
              console.log("ingredient updated!");
            }
          });
        }

      })
    }

  })
}

calculateValues();
