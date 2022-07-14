let commands = `// This script will answer questions given an input recipe and inventory. The script must make sure that all items required for a recipe are present in the inventory, otherwise it will say it is missing items. The script must make sure to ignore extraneous items in the inventory when answering questions.

// recipe = {}
// inventory = []
// Whats in your inventory
result = "My inventory is empty"
// Justification: The inventory is empty.

// recipe = {}
// inventory = []
// Do you have any stone
result = "No, I dont have any stone in my inventory"
// Justification: There are no stone items in the inventory.

// recipe = {}
// inventory = [{"name":"water_bucket","count":5}]
// What is in your inventory
result = "I have 5 water buckets in my inventory"
// Justification: There are 5 water buckets in the inventory.

// recipe = {}
// inventory = [{"name":"iron_ingots","count":4}]
// Do you have any iron ingots
result = "Yes, I have 4 iron ingots"
// Justification: There are 4 iron ingots in the inventory.

// recipe = {}
// inventory = [{"name":"dirt","count":5}]
// Do you have any cobblestones in your inventory
result = "No, I dont have any cobblestones in my inventory"
// Justification: There are no cobblestone items in the inventory.

// recipe = {"output":"diamond_pickaxe",amount:1,ingredients:[{"name":"diamond","count":3},{"name":"stick","count":2}]}
// inventory = []
// How do you craft a diamond pickaxe
result = "You need 3 diamonds and two sticks to make a diamond pickaxe."
// Justification: There are 3 diamonds and 2 sticks needed for a diamond pickaxe, so the script should say that.

// recipe = {"output":"diamond_pickaxe",amount:1,ingredients:[{"name":"diamond","count":3},{"name":"stick","count":2}]}
// inventory = [{"name":"diamond","count":2}]
// How many diamonds are needed to make a diamond pickaxe
result = "You need 3 diamonds total to make a diamond pickaxe."
// Justification: The question asks for how many total diamonds needed, there are 3 diamonds needed for a diamond pickaxe, so the script should say that.

// recipe = {"output":"furnace",amount:1,ingredients:[{"name":"cobblestone","count":8}]}
// inventory = [{"name":"cobblestone","count":2}]
// How many cobblestone are needed to make a furnace
result = "You need 8 cobblestones total to make a furnace."
// Justification: The question asks for how many total cobblestones needed, there are 8 cobblestones needed for a furnace, so the script should say that.

// recipe = {"output": "oak_planks", amount: 4, ingredients: [{"name": "oak_log", "count": 1}]}
// inventory = [{"name": "oak_log", "count": 2}]
// Make an oak plank
result = "I'll make some oak planks!"
// Justification: There is at least 1 oak log in the inventory, so it can make oak planks.

// recipe = {"output":"furnace", amount:1, ingredients:[{"name":"cobblestone","count":8}]}
// inventory = []
// How do you make a furnace
result = "You need 8 cobblestones to make a furnace."

// recipe = {"output":"furnace", amount:1, ingredients:[{"name":"cobblestone","count":8}]}
// inventory = [{"name":"cobblestone","count":8}]
// Craft a furnace
result = "OK, I'll craft you a furnace!"
// Justification: There are 8 cobblestones in the inventory, so it can make a furnace.

// recipe = {"output": "wooden_pickaxe", amount: 1, ingredients: [{"name": "stick", "count": 2}, {"name": "oak_plank", "count": 3}]}
// inventory = []
// Make a wooden pickaxe
result = "I don't have the ingredients needed for a wooden pickaxe!"
// Justification: There are not enough oak planks or sticks in the inventory to craft, the script will say it is missing items if the inventory does not contain enough items to craft the recipe.

// recipe = {"output":"compass", amount:1, ingredients:[{"name":"iron_ingots","count":4}, {"name":"redstone","count":1}]}
// inventory = []
// Do you know how to make a compass?
result = "Yes, you will need 4 iron ingots and 1 redstone to make a compass."

`;

// export the commands
module.exports = commands;
