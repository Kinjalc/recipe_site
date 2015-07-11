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
