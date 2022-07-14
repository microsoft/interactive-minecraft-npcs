const {
  Movements,
  goals: {
    GoalBlock
  }
} = require('mineflayer-pathfinder');

const openChest = (bot, chestBlock) => {
  return bot.openContainer(chestBlock)
    .then((container) => {
      return container
    })
    .catch((err) => {
      console.log(err)
      return;
    });
}

const closeChest = (bot, chestBlock) => {
  return new Promise((resolve, reject) => {
    try {
      chestBlock.close()
    } catch (err) {
      bot.closeWindow(chestBlock)
    } finally {
      resolve(chestBlock);
    }
  });

}

const getItemFromChest = async (bot, chestBlock, itemName, count = 1) => {
  const chest = await openChest(bot, chestBlock)
  const item = itemByName(chest.containerItems(), itemName)
  if (!item) {
    bot.chat(`I don't see ${ itemName } in this chest`)
    await closeChest(bot, chest)
    return;
  }
  try {
    await chest.withdraw(item.type, null, count)
  } catch (err) {
    bot.chat(`There's not enough ${itemName} in the chest`)
    console.log(err)
  } finally {
    await closeChest(bot, chest)
    return chestBlock
  };
}

const depositItemIntoChest = async (bot, chestBlock, itemName, count = 1) => {
  const chest = await bot.openContainer(chestBlock)
  const item = itemByName(chest.containerItems(), itemName)
  try {
    await chest.deposit(item.type, null, count)
  } catch (err) {
    bot.chat(`I dont have ${ itemName } to put in the chest`)
    console.log(err)
  } finally {
    await chest.close()
    return chestBlock
  };
}

const listItemsInChest = (bot, chestBlock) => {
  return bot.openContainer(chestBlock)
    .then((chest) => {
      const items = chest.containerItems()
      if (items.length > 0) {
        const output = items.map(itemToString).join(', ')
        return output;
      } else {
        return 'the chest is empty'
      }
    })
    .catch((err) => {
      console.log(err)
      return;
    })
}

function itemByName(items, name) {
  for (let i = 0; i < items.length; ++i) {
    const item = items[i]
    if (item && item.name === name) return item
  }
  return null
}

function itemToString(item) {
  return item && `${item.count} ${item.name}`
}

//export modules
module.exports = {
  depositItemIntoChest,
  getItemFromChest,
  listItemsInChest,
  openChest,
  closeChest,
};
