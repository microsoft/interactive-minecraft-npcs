async function craftItem (bot, name, amount=1) {
    amount = parseInt(amount, 10)
    const mcData = require('minecraft-data')(bot.version)
  
    const item = mcData.findItemOrBlockByName(name)

    const craftingTable = bot.findBlock({
        matching: mcData.blocksByName.crafting_table.id, 
        maxDistance: 128
    })
    // if (!craftingTable){
    //     bot.chat(`I don't have a crafting table`)
    //     return
    // }

    if (item) {
        // check if there is a recipe that does not require
        const recipe = bot.recipesFor(item.id, null, amount, craftingTable)[0]
        if (recipe) {
            // bot.chat(`I can make ${name}`)
            try {
              await bot.craft(recipe, amount, craftingTable)
            //   bot.chat(`Did the recipe for ${name} ${amount} times`)
            } catch (err) {
              //bot.chat(`Error making ${name}`)
              return false
            }
        } else {
          //bot.chat(`I cannot make ${name}`)
          return false
        }
    } else {
      //bot.chat(`Unknown item: ${name}`)
      return false
    }
    return true
  }

  async function equipItem (bot, name, destination) {
    const item = itemByName(bot, name)
    if (item) {
      try {
        await bot.equip(item, destination)
      } catch (err) {
        //bot.chat(`I cannot equip ${name}: ${err.message}`)
        return false
      }
    } else {
      //bot.chat(`I have no ${name}`)
      return false
    }
    return true
  }

function itemByName (bot, name) {
    const items = bot.inventory.items()
    if (require('minecraft-data')(bot.version).isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45])
    return items.filter(item => item.name === name)[0]
}

//export modules
module.exports = {
    craftItem,
    equipItem
  };