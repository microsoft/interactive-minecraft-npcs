/*
 * This function will help the bot find any block and move towards it
 */
const {
  Movements,
  goals: {
    GoalBlock
  }
} = require('mineflayer-pathfinder');

const locateBlock = async (bot, name, xDistance = 1, yDistance = 1) => {
  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  bot.pathfinder.setMovements(movements)
  if (mcData.blocksByName[name] === undefined) {
    bot.chat(name + " is not a block name")
    return
  }
  const ids = [mcData.blocksByName[name].id]
  const block = bot.findBlock({
    matching: ids,
    maxDistance: 128
  })
  if (!block) {
    bot.chat("I can't see any " + name + "!")
    return
  }
  const goal = new GoalBlock(
    block.position.x + xDistance,
    block.position.y + yDistance,
    block.position.z
  );
  try {
    await bot.pathfinder.goto(goal);
    await bot.pathfinder.stop();
  } catch (err) {
    console.log("Could not go to the desired location. This may be because the bot was interrupted with another goal.");
  }
  return block;
}

//export modules
module.exports = {
  locateBlock
};
