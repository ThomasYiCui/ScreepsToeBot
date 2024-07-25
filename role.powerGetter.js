function findPower(creep) {
    let power = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {filter: (creep) => {return creep.resourceType === RESOURCE_POWER}});
    if(power) {
        creep.memory.target = power.id;
        return;
    }
    let ruins = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {return ruin.store[RESOURCE_POWER] > 0}});
    if(ruins) {
        creep.memory.target = ruins.id;
        return;
    }
}
module.exports = {
    run: function(creep) {
        if(!creep.memory.roomToGoTo || !creep.memory.room) {
            return;
        }
        if(!Game.getObjectById(creep.memory.target)) {
            findPower(creep);
        }
        if(creep.store.getFreeCapacity() > 0) {
            if(creep.room.name !== creep.memory.roomToGoTo) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToGoTo), {range: 20, reusePath: 50, priority: 11});
                return;
            }
            if(Game.getObjectById(creep.memory.target) && creep.withdraw(Game.getObjectById(creep.memory.target), RESOURCE_POWER) === ERR_NOT_IN_RANGE || creep.pickup(Game.getObjectById(creep.memory.target), RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {range: 1, priority: 100});
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToGoTo), {range: 20, reusePath: 50, priority: 11});
                return;
            }
        } else {
            if(creep.room.name !== creep.memory.room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 20, reusePath: 50, priority: 11});
                return;
            }
            if(creep.room.name === creep.memory.room) {
                creep.unloadExcess();
                return;
            }
        }
    }
}
