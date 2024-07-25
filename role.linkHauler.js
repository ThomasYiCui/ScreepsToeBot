function fillLab(creep, id, resource) {
    let lab = Game.getObjectById(id);
    if(creep.room.terminal.store[resource] + creep.room.storage.store[resource] + creep.store[resource] + lab.store[resource] <= 0) {
        return false;
    }
    if(lab.mineralType && lab.store.getFreeCapacity(lab.mineralType) <= 0) {
        return 1;
    }
    if(resource) {
        for(let r in creep.store) {
            if(r !== resource || (lab.mineralType !== resource && lab.mineralType) && creep.room.terminal.store[r] < 10000) {
                if(creep.room.terminal && creep.transfer(creep.room.terminal, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
                } else if(creep.room.storage && creep.transfer(creep.room.storage, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                }
                return true;
            }
        }
    }
    if(lab.mineralType !== resource && lab.mineralType) {
        if(creep.withdraw(lab, lab.mineralType) === ERR_NOT_IN_RANGE) {
            creep.moveTo(lab, {range: 1, reusePath: 50, priority: 8});
        }
        return true;
    }
    if(creep.store[resource] > 0) {
        if(creep.transfer(lab, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(lab, {range: 1, reusePath: 50, priority: 8});
        }
        return true;
    }
    if(creep.room.storage && creep.room.storage.store[resource] > 0) {
        if(creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
        return true;
    }
    if(creep.room.terminal && creep.room.terminal.store[resource] > 0) {
        if(creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        }
        return true;
    }
    if(lab.mineralType && lab.store[lab.mineralType] > 0) {
        return 1;
    }
    if(lab.mineralType === resource) {
        return 1;
    }
    return false;
}
let roleLinkHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.hauling = false;
        } else if(creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = true;
        }
        if(Memory.datas[creep.memory.room].combatLabs) {
            let changingLabs = false;
            for(let i in Memory.datas[creep.memory.room].structures["lab"]) {
                if(i === "0") {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_GHODIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_GHODIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_GHODIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_GHODIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_GHODIUM_OXIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_GHODIUM_OXIDE) === true) {
                            return;
                        }
                    }
                } else if(i === "1" && (fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_OXIDE))) {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_OXIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_LEMERGIUM_OXIDE) === true) {
                            return;
                        }
                    }
                } else if(i === "2" && (fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_OXIDE))) {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_OXIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_OXIDE) === true) {
                            return;
                        }
                    }
                } else if(i === "3" && (fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_UTRIUM_ACID) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_ACID) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_HYDRIDE))) {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_UTRIUM_ACID)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_UTRIUM_ACID) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_ACID)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_ACID) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_HYDRIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_UTRIUM_HYDRIDE) === true) {
                            return;
                        }
                    }
                } else if(i === "4" && (fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ACID) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ACID) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_HYDRIDE))) {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ACID)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_ZYNTHIUM_ACID) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ACID)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_ACID) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_HYDRIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_ZYNTHIUM_HYDRIDE) === true) {
                            return;
                        }
                    }
                } else if(i === "5" && (fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_KEANIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_ALKALIDE) || fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_OXIDE))) {
                    if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_KEANIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_CATALYZED_KEANIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_ALKALIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_ALKALIDE) === true) {
                            return;
                        }
                    } else if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_OXIDE)) {
                        if(fillLab(creep, Memory.datas[creep.memory.room].structures["lab"][i], RESOURCE_KEANIUM_OXIDE) === true) {
                            return;
                        }
                    }
                }
            }
            if(changingLabs) {
                return;
            }
            if(creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
                creep.unloadExcess();
                return;
            }
        }
        if(!Game.getObjectById(creep.memory.target)) {
            let targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                creep.memory.target = targets.id;
            }
        }
        if(creep.memory.hauling) {
            let masterLink = Game.getObjectById(Memory.datas[creep.room.name].masterLink);
            if(masterLink && masterLink.store[RESOURCE_ENERGY] >= 500 && creep.withdraw(masterLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(masterLink, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 9});
                return;
            }
            if(creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                creep.memory.hauling = false;
                return;
            }
            if(Game.getObjectById(creep.memory.target) && creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {range: 1, reusePath: 15, priority: 9});
                return;
            }
        } else {
            if(Game.getObjectById(creep.memory.target)) {
                if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 9.4});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            let targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets) {
                creep.memory.target = targets.id;
            }
            if(Game.getObjectById(creep.memory.target)) {
                if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 9});
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
            if(Game.getObjectById(creep.memory.target)) {
                if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            if(creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] < 30000) {
                if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
            if(!creep.room.storage || creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] >= 300000) {
                if(Memory.datas[creep.memory.room] && Game.getObjectById(Memory.datas[creep.memory.room].factory) && Game.getObjectById(Memory.datas[creep.memory.room].factory).store[RESOURCE_ENERGY] < 20000) {
                    if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].factory), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].factory), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                    }
                    return;
                }
            }
            if(creep.room.controller.level < 7 && Game.getObjectById(Memory.datas[creep.memory.room].controllerLink) && Game.getObjectById(Memory.datas[creep.memory.room].controllerLink).store.getFreeCapacity(RESOURCE_ENERGY) >= creep.store.getCapacity()) {
                if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].controllerLink), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].controllerLink), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5, maxRooms: 1});
                }
                return;
            }
            if(!creep.room.storage || creep.room.storage.store[RESOURCE_ENERGY] > 350000) {
                console.log(creep.room.name);
                if(creep.room.terminal && creep.room.terminal.store[RESOURCE_ENERGY] <= 30000) {
                    if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    }
                    return;
                }
                targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_NUKER) &&
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
            if(creep.room.storage) {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                } else {
                    creep.memory.target = null;
                }
                return;
            }
        }
	}
};

module.exports = roleLinkHauler;
