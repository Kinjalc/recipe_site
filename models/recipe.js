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
  ingredients: [{
    quantity: Number,
    ingredient: {
      type: ObjectId,
      ref: 'ingredients',
      autopopulate: true
    }
  }],
  method: {
    type: String,
    required: true
  },
  cookingTime: String,
  servingSize: String,

})
recipeSchema.plugin(autopopulate);

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports()
