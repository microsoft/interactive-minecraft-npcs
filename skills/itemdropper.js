async function placeItem (bot, username, name) {
  await equipItem(bot, name, 'hand')
  target = bot.players[username].entity;
  x_pos_offset = 1
  if (target.position.x < bot.entity.position.x) { x_pos_offset = -1 }
  z_pos_offset = 1
  if (target.position.z < bot.entity.position.z) { z_pos_offset = -1 }
  position = bot.entity.position.offset(x_pos_offset, 0, z_pos_offset)
  const { Vec3 } = require('vec3')
  try {
    await bot.placeBlock(bot.blockAt(position), new Vec3(1, 0, 1))
    return true
  } catch (err) {
    // console.log(err.stack)
    return false
  }
}

async function dropItem (bot, name, amount = 1) {
  const item = itemByName(bot, name)

  try {
    if (!item) {
      bot.chat(`I have no ${ name }`)
      return false
    } else if (amount) {
      await bot.toss(item.type, null, amount)
    } else {
      await bot.tossStack(item)
    }
    return true
  } catch (err) {
    // if (err) {
    //   // bot.chat(`unable to toss: ${ err.message }`)
      return false
    // }
  }
}

async function equipItem (bot, name, destination) {
  const item = itemByName(bot, name)
  if (item) {
    try {
      await bot.equip(item, destination)
      return true
    } catch (err) {
      // bot.chat(`I cannot equip ${ name }: ${ err.message }`)
      return false
    }
  } else {
    // bot.chat(`I have no ${ name }`)
    return false
  }
}

function itemByName (bot, name) {
  const items = bot.inventory.items()
  if (require('minecraft-data')(bot.version).isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45])
  return items.filter(item => item.name === name)[0]
}

//export modules
module.exports = {
  dropItem,
  placeItem,
  equipItem
};