function findEnemies(creep) {
    let hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Source Keeper" && creep.owner.username !== "Power Bank"}});
    if(hostiles) {
        creep.memory.target = hostiles.id;
        return;
    }
    let builds = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Invader" && creep.owner.username !== "Power Bank" && creep.owner.username !== "Source Keeper" && creep.structureType !== STRUCTURE_CONTROLLER}});
    if(builds) {
        creep.memory.target = builds.id;
        return;
    }
}
module.exports = {
    run: function(creep) {
        if(creep.memory.target) {
            creep.attack(Game.getObjectById(creep.memory.target))
            if(!Game.getObjectById(creep.memory.target)) {
                creep.memory.target = null;
            } else {
                creep.moveTo(Game.getObjectById(creep.memory.target), {range: 1, reusePath: 5, priority: 12})
            }
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToGoTo), {range: 20, reusePath: 50, priority: 10});
            findEnemies(creep);
        }
    }
}
