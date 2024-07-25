function unloadExcess(creep) {
    if(creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < 10000) {
        for(let h in creep.store) {
            if(creep.transfer(creep.room.terminal, h) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
            } else {
                creep.memory.target = null;
            }
            return;
        }
    }
    if(creep.room.storage) {
        for(let h in creep.store) {
            if(creep.transfer(creep.room.storage, h) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
            } else {
                creep.memory.target = null;
            }
            return;
        }
    }
    if(creep.room.terminal) {
        for(let h in creep.store) {
            if(creep.transfer(creep.room.terminal, h) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
            } else {
                creep.memory.target = null;
            }
            return;
        }
    }
}
let roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity() > 0) {
            creep.memory.hauling = false;
        } else if(creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = true;
        }
        if((creep.room.find(FIND_HOSTILE_CREEPS, {filter: creep.body.length > creep.getActiveBodyparts(MOVE)}).length > 0 || creep.hits < creep.hitsMax).length && creep.room.name !== creep.memory.room) {
            creep.memory.hostile = 30;
            return;
        }
        if(creep.memory.hostile > 0) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 20, reusePath: 50, preferHighway: true, priority: 15});
            creep.memory.hostile-=1;
            return;
        }
        let resource = Game.getObjectById(creep.memory.resource);
	    if(creep.memory.hauling) {
	        if(resource) {
	            creep.getEnergy(resource);
                if(!resource || resource.store && resource.store[RESOURCE_ENERGY] <= 0) {
                    creep.memory.resource = null;
                }
	            return;
	        }
	        if(creep.room.name !== creep.memory.rth && creep.memory.rth) {
	            creep.moveTo(new RoomPosition(25, 25, creep.memory.rth), {range: 20, reusePath: 15, priority: 7.5});
	            return;
	        }
            if(!resource) {
                resource = Game.getObjectById(creep.findEnergy());
                creep.memory.resource = creep.findEnergy();
            }
            if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
                if(creep.room.name === resource.room.name) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2, maxRooms: 1});
                } else {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2});
                }
                return;
            }
            if(!resource || !resource.store || resource.store[RESOURCE_ENERGY] <= 16) {
                creep.memory.resource = null;
            }
            if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                if(creep.room.name === resource.room.name) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2, maxRooms: 1});
                } else {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2});
                }
                return;
            }
            creep.moveTo(new RoomPosition(25, 25, creep.memory.rth), {range: 20, reusePath: 15, priority: 7.5});
            creep.memory.resource = null;
        } else {
            if(creep.getActiveBodyparts(WORK) > 0 && !Game.getObjectById(creep.memory.target)) {
                let fixNow = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType !== STRUCTURE_CONTROLLER && structure.hits < 2000 && structure.hits < structure.hitsMax}});
                if(fixNow) {
                    creep.repair(fixNow);
                    creep.moveTo(fixNow, {priority: 8, range: 3});
                    return;
                }
                const repairs = creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: structure => structure.hits <= structure.hitsMax * 0.8 && structure.structureType !== STRUCTURE_WALL && structure.structureType !== STRUCTURE_RAMPART && structure.structureType !== STRUCTURE_CONTROLLER
                });
                if(repairs.length > 0) {
                    creep.repair(repairs[0]);
                } else {
                    const builds = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(builds.length > 0 && creep.room.name !== creep.memory.room) {
                        if(creep.build(builds[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(builds[0], {visualizePathStyle: {stroke: '#ffaa00'}, range: 3, reusePath: 15, priority: 7});
                        } else if(creep.build(builds[0]) === ERR_NOT_ENOUGH_ENERGY) {
                            for(let res in creep.store) {
                                if(res !== RESOURCE_ENERGY) {
                                    creep.drop(res);
                                    return;
                                }
                            }
                        }
                        return;
                    }
                }
            }
            if(creep.room.name !== creep.memory.room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 20, reusePath: 50, priority: 7});
                return;
            }
            if(creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
                unloadExcess(creep);
                return;
            }
            let targets = Game.getObjectById(creep.memory.target);
            if(!targets) {
                targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                if(targets) {
                    creep.memory.target = targets.id;
                }
            }
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && targets.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 9.7, maxRooms: 1});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                creep.memory.target = targets.id;
            }
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && targets.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 9.8, maxRooms: 1});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_LAB) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                creep.memory.target = targets.id;
            }
            if(targets) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && targets.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8.1, maxRooms: 1});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            if(Memory.datas[creep.memory.room] && Game.getObjectById(Memory.datas[creep.memory.room].factory) && Game.getObjectById(Memory.datas[creep.memory.room].factory).store[RESOURCE_ENERGY] < 20000) {
                if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].factory), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].factory), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                }
                return;
            }
            if(creep.room.controller.level < 7 && Game.getObjectById(Memory.datas[creep.memory.room].controllerLink) && Game.getObjectById(Memory.datas[creep.memory.room].controllerLink).store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getCapacity()) {
                if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].controllerLink), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].controllerLink), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                }
                return;
            }
            if(!creep.room.storage && Game.cpu.bucket >= 1000) {
                if(creep.getActiveBodyparts(WORK) > 0) {
                    if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                    return;
                }
                let upgraderCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: (creep) => {
                            return creep.store[RESOURCE_ENERGY] <= 0 && (creep.memory.role === "upgrader" || creep.memory.role === "builder" || creep.memory.role === "repairer");
                        }
                });
                if(upgraderCreep) {
                    if(creep.transfer(upgraderCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgraderCreep, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                        upgraderCreep.moveTo(creep, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 12, maxRooms: 1})
                    }
                    return;
                }
                upgraderCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: (creep) => {
                            return creep.store.getFreeCapacity() > 0 && (creep.memory.role === "upgrader" || creep.memory.role === "builder" || creep.memory.role === "repairer");
                        }
                });
                if(upgraderCreep) {
                    if(creep.transfer(upgraderCreep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgraderCreep, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                    }
                    return;
                }
            }
            if(!creep.room.storage || creep.room.storage.store[RESOURCE_ENERGY] > 350000) {
                if(creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] <= 30000) {
                    if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    }
                    return;
                }
                targets = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_NUKER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                })[0];
                if(targets) {
                    creep.memory.target = targets.id;
                }
                if(Game.getObjectById(creep.memory.target)) {
                    if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    } else {
                        creep.memory.target = null;
                    }
                    return;
                }
                targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_POWER_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                if(targets) {
                    creep.memory.target = targets.id;
                }
                if(Game.getObjectById(creep.memory.target)) {
                    if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    } else {
                        creep.memory.target = null;
                    }
                    return;
                }
            }
            creep.memory.target = null;
            unloadExcess(creep);
        }
	}
};

module.exports = roleHauler;
