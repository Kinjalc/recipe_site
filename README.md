# recipe_site
Author: Kinjal Chauhan
App: Recipe app with MEAN stack - node backend, angular frontend
User story: app that lets user filter recipes based on nutritional content
i.e high protein content,low protein content low carbohydrates, etc


Description: This app lets users search for recipes based on the nutritional content of each recipe which is differentiates this app from the other recipe sites which sorts based on daily values.


Details: In this app, the majority of focus is on seeding the data in MongoDB. There are 3 api requests made sequentially and then data is seeded. The first api request(Food2Fork) gives a list of recipes with recipe ids and name. Using the recipe id second request is made to get entire details of the recipe like ingredients, pics, method url,etc. Using the ingredients array , individual requests are made to nutritionix for nutritional information. Nutritional information for the recipe is calculated from each ingredient response and added to the database. This is in api_database.js file. The data is populated by running api_database.js.

Filtering is based on percentage values of fat, protein or carbohydrate in the recipe i.e. the percentage of that particular nutrition component(chosen by user) should be higher or lower wrt rest of the components.


