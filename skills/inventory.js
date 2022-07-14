function isInInventory(bot, name) {
    const items = getInventoryItems(bot)
    for (let i = 0; i < items.length; ++i) {
        if (items[i].name == name) {
            return true
        }
    }
    return false
}

function getCount(bot, name) {
    const items = getInventoryItems(bot)
    if (isInInventory(bot, name)) {
        return items.filter(item => item.name == name)[0].count
    } else {
        return 0
    }
    
}

function listItems (bot) {
    const items = getInventoryItems(bot)
    if (require('minecraft-data')(bot.version).isNewerOrEqualTo('1.9') && bot.inventory.slots[45]) items.push(bot.inventory.slots[45])
    
    const output = items.map(itemToString).join(', ')
    if (output) {
      bot.chat(output)
    } else {
      bot.chat('My inventory is empty')
    }
}

function getInventoryItems (bot) {
    const inventory = bot.currentWindow || bot.inventory
    return inventory.items()
}

function itemToString (item) {
    return item && `${item.count} ${item.name}`
}

//export modules
module.exports = {
    isInInventory,
    getCount,
    listItems
};