let commands = `// This file contains Minecraft bot commands and the code needed to accomplish them using the Mineflayer JavaScript library. If asked something conversational, the bot should use bot.chat() to answer.

// go forward
bot.setControlState('forward', true);

// Stop moving
bot.clearControlStates();

// Now backward for a second
bot.setControlState('back', true)
setTimeout(() => {
    bot.clearControlStates();
}, 1000);

// nice!
bot.chat("Thanks!");

// How are you?
bot.chat("I'm great! How about you?");

// I'm good. What are you up to?
bot.chat("Just roaming around Minecraft");

// Jump!
bot.setControlState('jump', true);
bot.setControlState('jump', false);

// k now look at me
watchTarget();

// keep looking at me
watchInterval = setInterval(watchTarget, 50)

// ok stop
clearInterval(watchInterval);
bot.clearControlStates();

// Go to the right a bit
bot.setControlState('right', true);
setTimeout(() => {
    bot.clearControlStates();
}, 1000);

// come to me
goToPlayer(bot, 3, username)

// Now follow me!
goToPlayerInterval = setInterval(() => goToPlayer(bot, 3, username), 3000)

// good work!
bot.chat("Thanks!")

// Go to the grass
locateBlock(bot, 'grass', 0)
.then(success => success ? bot.chat("I found grass!") : _throw("I couldn't find grass!"))

// Open the chest
locateBlock(bot, 'chest', 1)
.then(chestBlock => openChest(bot, chestBlock))
.then(chestBlock => chestBlock ? bot.chat('Chest is opened!') : _throw('Chest is not opened!'))

// What items are in it?
locateBlock(bot, 'chest', 1)
.then(chestBlock => listItemsInChest(bot, chestBlock))
.then(response => bot.chat('Looks like ' + response))

// Put the furnace into the chest
locateBlock(bot, 'chest', 1)
.then(chestBlock => depositItemIntoChest(bot, chestBlock, 'furnace'))
.then(success => success ? bot.chat('The furnace is now in the chest!') : _throw('I couldnt put the furnace in the chest!'))

// Get one bread and 1 paper from the chest
locateBlock(bot, 'chest', 1)
.then(chestBlock => getItemFromChest(bot, chestBlock, 'bread', 1))
.then(chestBlock => getItemFromChest(bot, chestBlock, 'paper', 1))
.then(success => success ? bot.chat("I got a bread and a paper from the chest") : _throw("I couldn't get a bread and a paper from the chest"))

// Give me the paper
goToPlayer(bot, 3, username)
.then(success => success ? dropItem(bot, 'paper', 1) : _throw("I wasn't able to drop the paper!"))
.then(success => success && bot.chat("Here you go!"));

// Close it
locateBlock(bot, 'chest', 1)
.then(chestBlock => closeChest(bot, chestBlock))
.then(success => success ? bot.chat("Chest is all closed up!") : _throw("I couldnt close the chest!"))

// where are the cobblestones?
bot.chat("I'll see if I can find some")
locateBlock(bot, 'cobblestone', 0)

// OK, get some for me!
mineBlock(bot, 'cobblestone', 4)
.then(success => success ? goToPlayer(bot, 3, username) : _throw("I couldn't find any cobblestones!"))
.then(success => success ? bot.chat("I got 4 cobblestones!") : _throw("I couldn't get you the cobblestones!"));

// Craft a furnace
getIngredients(bot, 'furnace')
.then(ingredients => createQueryPrompt(bot, ingredients, 'Craft a furnace'))
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))
.then(_ => craftItem(bot, 'furnace', 1))
.then(_ => equipItem(bot, 'furnace'))
.then(success => success ? bot.chat("I made a furnace!") : _throw("I couldn't make the furnace"));

// Thanks!
bot.chat("No problem!");

// How many oak planks do you have?
createQueryPrompt(bot, {}, 'How many oak planks do you have')
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))

// How much iron do you have?
createQueryPrompt(bot, {}, 'How many iron ingots do you have')
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))

// what do i need to make a furnace
getIngredients(bot, 'furnace')
.then(ingredients => createQueryPrompt(bot, ingredients, 'What materials do I need to craft a furnace'))
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))
// Response: 8 cobblestones are needed to make a furnace

// do you have enough to craft a furnace
getIngredients(bot, 'furnace')
.then(ingredients => createQueryPrompt(bot, ingredients, 'Do I have enough materials to craft a furnace'))
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))
// Response: Yes, I have enough cobblestone to craft a furnace.

// How many more cobblestones to make one
createQueryPrompt(bot, {}, 'How many more cobblestones do I need to have 8 cobblestones')
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))

// Stand on that oak log
locateBlock(bot, 'oak_log', 0)
.then(success => success ? bot.chat("I'm standing on the oak log!") : _throw("I couldn't stand on the oak log!"))

// How long is a minecraft day?
bot.chat("A day in Minecraft is 20 minutes!");

// whats in your inventory
createQueryPrompt(bot, {}, 'What do you have in your inventory')
.then(queryPrompt => model.getCompletion(queryPrompt))
.then(completion => evaluateCode(completion, true))

`;

// export the commands
module.exports = commands;