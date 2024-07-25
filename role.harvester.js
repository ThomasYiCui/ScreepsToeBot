let roleHarvester = {
    run: function(creep) {
        if(creep.room.find(FIND_HOSTILE_CREEPS, {filter: creep.body.length > creep.getActiveBodyparts(MOVE)}).length > 0) {
            creep.memory.hostile = 30;
        }
        if(creep.memory.hostile > 0) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 20, priority: 8, reusePath: 15});
            creep.memory.hostile-=1; 
            return;
        }
        if(creep.getActiveBodyparts(WORK) > 0 && creep.store[RESOURCE_ENERGY] > 0) {
            const repairs = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: structure => structure.hits < structure.hitsMax - 300 && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART
            });
            if(repairs.length > 0) {
                creep.repair(repairs[0]);
            }
        }
        if(creep.room.name !== creep.memory.roomToMine && creep.memory.roomToMine) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToMine), {range: 24, reusePath: 50, preferHighway: true, priority: 9.5});
            return;
        }
        if(creep.store.getCapacity() && creep.store.getFreeCapacity() <= creep.getActiveBodyparts(WORK) * 2 && creep.room.controller.my) {
            let linkToTransfer = Game.getObjectById(creep.memory.linkToTransfer);
            if(linkToTransfer && Memory.datas[creep.room.name]) {
                if(creep.transfer(linkToTransfer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE && creep.pos.getRangeTo(linkToTransfer) < 4 && creep.pos.getRangeTo(Game.getObjectById(creep.memory.sourceToMine)) < 2) {
                    creep.moveTo(linkToTransfer, {range: 1, priority: 9.7, reusePath: 15});
                    return;
                } else {
                    creep.memory.linkToTransfer = null;
                }
                let controllerLink = Game.getObjectById(Memory.datas[creep.room.name].controllerLink);
                if(controllerLink && controllerLink.store[RESOURCE_ENERGY] >= controllerLink.store.getCapacity() && controllerLink && creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 395000 && controllerLink.store[RESOURCE_ENERGY] < 750) {
                    if(linkToTransfer.transferEnergy(controllerLink) !== OK) {
                        let masterLink = Game.getObjectById(Memory.datas[creep.room.name].masterLink);
                        if(linkToTransfer.store[RESOURCE_ENERGY] >= linkToTransfer.store.getCapacity() && masterLink) {
                            linkToTransfer.transferEnergy(masterLink);
                        }
                    }
                } else {
                    let masterLink = Game.getObjectById(Memory.datas[creep.room.name].masterLink);
                    if(linkToTransfer.store[RESOURCE_ENERGY] >= linkToTransfer.store.getCapacity() && masterLink) {
                        linkToTransfer.transferEnergy(masterLink);
                    }
                }
            } else {
                let linkToTransfer = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_LINK && creep.pos.getRangeTo(structure) < 5;}});
                if(linkToTransfer) {
                    creep.memory.linkToTransfer = linkToTransfer.id;
                }
            }
            if(linkToTransfer) {
                return;
            }
        }
        if(!creep.store.getCapacity() && (creep.room.energyAvailable >= BODYPART_COST["move"] * 8 + BODYPART_COST["work"] * 8 + BODYPART_COST["carry"] * 5 && creep.getActiveBodyparts(WORK) <= 2 && Game.rooms[creep.memory.room].controller.level >= 5) || creep.room.energyAvailable >= BODYPART_COST["move"] * 8 + BODYPART_COST["work"] * 8 && creep.getActiveBodyparts(WORK) <= 2 && Game.rooms[creep.memory.room].controller.level < 5) {
            creep.suicide();
        }
        if(!Game.getObjectById(creep.memory.container) && Game.getObjectById(creep.memory.sourceToMine)) {
            let container = Game.getObjectById(creep.memory.sourceToMine).pos.findInRange(FIND_STRUCTURES, 1, {filter: (structure) => {return structure.structureType === STRUCTURE_CONTAINER}});
            if(container.length > 0) {
                creep.memory.container = container[0].id;
            }
        } else {
            if(Game.getObjectById(creep.memory.container) && Game.time % 3 === 0) {
                creep.moveTo(Game.getObjectById(creep.memory.container), {visualizePathStyle: {stroke: '#ffaa00'}, range: 0, reusePath: 150, priority: 9.9, maxRooms: 1});
            }
        }
        creep.reservePos(creep.pos, 55);
        if(Game.getObjectById(creep.memory.sourceToMine)) {
            creep.moveTo(Game.getObjectById(creep.memory.sourceToMine), {range: 1, priority: 40, maxRooms: 1})
            if(!Game.getObjectById(creep.memory.container) || Game.getObjectById(creep.memory.container).store.getFreeCapacity(RESOURCE_ENERGY) + creep.store.getFreeCapacity(RESOURCE_ENERGY) >= creep.getActiveBodyparts(WORK) * 2) {
                creep.harvest(Game.getObjectById(creep.memory.sourceToMine))
            }
        }
	}
};

module.exports = roleHarvester;
