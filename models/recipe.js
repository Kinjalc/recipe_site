var mongoose = require('mongoose');
var autopopulate = require('mongoose-autopopulate');

var ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  basicQuantity: String,
  protein: {
    amount: String,
    dailyValue: String
  },
  carbohydrates: {
    amount: String,
    dailyValue: String
  },
  fat: {
    amount: String,
    dailyValue: String
  },
  //These values will be in %
  iron: String,
  vitaminC: String,
  vitaminA: String,
  calcium: String

})

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

var recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    ingredients: [recipeIngredientSchema],
    method: {
      type: String,
      required: true
    },
    cookingTime: String,
    servingSize: String,
    source_url: String,
    image_url: String,
    dailyProtein: Number, //percentage
    dailyCarbohydrates: Number,
    dailyTotalFat: Number,
    dailySatFat: Number,
    dailyUnsatFat: Number,
    totalCalories: Number,
    caloriesFat: Number,
    caloriesProtein: Number,
    caloriesCarbohydrates: Number

  })
  // recipeSchema.plugin(autopopulate);

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports()
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
