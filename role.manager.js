function terminalToStorage(creep, resource) {
    if(creep.store[resource] > 0) {
        if(creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    } else {
        if(creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        }
    }
    for(let i in creep.store) {
        if(creep.transfer(creep.room.storage, i) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    }
}
function storageToTerminal(creep, resource) {
    if(creep.store[resource] > 0 && creep.room.terminal.store[resource] < 10000) {
        if(creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        }
    } else {
        if(creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    }
    for(let i in creep.store) {
        if(creep.transfer(creep.room.terminal, i) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        }
    }
}
function fillSourceLab(creep, id, resource) {
    if(resource) {
        for(let r in creep.store) {
            if(r !== resource) {
                if(creep.room.terminal && creep.room.terminal.store[r] < 10000 && creep.transfer(creep.room.terminal, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
                } else if(creep.room.storage && creep.transfer(creep.room.storage, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                }
                return;
            }
        }
    }
    if(creep.store[resource] > 0) {
        let lab = Game.getObjectById(id);
        if(creep.transfer(lab, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(lab, {range: 1, reusePath: 50, priority: 8});
        }
    } else {
        if(creep.room.storage && creep.room.storage.store[resource] > 0 && creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        } else if(creep.room.terminal && creep.room.terminal.store[resource] > 0 && creep.withdraw(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        }
    }
}
function fillLab(creep, id, resource) {
    let lab = Game.getObjectById(id);
    if(creep.room.terminal.store[resource] + creep.room.storage.store[resource] + creep.store[resource] <= 0 && lab.store[resource] > 0) {
        return true;
    }
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
    if(lab.mineralType === resource) {
        return 1;
    }
    return false;
}
function emptySourceLab(creep, id) {
    let lab = Game.getObjectById(id);
    if(!lab) {
        return;
    }
    let resource = lab.mineralType;
    if(resource) {
        for(let r in creep.store) {
            if(r !== resource) {
                if(creep.room.terminal && creep.room.terminal.store[r] < 10000 && creep.transfer(creep.room.terminal, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
                } else if(creep.room.storage && creep.transfer(creep.room.storage, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                }
                return;
            }
        }
    }
    if(creep.store[resource] <= 0) {
        if(creep.withdraw(lab, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(lab, {range: 1, reusePath: 50, priority: 8});
        }
    } else {
        if(creep.room.terminal && creep.room.terminal.store[resource] < 10000 && creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        } else if(creep.room.storage && creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    }
}
function emptyReactionLab(creep, id) {
    let lab = Game.getObjectById(id);
    if(!lab) {
        return;
    }
    let resource = lab.mineralType;
    if(resource) {
        for(let r in creep.store) {
            if(r !== resource) {
                if(creep.room.terminal && creep.room.terminal.store[r] < 10000 && creep.transfer(creep.room.terminal, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
                } else if(creep.room.storage && creep.transfer(creep.room.storage, r) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                }
                return;
            }
        }
    }
    if(creep.store[resource] <= 0) {
        if(creep.withdraw(lab, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(lab, {range: 1, reusePath: 50, priority: 8});
        }
    } else {
        if(creep.room.terminal && creep.room.terminal.store[resource] < 10000 && creep.transfer(creep.room.terminal, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, priority: 8});
        } else if(creep.room.storage && creep.transfer(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    }
}
function transferToStorage(creep) {
    if(creep.room.storage) {
        for(let i in creep.store) {
            if(creep.transfer(creep.room.storage, i) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
            }
            return;
        }
    }
}
function emptyAllReactionLabs(creep) {
    if(Memory.datas[creep.memory.room].sourceLabs && Memory.datas[creep.memory.room].sourceLabs[2]) {
        for(let e in Memory.datas[creep.memory.room].sourceLabs[2]) {
            let i = Memory.datas[creep.memory.room].sourceLabs[2][e];
            if(Game.getObjectById(i)) {
                let resource = Game.getObjectById(i).mineralType;
                if(resource && Game.getObjectById(i) && (Game.getObjectById(i).store.getUsedCapacity(resource) >= creep.store.getCapacity() || resource !== Memory.datas[creep.memory.room].minInLab[2])) {
                    emptyReactionLab(creep, i)
                    return true;
                }
            }
        }
    }
    return false;
}
function fillSourceLabs(creep) {
    if(Memory.datas[creep.memory.room] && Memory.datas[creep.memory.room].sourceLabs && Memory.datas[creep.memory.room].minInLab) {
        for(let i = 0; i < 2; i++) {
            let lab = Game.getObjectById(Memory.datas[creep.memory.room].sourceLabs[i]);
            if(lab) {
                let resource = lab.mineralType;
                if(resource && resource !== Memory.datas[creep.memory.room].minInLab[i]) {
                    emptySourceLab(creep, Memory.datas[creep.memory.room].sourceLabs[i]);
                    return true;
                }
            }
        }
        for(let i = 0; i < 2; i++) {
            let lab = Game.getObjectById(Memory.datas[creep.memory.room].sourceLabs[i]);
            if(lab) {
                let resource = lab.mineralType;
                if((!resource || lab.store[Memory.datas[creep.memory.room].minInLab[i]] < 2500) &&
                        ((creep.room.terminal && creep.room.terminal.store[Memory.datas[creep.memory.room].minInLab[i]] > 0) ||
                        (creep.room.storage && creep.room.storage.store[Memory.datas[creep.memory.room].minInLab[i]] > 0) || 
                        creep.store[Memory.datas[creep.memory.room].minInLab[i]] > 0)) {
                    
                    fillSourceLab(creep, Memory.datas[creep.memory.room].sourceLabs[i], Memory.datas[creep.memory.room].minInLab[i])
                    return true;
                }
            }
        }
    }
    return false;
}


let roleManager = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getUsedCapacity() > 0) {
            creep.memory.hauling = true;
        } else {
            creep.memory.hauling = false;
        }
        if(Memory.datas[creep.memory.room].structures["powerSpawn"] && Game.getObjectById(Memory.datas[creep.memory.room].structures["powerSpawn"][0]) && Game.getObjectById(Memory.datas[creep.memory.room].structures["powerSpawn"][0]).store.getFreeCapacity(RESOURCE_POWER) > 90) {
            if(creep.store[RESOURCE_POWER] > 0) {
                if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].structures["powerSpawn"][0]), RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].structures["powerSpawn"][0]), {range: 1, priority: 7.5})
                }
                return;
            } else {
                if(creep.room.terminal && creep.room.terminal.store[RESOURCE_POWER] > 0 || creep.room.storage && creep.room.storage.store[RESOURCE_POWER] > 0) {
                    if(creep.room.terminal && creep.room.terminal.store[RESOURCE_POWER] > 0) {
                        if(creep.withdraw(creep.room.terminal, RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal, {range: 1, priority: 7.5})
                        }
                        return;
                    } else if(creep.room.storage && creep.room.storage.store[RESOURCE_POWER] > 0) {
                        if(creep.withdraw(creep.room.storage, RESOURCE_POWER) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {range: 1, priority: 7.5})
                        }
                        return;
                    }
                }
            }
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
        } else if(Memory.datas[creep.memory.room].minInLab) {
            if(fillSourceLabs(creep) || emptyAllReactionLabs(creep)) {
                return;
            }
            if(creep.store[RESOURCE_ENERGY] < creep.store.getUsedCapacity()) {
                creep.unloadExcess();
                return;
            }
        }
        if(creep.room.terminal) {
            let T3Boost = [];
            switch(Memory.datas[creep.memory.room].mineral) {
                case RESOURCE_ZYNTHIUM:
                    T3Boost = [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID];
                break;
                case RESOURCE_KEANIUM:
                    T3Boost = [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID];
                break;
                case RESOURCE_UTRIUM:
                    T3Boost = [RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID];
                break;
                case RESOURCE_LEMERGIUM:
                    T3Boost = [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID];
                break;
                case RESOURCE_OXYGEN:
                    T3Boost = [RESOURCE_CATALYZED_GHODIUM_ALKALIDE];
                break;
                case RESOURCE_HYDROGEN:
                    T3Boost = [RESOURCE_CATALYZED_GHODIUM_ACID];
                break;
            }
            for(let i in T3Boost) {
                if(creep.room.terminal && creep.room.terminal.store[T3Boost[i]] < 10000 && creep.room.storage && creep.room.storage.store[T3Boost[i]] > 0) {
                    storageToTerminal(creep, T3Boost[i]);
                    return;
                }
            }
        }
        if(Memory.datas[creep.memory.room].structures["factory"] && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"][0]).store[Memory.datas[creep.memory.room].mineral] > 25000) {
            if(creep.store[Memory.datas[creep.memory.room].mineral] <= 0) {
                if(creep.withdraw(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"][0]), Memory.datas[creep.memory.room].mineral) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"][0]), {range: 1, priority: 7.5})
                }
            } else {
                creep.unloadExcess();
            }
        }
        if(creep.store.getFreeCapacity() <= 0) {
            creep.unloadExcess();
            return;
        }
	    if(creep.memory.hauling) {
            if(creep.room.name !== creep.memory.room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 15, reusePath: 50, priority: 7.5});
                return;
            }
            if(creep.store[Memory.datas[creep.memory.room].minProduce] > 0 && creep.room.terminal.store[Memory.datas[creep.memory.room].minProduce] < 10000) {
                if(creep.transfer(creep.room.terminal, Memory.datas[creep.memory.room].minProduce) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                }
                return;
            }
            if(creep.room.storage && creep.room.storage.store[Memory.datas[creep.memory.room].minProduce] > 0) {
                if(creep.withdraw(creep.room.storage, Memory.datas[creep.memory.room].minProduce) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                }
                return;
            }
            if(!Game.getObjectById(creep.memory.target) || Game.getObjectById(creep.memory.target).store.getFreeCapacity() <= 0) {
                
            }
            if(Memory.datas[creep.memory.room].mineral && creep.store && creep.store.getUsedCapacity() <= creep.store[Memory.datas[creep.memory.room].mineral] && creep.room.storage && creep.room.terminal && (creep.room.storage.store[Memory.datas[creep.memory.room].mineral] > 0 || creep.store[Memory.datas[creep.memory.room].mineral] > 0)) {
                storageToTerminal(creep, Memory.datas[creep.memory.room].mineral);
                return;
            } else if(creep.room.storage) {
                if(creep.transfer(creep.room.storage, Memory.datas[creep.memory.room].mineral) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                    return;
                }
            }
            if(Memory.datas[creep.memory.room] && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]) && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]).store[Memory.datas[creep.memory.room].minProduce] > 0 && creep.store.getFreeCapacity() >= creep.store.getCapacity()) {
                if(creep.withdraw(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), Memory.datas[creep.memory.room].minProduce) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5});
                }
                return;
            }
            creep.unloadExcess();
        } else {
            let resource = Game.getObjectById(creep.memory.resource);
            if(creep.room.name !== creep.memory.room && !resource) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 15, reusePath: 50, priority: 7.5});
                return;
            }
            if(!resource) {
                let resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (re) => {
                    return re.resourceType !== RESOURCE_ENERGY;
                }}).sort((a, b) => b.amount - a.amount);
                if(resources.length > 0 && creep.store[RESOURCE_ENERGY] <= 0) {
                    creep.memory.resource = resources[0].id;
                } else {
                    resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (re) => {
                        return re.resourceType === RESOURCE_ENERGY;
                    }}).sort((a, b) => b.amount - a.amount);
                    if(resources.length > 0) {
                        creep.memory.resource = resources[0].id;
                    }
                }
            }
            if(!resource) {
                let tombs = creep.room.find(FIND_TOMBSTONES, {filter: (re) => {
                    return re.store.getUsedCapacity() > 0;
                }});
                if(tombs.length > 0) {
                    resource = tombs[0];
                    creep.memory.resource = tombs[0].id;
                }
            }
            if(resource && resource.amount > 30 && creep.pickup(resource) == ERR_NOT_IN_RANGE && creep.store[RESOURCE_ENERGY] >= creep.store.getUsedCapacity()) {
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8.3});
                return;
            }
            if(resource) {
                for(let j in resource.store) {
                    if(resource && creep.withdraw(resource, j) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8.3});
                    }
                    return;
                }
            }
            if(Memory.datas[creep.memory.room].mineral && creep.store && creep.room.terminal && creep.store.getUsedCapacity() <= creep.store[Memory.datas[creep.memory.room].mineral] && (creep.room.storage && creep.room.storage.store[Memory.datas[creep.memory.room].mineral] > 0 || creep.store[Memory.datas[creep.memory.room].mineral] > 0)) {
                storageToTerminal(creep, Memory.datas[creep.memory.room].mineral);
                return;
            } else if(creep.room.storage && creep.store[Memory.datas[creep.memory.room].mineral] > 0) {
                if(creep.transfer(creep.room.storage, Memory.datas[creep.memory.room].mineral) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, priority: 8});
                }
            }
            if(Memory.datas[creep.memory.room] && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]) && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]).store[Memory.datas[creep.memory.room].minProduce] > 0 && creep.store.getFreeCapacity() >= creep.store.getCapacity()) {
                if(creep.withdraw(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), Memory.datas[creep.memory.room].minProduce) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5});
                }
                return;
            }
            creep.unloadExcess();
            creep.memory.fill = null;
        }
	}
};

module.exports = roleManager;
