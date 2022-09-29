const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const foodRecipe = {
      title: "Vegetable Soup",
      level: "Easy Peasy",
      ingredients: ["carrots", "celery", "tomatoes", "potatoes", "green beans", "corn", "peas", "yellow onion", "garlic"],
      cuisine: "Portuguese",
      dishType: "soup",
      duration: 40,
      creator: "unknown",
    }
    return Recipe.create(foodRecipe);
  })
  .then(() => {
    console.log("succeed")
    return Recipe.insertMany(data);
  })
  .then((res) => {
    res.forEach((recipe) => {
      console.log(recipe.title);
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
  })
  .then((response)=> {
    console.log("successsfully updated duration for", response)
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("all steps done. time to close!")
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
