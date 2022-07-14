const {
  pathfinder,
  Movements,
  goals: { GoalNear },
} = require("mineflayer-pathfinder");

const registerPathfindingSkill = (bot) => {
  bot.loadPlugin(pathfinder);
};

const goToPlayer = (bot, range, username) => {
  const mcData = require("minecraft-data")(bot.version);
  const defaultMove = new Movements(bot, mcData);

  const target = bot.players[username]?.entity;
  if (!target) {
    bot.chat("I don't see you !");
    return;
  }
  const { x: playerX, y: playerY, z: playerZ } = target.position;

  bot.pathfinder.setMovements(defaultMove);
  return new Promise((resolve, reject) => {
    bot.pathfinder.goto(
      new GoalNear(playerX, playerY, playerZ, range ? range : 5),
      (err, _) => {
        if (err) {
          reject(false);
        } else {
          bot
            .lookAt(target.position.offset(0, target.height, 0))
            .then(() => resolve(true))
            .catch(() => reject(false));
        }
      }
    );
  });
};

//export modules
module.exports = {
  registerPathfindingSkill,
  goToPlayer,
};

// bot.pathfinder.goto(new GoalNear(target.position.x, target.position.y, target.position.z, 1), announceArrived)
