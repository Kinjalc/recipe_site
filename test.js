var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipes');
var Recipe = require('./models/recipe.js');

var calculateValues = function() {
  Recipe.find({
    // calculated: false
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
          // var satVal = 0;
          var vitCVal = 0;
          var vitAVal = 0;
          var vitB6Val = 0;
          var vitB12Val = 0;

          ingredientsArray.forEach(function(ingredient) {
            // console.log(ingredient.protein.value);
            if (ingredient.protein.value && ingredient.carbohydrates.value && ingredient.fat.value) {
              // console.log('values: ' + ingredient.protein.value);
              // console.log('values: ' + ingredient.carbohydrates.value);
              proteinVal += ingredient.protein.value;
              carbVal += ingredient.carbohydrates.value;
              fatVal += ingredient.fat.value;
              // console.log('cals: ' + proteinVal);
              // console.log('cals: ' + carbVal);
              // console.log('cals: ' + fatVal)
              monoUnSatVal += ingredient.monoUnsaturatedFat.value;
              polyUnSatVal += ingredient.polyUnsaturatedFat.value;
              // satVal += ingredient.saturatedFat.value;
              vitCVal += ingredient.vitaminC.value;
              vitAVal += ingredient.vitaminA.value;
              vitB6Val += ingredient.vitaminB6.value;
              vitB12Val += ingredient.vitaminB12.value;

            }

            // console.log(fatVal);
          });

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
              monoUnsaturatedFat: monoUnSatVal,
              polyUnsaturatedFat: polyUnSatVal,
              // saturatedFat: satVal,
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
