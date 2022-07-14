const {
  registerPathfindingSkill,
  goToPlayer
} = require('./skills/pathfinding');
const {
  locateBlock
} = require('./skills/blockfinder');
const {
  mineBlock
} = require('./skills/blockminer');
const {
  getIngredients,
  createQueryPrompt
} = require('./skills/querying');
const {
  craftItem,
  equipItem
} = require('./skills/itembuilder');
const {
  isInInventory,
  getCount,
  listItems
} = require('./skills/inventory')
const {
  placeItem,
  dropItem
} = require('./skills/itemdropper')
const {
  depositItemIntoChest,
  getItemFromChest,
  listItemsInChest,
  openChest,
  closeChest
} = require('./skills/usechest')


// export all skills
module.exports = {
  registerPathfindingSkill,
  goToPlayer,
  locateBlock,
  mineBlock,
  craftItem,
  equipItem,
  isInInventory,
  getCount,
  listItems,
  getIngredients,
  createQueryPrompt,
  dropItem,
  placeItem,
  depositItemIntoChest,
  getItemFromChest,
  listItemsInChest,
  openChest,
  closeChest
}