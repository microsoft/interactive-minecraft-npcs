let Context = require('../Context');
const { recordInteraction } = require("../Log");
let recipeQuery = require('../context/sub-prompt');

// Gets ingredients needed to make specific minecraft resources given their name. Current implementation is a bit hacky, 
// given it takes the bot and has several requires that should be moved out. Returns a promise to enable .then chaining
function getIngredients(bot, itemName) {
  const {
    findItemOrBlockByName
  } = require('minecraft-data')(bot.version)
  const Recipe = require('prismarine-recipe')(bot.version).Recipe;
  const Item = require('prismarine-item')(bot.version);
  const item = findItemOrBlockByName(itemName);
  const recipes = Recipe.find(item.id, null);

  return new Promise((resolve, reject) => {
    if (recipes.length > 0) {
      let ingredients = recipes[0].delta;
      const output = ingredients.pop();
      resolve({
        output: new Item(output.id).name,
        amount: output.count,
        ingredients: [
          ...ingredients.map((item) => {
            const recipeItem = new Item(item.id)
            return {
              name: recipeItem.name,
              count: Math.abs(item.count)
            }
          })
        ]
      });
    } else {
      reject(new Error("Could not find recipe for " + itemName));
    }
  });
}

// Creates a prompt for the model that includes structured data and a question about that data. Returns a promise to enable .then chaining.
function createQueryPrompt(bot, data, question) {
  let context = new Context(
    recipeQuery +
      "// recipe = " +
      JSON.stringify(data) +
      "\n// inventory = " +
      JSON.stringify(
        (bot.currentWindow || bot.inventory)
          .items()
          .map((item) => ({ name: item.name, count: item.count }))
      )
  );
  recordInteraction(
    "query",
    bot.username,
    question,
    JSON.stringify({
      recipe: data,
      inventory: (bot.currentWindow || bot.inventory)
        .items()
        .map((item) => ({ name: item.name, count: item.count })),
    }),
    true
  );
  console.log(context.getContext());
  return Promise.resolve(context.craftPrompt(question));
}

// export recipes
module.exports = {
  getIngredients,
  createQueryPrompt
}
