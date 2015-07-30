var mongoose = require('mongoose');


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
  }

}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }

});


var recipeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    ingredients: [recipeIngredientSchema],
    cookingTime: String,
    servingSize: {
      type: String,
      required: true,
      default: 4
    },
    source_url: {
      type: String,
      unique: true,
      required: true
    },
    image_url: String,
    recipe_id: String,
    totalCalories: Number,
    percentProtein: Number, //grams
    percentCarbohydrates: Number,
    percentFat: Number,
    monoUnsaturatedFat: Number,
    polyUnsaturatedFat: Number,
    saturatedFat: Number,
    cholesterol: Number,
    vitaminC: Number,
    vitaminA: Number,
    vitaminB6: Number,
    vitaminB12: Number,
    calculated: {
      type: Boolean,
      required: true,
      default: false
    }


  }, {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }

  })
  // recipeIngredientSchema.virtual('vitaminAVal').get(function() {
  //   if (this.vitaminA.value) {
  //     return this.vitaminA.value;
  //   }

// })

// recipeSchema.virtual('vitaminA').get(function() {
//   var ing = this.ingredients;
//   var vitAVal = 0;
//   if (ing.length !== 0) {
//     ing.forEach(function() {

//       if (vitaminAVal.value) {
//         console.log("vitamin A: %s",
//           vitaminAVal.value)
//         vitAVal += vitaminAVal.value
//       }

//     })

//   }
//   return vitAVal;
// })
// recipeSchema.plugin(autopopulate);

var Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
