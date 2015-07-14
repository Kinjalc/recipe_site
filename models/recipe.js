var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');

// function getGrams(){

// }

var recipeIngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // basicQuantity: String,
  protein: {
    value: Number,
    unit: String
  },
  carbohydrates: {
    value: Number,
    unit: String
  },
  fat: {
    value: Number,
    unit: String
  },
  monoUnsaturatedFat: {
    value: Number,
    unit: String
  },
  polyUnsaturatedFat: {
    value: Number,
    unit: String
  },
  saturatedFat: {
    value: Number,
    unit: String
  },
  cholesterol: {
    value: Number,
    unit: String
  },
  iron: {
    value: Number,
    unit: String
  },
  vitaminC: {
    value: Number,
    unit: String
  },
  vitaminA: {
    value: Number,
    unit: String
  },
  vitaminB6: {
    value: Number,
    unit: String
  },
  vitaminB12: {
    value: Number,
    unit: String
  },

});


var recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    ingredients: [recipeIngredientSchema],
    cookingTime: String,
    servingSize: String,
    source_url: String,
    image_url: String,
    recipe_id: String,
    totalCalories: Number,
    // caloriesFat: Number,
    // caloriesProtein: Number,
    // caloriesCarbohydrates: Number,
    percentProtein: Number, //grams
    percentCarbohydrates: Number,
    percentFat: Number,
  // totalUnsatFat: Number,
  // totalSatFat: Number,
  // monoUnsaturatedFat:
  // polyUnsaturatedFat: Number
  // saturatedFat: Number
  // cholesterol: Number
  // iron: Number
  // vitaminC: Number
  // vitaminA: Number
  // vitaminB6: Number
  // vitaminB12: Number
    calculated: {
      type: Boolean,
      required: true,
      default: false
    }

  })
  // recipeSchema.plugin(autopopulate);

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
///model recipe request which is returned from api
// "recipe": {
//     "publisher": "The Pioneer Woman",
//     "f2f_url": "http://food2fork.com/view/47024",
//     "ingredients": [
//       "1 pound Ground Coffee (good, Rich Roast)",
//       "8 quarts Cold Water",
//       "Half-and-half (healthy Splash Per Serving)",
//       "Sweetened Condensed Milk (2-3 Tablespoons Per Serving)",
//       "Note: Can Use Skim Milk, 2% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!"
//     ],
//     "source_url": "http://thepioneerwoman.com/cooking/2011/06/perfect-iced-coffee/",
//     "recipe_id": "47024",
//     "image_url": "http://static.food2fork.com/icedcoffee5766.jpg",
//     "social_rank": 100,
//     "publisher_url": "http://thepioneerwoman.com",
//     "title": "Perfect Iced Coffee"
