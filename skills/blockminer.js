/*
 * This function will help the bot collect any block
 */
const collectBlock = require('mineflayer-collectblock').plugin
const tool = require('mineflayer-tool').plugin

const mineBlock = (bot, name, count = 1) => {
  const mcData = require('minecraft-data')(bot.version)
  if (mcData.blocksByName[name] === undefined) {
    bot.chat(name + " is not a block name")
    return
  }

  const ids = [mcData.blocksByName[name].id]
  const blocks = bot.findBlocks({
    matching: ids,
    maxDistance: 128,
    count: count
  })

  if (blocks.length === 0) {
    bot.chat("I don't see that block nearby.")
    return
  }
  const targets = []
  for (let i = 0; i < Math.min(blocks.length, count); i++) {
    targets.push(bot.blockAt(blocks[i]))
  }
  // console.log(blocks)
  bot.loadPlugin(collectBlock)
  bot.loadPlugin(tool)

  // Promisifies bot.collectBlock.collect so that it can be used asynchronously
  return new Promise((resolve, reject) => {
    bot.collectBlock.collect(targets, (err, _) => {
      if (err) {
        bot.chat(err)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

//export modules
module.exports = {
  mineBlock
};