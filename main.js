var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var harvesters = 0;
var upgraders = 0;
var builders = 0;
var spawnRandom;
module.exports.loop = function () {
  for (var name in Game.rooms) {
    console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + " energy");
  }
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    } else if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    } else if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
  }
  if (Game.spawns["Buggy Land Home"].energy >= 150) {
    spawnRandom = Math.floor(Math.random() * 3);
    if (spawnRandom == 0) {
      Game.spawns["Buggy Land Home"].spawnCreep([WORK, CARRY, MOVE], "Upgrader" + upgraders, {memory: {role: "upgrader"}});
      upgraders++;
    } else if (spawnRandom == 1) {
      Game.spawns["Buggy Land Home"].spawnCreep([WORK, CARRY, MOVE], "Harvester" + harvesters, {memory: {role: "harvester"}});
      harvesters++;
    } else {
      Game.spawns["Buggy Land Home"].spawnCreep([WORK, CARRY, MOVE], "Builder" + builders, {memory: {role: "builder"}});
      builders++;
    }
  }
};
