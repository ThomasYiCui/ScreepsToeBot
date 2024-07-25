function findEnemies(creep) {
    if(creep.getActiveBodyparts(RANGED_ATTACK) > 0 || creep.getActiveBodyparts(ATTACK) > 0) {
        let hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Power Bank" && creep.body.length > creep.getActiveBodyparts(MOVE)}});
        if(hostiles) {
            creep.memory.target = hostiles.id;
            return;
        }
    }
    hostiles = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Power Bank"}});
    if(hostiles) {
        creep.memory.target = hostiles.id;
        return;
    }
}
function findHeal(creep) {
    let creepToHeal = creep.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (creep) => {return creep.hits < creep.hitsMax}});
    return creepToHeal;
}
function findRampartToGuard(creep) {
    if(Game.getObjectById(creep.memory.target)) {
        let rampart = Game.getObjectById(creep.memory.target).pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_RAMPART}});
        if(rampart) {
            creep.memory.rampart = rampart.id;
        }
    }
}
module.exports = {
    run: function(creep) {
        if(creep.memory.roomToGoTo && creep.moveToRoom(creep.memory.roomToGoTo) == IN_ROOM) {
            findEnemies(creep);
            if(!creep.memory.rampart) {
                findRampartToGuard(creep);
            }
            if(creep.memory.target && creep.memory.rampart) {
                let rampart = null;
                if(creep.pos.x === Game.getObjectById(creep.memory.rampart).pos.x && creep.pos.y === Game.getObjectById(creep.memory.rampart).pos.y && creep.pos.roomName === Game.getObjectById(creep.memory.rampart).pos.roomName) {
                    rampart = creep.moveTo(Game.getObjectById(creep.memory.rampart), {range: 0, priority: 13, reusePath: 5})
                } else {
                    rampart = creep.moveTo(Game.getObjectById(creep.memory.rampart), {range: 0, priority: 12, reusePath: 5})
                }
                if(rampart === ERR_NO_PATH) {
                    creep.memory.rampart = null;
                }
                if(creep.attack(Game.getObjectById(creep.memory.target)) === ERR_NOT_IN_RANGE && creep.pos === Game.getObjectById(creep.memory.rampart).pos) {
                    creep.memory.rampart = null;
                }
                if(!Game.getObjectById(creep.memory.target)) {
                    creep.memory.target = null;
                }
                if(!Game.getObjectById(creep.memory.target)) {
                    creep.memory.rampart = null;
                }
            } else if(creep.memory.target && !creep.memory.rampart && Game.getObjectById(creep.memory.target)) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {range: 0, priority: 12})
                if(creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
                    if(creep.pos.inRangeTo(Game.getObjectById(creep.memory.target), 1)) {
                        creep.rangedMassAttack();
                    } else {
                        creep.rangedAttack(Game.getObjectById(creep.memory.target));
                    }
                } else if(creep.getActiveBodyparts(ATTACK) > 0) {
                    creep.attack(Game.getObjectById(creep.memory.target));
                } else {
                    creep.dismantle(Game.getObjectById(creep.memory.target))
                }
                if(!Game.getObjectById(creep.memory.target)) {
                    creep.memory.target = null;
                }
            } else if(!Game.getObjectById(creep.memory.target)) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToGoTo), {range: 15, reusePath: 50, preferHighway: true, priority: 9});
            }
            if(creep.getActiveBodyparts(HEAL) > 0 && findHeal(creep)) {
                creep.heal(findHeal(creep));
                if(!Game.getObjectById(creep.memory.target)) {
                    creep.moveTo(findHeal(creep), {range: 0, reusePath: 5, priority: 12});
                    return;
                }
            }
            if(!Game.getObjectById(creep.memory.target)) {
                let availableSpawns = Game.rooms[creep.room.name].find(FIND_MY_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_SPAWN && !s.spawning}})[0];
                if(availableSpawns) {
                    creep.moveTo(availableSpawns, {range: 1, reusePath: 50, preferHighway: true, priority: 9})
                    availableSpawns.recycleCreep(creep);
                }
            }
        }
    }
}
