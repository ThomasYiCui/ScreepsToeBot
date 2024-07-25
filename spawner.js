function dynamicSpawning(room) {
    let energyUsed = 0;
    let body = [];
    while(energyUsed < room.energyCapacityAvailable) {
       if(room.energyCapacityAvailable >= 550 && energyUsed + 250 <= room.energyCapacityAvailable && body.length <= 37) {
            energyUsed+=250;
            body.push(WORK);
            body.push(WORK);
            body.push(MOVE);
        } else if(energyUsed + 150 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=150;
            body.push(WORK);
            body.push(MOVE);
        }
        if(energyUsed + 100 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=100;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function pioneerSpawning(room) {
    let energyUsed = 0;
    let body = [];
    let works = 0;
    let carries = 0;
    while(energyUsed < room.energyCapacityAvailable) {
       if(energyUsed + 150 <= room.energyCapacityAvailable && works < 10) {
            energyUsed+=150;
            works+=1;
            body.push(WORK);
            body.push(MOVE);
        }
        if(energyUsed + 100 <= room.energyCapacityAvailable && carries < 10) {
            energyUsed+=100;
            carries+=1;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}

function dynamicSpawningH(room) {
    let energyUsed = 0;
    let body = [];
    let works = 0;
    if(room.energyCapacityAvailable === 550) {
        return [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE];
        //return [WORK, WORK, CARRY, MOVE];
    }
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 300 <= room.energyCapacityAvailable && works < 10 && room.controller && room.controller.level >= 4) {
            energyUsed+=250;
            works+=2;
            body.push(WORK);
            body.push(WORK);
            body.push(MOVE);
        } else if((energyUsed + 200 <= room.energyCapacityAvailable && room.energyCapacityAvailable > 500 || energyUsed + 150 <= room.energyCapacityAvailable && room.energyCapacityAvailable <= 500) && works < 10) {
            energyUsed+=150;
            works+=1;
            body.push(WORK);
            body.push(MOVE);
        } else {
            if(energyUsed + 50 <= room.energyCapacityAvailable && room.controller.level >= 2) {
                energyUsed+=50;
                body.push(CARRY);
            }
            if(energyUsed + 50 <= room.energyCapacityAvailable && room.controller.level >= 2) {
                energyUsed+=50;
                body.push(CARRY);
            }
            break;
        }
    }
    return body;
}
function dynamicSpawningRecoveryH(room) {
    let energyUsed = 0;
    let body = [];
    let works = 0;
    while(energyUsed < room.energyAvailable) {
        if(energyUsed + 300 <= room.energyAvailable && works < 10 && room.controller && room.controller.level >= 4) {
            energyUsed+=250;
            works+=2;
            body.push(WORK);
            body.push(WORK);
            body.push(MOVE);
        } else if((energyUsed + 200 <= room.energyAvailable && room.energyCapacityAvailable > 500 || energyUsed + 150 <= room.energyAvailable) && works < 10) {
            energyUsed+=150;
            works+=1;
            body.push(WORK);
            body.push(MOVE);
        } else {
            if(energyUsed + 50 <= room.energyAvailable && room.controller.level >= 5) {
                energyUsed+=50;
                body.push(CARRY);
            } else {
                break;
            }
        }
    }
    if(works > 0 && body.length > 2) {
        return body;
    } else {
        return -1;
    }
}
function dynamicSpawningRemoteR(room) {
    var energyUsed = 0;
    var body = [];
    var carries = 0;
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 100 <= room.energyCapacityAvailable && carries < 24) {
            energyUsed+=100;
            carries+=1;
            body.push(CARRY);
            body.push(MOVE);
            if(carries % 5 === 4 && energyUsed + 150 <= room.energyCapacityAvailable) {
                body.push(WORK);
                body.push(MOVE);
                carries+=1;
                energyUsed+=150;
            }
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningRemoteH(room) {
    let energyUsed = 0;
    let body = [];
    let works = 0;
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 150 <= room.energyCapacityAvailable && works < 8) {
            energyUsed+=150;
            works+=1;
            body.push(WORK);
            body.push(MOVE);
        } else {
            if(energyUsed + 50 <= room.energyCapacityAvailable) {
                energyUsed+=50;
                body.push(CARRY);
            } else {
                break;
            }
            break;
        }
    }
    return body;
}
function dynamicSpawningM(room) {
    let energyUsed = 0;
    let body = [];
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 250 <= room.energyCapacityAvailable && body.length <= 47) {
            energyUsed+=250;
            body.push(WORK);
            body.push(WORK);
            body.push(MOVE);
        } else if(energyUsed + 150 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=150;
            body.push(WORK);
            body.push(MOVE);
        }
        if(energyUsed + 150 <= room.energyCapacityAvailable && body.length <= 47) {
            energyUsed+=150;
            body.push(CARRY);
            body.push(CARRY);
            body.push(MOVE);
        } else if(energyUsed + 100 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=100;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningRecoveryR(room) {
    let energyUsed = 0;
    let body = [];
    let carries = 0;
    while(energyUsed < room.energyAvailable) {
        if(energyUsed + 100 <= room.energyAvailable && carries < 25) {
            energyUsed+=100;
            carries+=1;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningMan(room) {
    let energyUsed = 0;
    let body = [];
    let carries = 0;
    while(energyUsed < room.energyAvailable) {
        if(energyUsed + 100 <= room.energyAvailable && carries < 5) {
            energyUsed+=100;
            carries+=1;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningR(room) {
    let energyUsed = 0;
    let body = [];
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 150 <= room.energyCapacityAvailable && body.length <= 47) {
            energyUsed+=150;
            body.push(CARRY);
            body.push(CARRY);
            body.push(MOVE);
        } else if(energyUsed + 100 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=100;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningHaul(room) {
    let energyUsed = 0;
    let body = [];
    while(energyUsed < room.energyCapacityAvailable) {
        if(energyUsed + 100 <= room.energyCapacityAvailable && body.length <= 48) {
            energyUsed+=100;
            body.push(CARRY);
            body.push(MOVE);
        } else {
            break;
        }
    }
    return body;
}
function dynamicSpawningS(room, dClass) {
    let energyUsed = 0;
    let body = [];
    let part = Math.floor(Math.min(Math.min(room.energyCapacityAvailable/430, dClass), 12));
    for(let i = 0; i < part; i++) {
        body.push(ATTACK);
        body.push(MOVE);
        body.push(HEAL);
        body.push(MOVE);
    }
    return body;
}
function dynamicSpawningRS(room, dClass) {
    let energyUsed = 0;
    let body = [];
    let part = Math.min(Math.min(room.energyCapacityAvailable/130, dClass), 25);
    for(let i = 0; i < part; i++) {
        body.push(ATTACK);
        body.push(MOVE);
    }
    if(body.length > 0) {
        return body;
    } else {
        return [ATTACK, MOVE];
    }
}

module.exports = {
    run: function() {
        let creepRooms = _.groupBy(Game.creeps, (creep) => creep.memory.room);

        for(let i in Game.spawns) {
            let spawn = Game.spawns[i];
            if(!Memory.datas[spawn.room.name]) {
                continue;
            }
            if(spawn.hits <= spawn.hitsMax * 0.5) {
                spawn.room.controller.activateSafeMode();
            }
            //console.log(Game.rooms[Memory.datas[spawn.room.name].toPioneer] && (Game.rooms[Memory.datas[spawn.room.name].toPioneer].find(FIND_HOSTILE_CREEPS).length > 0 || Game.rooms[Memory.datas[spawn.room.name].toPioneer].find(FIND_HOSTILE_STRUCTURES).length > 0) && (!creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer] || creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer].length < 6));
            if(!spawn.spawning) {
                let roomCreeps = creepRooms[spawn.room.name];
                let creepsRole = _.groupBy(roomCreeps, (creep) => creep.memory.role);
                let hostiles = spawn.room.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && 
                (!creep.room.controller || !creep.room.controller.safeMode)}});
                let hostileInRoom = hostiles.length > 0;
                let dangerClass = 0;
                let remoteInDanger = {};
                for(let j in Memory.datas[spawn.room.name].remoteRooms) {
                    if(Game.rooms[Memory.datas[spawn.room.name].remoteRooms[j]]) {
                        let hostileLength = hostiles.length;
                        Array.prototype.push.apply(hostiles, Game.rooms[Memory.datas[spawn.room.name].remoteRooms[j]].find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && (!creep.room.controller || !creep.room.controller.safeMode)}}))
                        Array.prototype.push.apply(hostiles, Game.rooms[Memory.datas[spawn.room.name].remoteRooms[j]].find(FIND_HOSTILE_STRUCTURES, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && (!creep.room.controller || !creep.room.controller.safeMode)}}))
                        if(hostiles.length > hostileLength) {
                            remoteInDanger[Memory.datas[spawn.room.name].remoteRooms[j]] = true;
                        }
                    }
                }
                for(let hostile in hostiles) {
                    let hCreep = hostiles[hostile];
                    if(hCreep && hCreep.body) {
                        dangerClass+=1 + hCreep.getActiveBodyparts(ATTACK) * 0.8 + hCreep.getActiveBodyparts(HEAL) * 7 + hCreep.getActiveBodyparts(TOUGH) * 0.8 + hCreep.getActiveBodyparts(RANGED_ATTACK) * 1.2 + hCreep.getActiveBodyparts(WORK) * 0.5 + hCreep.getActiveBodyparts(MOVE) * 0.2;
                    } else if(hCreep) {
                        dangerClass+=5 + hCreep.hits/5000;
                    }
                }
                let construction = spawn.room.find(FIND_CONSTRUCTION_SITES);
                if(!creepsRole["guard"]) {
                    creepsRole["guard"] = [];
                }
                creepsRole["guard"] = _.groupBy(creepsRole["guard"], (creep) => creep.memory.roomToGoTo);

                if(!creepsRole["harvester"]) {
                    creepsRole["harvester"] = [];
                }
                creepsRole["harvester"] = _.groupBy(creepsRole["harvester"], (creep) => creep.memory.roomToMine);
                if(!creepsRole["harvester"][spawn.room.name]) {
                    creepsRole["harvester"][spawn.room.name] = [];
                }
                for(let harv in Memory.datas[spawn.room.name].remoteRooms) {
                    if(!creepsRole["harvester"][Memory.datas[spawn.room.name].remoteRooms[harv]]) {
                        creepsRole["harvester"][Memory.datas[spawn.room.name].remoteRooms[harv]] = [];
                    }
                }
                if(!creepsRole["mineralHarvester"]) {
                    creepsRole["mineralHarvester"] = [];
                }
                if(!creepsRole["hauler"]) {
                    creepsRole["hauler"] = [];
                }
                creepsRole["hauler"] = _.groupBy(creepsRole["hauler"], (creep) => creep.memory.rth);
                if(!creepsRole["hauler"][spawn.room.name]) {
                    creepsRole["hauler"][spawn.room.name] = [];
                }
                for(let haul in Memory.datas[spawn.room.name].remoteRooms) {
                    if(!creepsRole["hauler"][Memory.datas[spawn.room.name].remoteRooms[haul]]) {
                        creepsRole["hauler"][Memory.datas[spawn.room.name].remoteRooms[haul]] = [];
                    }
                }
                if(!creepsRole["reserver"]) {
                    creepsRole["reserver"] = [];
                }
                creepsRole["reserver"] = _.groupBy(creepsRole["reserver"], (creep) => creep.memory.rtr);
                if(!creepsRole["reserver"][spawn.room.name]) {
                    creepsRole["reserver"][spawn.room.name] = [];
                }
                for(let reserves in Memory.datas[spawn.room.name].remoteRooms) {
                    if(!creepsRole["reserver"][Memory.datas[spawn.room.name].remoteRooms[reserves]]) {
                        creepsRole["reserver"][Memory.datas[spawn.room.name].remoteRooms[reserves]] = [];
                    }
                }
                if(!creepsRole["repairer"]) {
                    creepsRole["repairer"] = [];
                }
                if(!creepsRole["upgrader"]) {
                    creepsRole["upgrader"] = [];
                }
                if(!creepsRole["vulture"]) {
                    creepsRole["vulture"] = [];
                }
                if(!creepsRole["helper"]) {
                    creepsRole["helper"] = [];
                }
                if(!creepsRole["builder"]) {
                    creepsRole["builder"] = [];
                }
                if(!creepsRole["linkHauler"]) {
                    creepsRole["linkHauler"] = [];
                }
                if(!creepsRole["goofer"]) {
                    creepsRole["goofer"] = [];
                }
                if(!creepsRole["scout"]) {
                    creepsRole["scout"] = [];
                }
                if(!creepsRole["manager"]) {
                    creepsRole["manager"] = [];
                }
                creepsRole["pioneer"] = _.groupBy(creepsRole["pioneer"], (creep) => creep.memory.claimer);
                if(!creepsRole["pioneer"][spawn.room.name]) {
                    creepsRole["pioneer"][spawn.room.name] = [];
                }
                if(hostiles.length > 0 && (!creepsRole["guard"][hostiles[0].room.name] || creepsRole["guard"][hostiles[0].room.name].length < 1) && (dangerClass <= (spawn.room.controller.level * spawn.room.controller.level * spawn.room.controller.level * 2) || hostiles[0].room.name === spawn.room.name)) {
                    if(spawn.room.energyAvailable >= 430) {
                        spawn.spawnCreep(dynamicSpawningS(spawn.room, dangerClass), 'G' + (Game.time % 1501) + spawn.room.name, 
                            {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: hostiles[0].room.name}});
                    } else {
                        spawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], 'G' + (Game.time % 1501) + spawn.room.name, 
                            {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: hostiles[0].room.name}});
                    }
                    continue;
                } else if(Memory.datas[spawn.room.name].sources && (creepsRole["hauler"][spawn.room.name].length >= creepsRole["harvester"][spawn.room.name].length && spawn.room.controller.level < 5 || spawn.room.controller.level >= 5) && creepsRole["harvester"][spawn.room.name].length < Object.keys(Memory.datas[spawn.room.name].sources).length) {
                    for(let s in Memory.datas[spawn.room.name].sources) {
                        if(!Memory.datas[spawn.room.name].sources[s] || !Game.creeps[Memory.datas[spawn.room.name].sources[s]]) {
                            let creepName = 'H' + (Game.time % 1651) + spawn.room.name;
                            if(spawn.spawnCreep(dynamicSpawningH(spawn.room), creepName, 
                                {memory: {role: 'harvester', room: spawn.room.name, sourceToMine: s, roomToMine: Game.getObjectById(s).room.name}}) === OK) {
                                Memory.datas[spawn.room.name].sources[s] = creepName;
                                continue;
                            } else if((((creepsRole["hauler"][spawn.room.name].length === 0 || creepsRole["harvester"][spawn.room.name].length === 0) && spawn.room.controller.level < 5) 
                                    || (creepsRole["hauler"][spawn.room.name].length === 0 && creepsRole["linkHauler"].length === 0 && spawn.room.controller.level === 5) 
                                    || (creepsRole["linkHauler"].length === 0 && spawn.room.controller.level > 5))) {
                                if(spawn.spawnCreep(dynamicSpawningRecoveryH(spawn.room), creepName, 
                                    {memory: {role: 'harvester', room: spawn.room.name, sourceToMine: s, roomToMine: Game.getObjectById(s).room.name}}) === OK) {
                                        //Game.spawns["Spawn4"].spawnCreep([WORK, MOVE, WORK, MOVE], "Harvy", {memory: {role: 'harvester', room: Game.spawns["Spawn4"].room.name, sourceToMine: "c99f0773646ccaf"}})
                                        Memory.datas[spawn.room.name].sources[s] = creepName;
                                }
                                continue;
                            }
                        }
                    }
                    if(creepsRole["harvester"][spawn.room.name].length < 0) {
                        continue;
                    }
                } else if(Memory.datas[spawn.room.name].sources && 
                    (spawn.room.controller.level < 5 && creepsRole["hauler"][spawn.room.name].length < Object.keys(Memory.datas[spawn.room.name].sources).length || spawn.room.controller.level === 5 && creepsRole["hauler"][spawn.room.name].length < 1)) {
                    let creepName = 'RH' + (Game.time % 1651) + spawn.room.name;
                    if(spawn.spawnCreep(dynamicSpawningR(spawn.room), creepName, 
                        {memory: {role: 'hauler', room: spawn.room.name, rth: spawn.room.name}}) !== OK) {
                            if(creepsRole["hauler"][spawn.room.name].length === 0 || creepsRole["harvester"][spawn.room.name].length === 0) {
                                spawn.spawnCreep(dynamicSpawningRecoveryR(spawn.room), creepName, 
                                    {memory: {role: 'hauler', room: spawn.room.name, rth: spawn.room.name}})
                            }
                    }
                    continue;
                } else if(spawn.room.controller.level >= 5 && creepsRole["linkHauler"].length < 1) {
                    let creepName = 'LH' + (Game.time % 1651) + spawn.room.name;
                    if(spawn.spawnCreep(dynamicSpawningR(spawn.room), creepName, 
                        {memory: {role: 'linkHauler', room: spawn.room.name}}) !== OK) {
                            if((creepsRole["linkHauler"].length === 0 && spawn.room.controller.level <= 5) || spawn.room.controller.level > 5) {
                                spawn.spawnCreep(dynamicSpawningRecoveryR(spawn.room), creepName, 
                                    {memory: {role: 'linkHauler', room: spawn.room.name}})
                            }
                    }
                    continue;
                } else if(spawn.room.controller.level >= 5 && creepsRole["manager"].length < 1) {
                    let creepName = 'M' + (Game.time % 1651) + spawn.room.name;
                    spawn.spawnCreep(dynamicSpawningMan(spawn.room), creepName, {memory: {role: 'manager', room: spawn.room.name}})
                    continue;
                } else {
                    let energyDropped = 0;
                    let energyDeposits = Memory.datas[spawn.room.name].energyDeposits;
                    energyDeposits = energyDeposits.concat(spawn.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_CONTAINER}})).map(energyDeposit => {
                        return energyDeposit.id
                    });
                    for(let j in energyDeposits) {
                        if(Game.getObjectById(energyDeposits[j])) {
                            if(Game.getObjectById(energyDeposits[j]).amount) {
                                energyDropped+=Game.getObjectById(energyDeposits[j]).amount;
                            } else {
                                energyDropped+=Game.getObjectById(energyDeposits[j]).store[RESOURCE_ENERGY];
                            }
                        }
                    }
                    if(Memory.datas[spawn.room.name].sources && energyDropped > (Math.max((creepsRole["hauler"][spawn.room.name].length - Object.keys(Memory.datas[spawn.room.name].sources).length), 0) * Math.max((creepsRole["hauler"][spawn.room.name].length - Object.keys(Memory.datas[spawn.room.name].sources).length), 0)) * 750 + 450) {
                        let creepName = 'RH' + (Game.time % 1651) + spawn.room.name;
                        if(creepsRole["hauler"][spawn.room.name].length < 2) {
                            spawn.spawnCreep(dynamicSpawningRecoveryR(spawn.room), creepName, 
                                {memory: {role: 'hauler', room: spawn.room.name, rth: spawn.room.name}})
                        } else {
                            spawn.spawnCreep(dynamicSpawningR(spawn.room), creepName, 
                                {memory: {role: 'hauler', room: spawn.room.name, rth: spawn.room.name}})
                        }
                    }
                }
                let skip = false;
                if(Memory.datas[spawn.room.name].remoteRooms) {
                    for(let remoteRoom in Memory.datas[spawn.room.name].remoteRooms) {
                        let remoteName = Memory.datas[spawn.room.name].remoteRooms[remoteRoom];
                        let objectRoom = Game.rooms[remoteName];
                        if(remoteInDanger[remoteName]) {
                            continue;
                        }
                        if(Memory.datas[remoteName] && Memory.datas[remoteName].sources && creepsRole["hauler"][remoteName].length < Object.keys(Memory.datas[remoteName].sources).length && creepsRole["hauler"][remoteName].length < creepsRole["harvester"][remoteName].length) {
                            let creepName = 'rRH' + (Game.time % 1651) + spawn.room.name + remoteName;
                            spawn.spawnCreep(dynamicSpawningRemoteR(spawn.room), creepName, 
                                {memory: {role: 'hauler', room: spawn.room.name, rth: remoteName}});
                            skip = true;
                            break;
                        } else if(Memory.datas[remoteName] && Memory.datas[remoteName].sources && creepsRole["harvester"][remoteName].length < Object.keys(Memory.datas[remoteName].sources).length) {
                            for(let s in Memory.datas[remoteName].sources) {
                                let creepName = 'rH' + (Game.time % 1651) + spawn.room.name + remoteName;
                                if(!Memory.datas[remoteName].sources[s] || !Game.creeps[Memory.datas[remoteName].sources[s]]) {
                                    if(spawn.spawnCreep(dynamicSpawningRemoteH(spawn.room), creepName, 
                                        {memory: {role: 'harvester', room: spawn.room.name, sourceToMine: s, roomToMine: remoteName}}) === OK) {
                                        Memory.datas[remoteName].sources[s] = creepName;
                                        skip = true;
                                        break;
                                    }
                                }
                            }
                        } else if(creepsRole["reserver"][remoteName].length <= 0 && spawn.room.energyCapacityAvailable >= 650 && (!objectRoom || objectRoom.controller && !objectRoom.controller.reservation || objectRoom.controller && objectRoom.controller.reservation && objectRoom.controller.reservation.ticksToEnd <= 3500)) {
                            var creepName = 'rv' + (Game.time % 1651) + spawn.room.name + remoteName;
                            if(spawn.room.energyCapacityAvailable >= 1950) {
                                spawn.spawnCreep([CLAIM, CLAIM, CLAIM, MOVE, MOVE, MOVE], creepName, 
                                        {memory: {role: 'reserver', room: spawn.room.name, rtr: remoteName}})
                            } else if(spawn.room.energyCapacityAvailable >= 1300) {
                                spawn.spawnCreep([CLAIM, CLAIM, MOVE, MOVE], creepName, 
                                        {memory: {role: 'reserver', room: spawn.room.name, rtr: remoteName}})
                            } else if(spawn.room.energyCapacityAvailable >= 650) {
                                spawn.spawnCreep([CLAIM, MOVE], creepName, 
                                        {memory: {role: 'reserver', room: spawn.room.name, rtr: remoteName}})
                            }
                            skip = true;
                            break;
                        } else if(Memory.datas[remoteName]) {
                            let energyDropped = 0;
                            for(let i in Memory.datas[remoteName].energyDeposits) {
                                if(Game.getObjectById(Memory.datas[remoteName].energyDeposits[i])) {
                                    energyDropped+=Game.getObjectById(Memory.datas[remoteName].energyDeposits[i]).amount;
                                }
                            }
                            if(Memory.datas[remoteName].sources && energyDropped > (Math.max(0, creepsRole["hauler"][remoteName].length - Object.keys(Memory.datas[remoteName].sources).length) * Math.max(0, creepsRole["hauler"][remoteName].length - Object.keys(Memory.datas[remoteName].sources).length)) * 1000 + 350) {
                                let creepName = 'rRH' + (Game.time % 1651) + spawn.room.name + remoteName;
                                
                                spawn.spawnCreep(dynamicSpawningRemoteR(spawn.room), creepName, 
                                    {memory: {role: 'hauler', room: spawn.room.name, rth: remoteName}});
                                skip = true;
                                break;
                            }
                        }
                    }
                }
                if (skip) {
                    continue;
                }
                
                if(Memory.datas[spawn.room.name].sources && creepsRole["harvester"][spawn.room.name].length < Object.keys(Memory.datas[spawn.room.name].sources).length || (creepsRole["hauler"][spawn.room.name].length === 0 && spawn.room.controller.level < 5)) {
                    continue;
                } else if(((creepsRole["upgrader"].length < 2 && spawn.room.controller.level <= 1) || (creepsRole["upgrader"].length < 9 && spawn.room.controller.level < 3) || (creepsRole["upgrader"].length < 4 && spawn.room.controller.level === 3)) && !hostileInRoom && construction.length <= 0 || creepsRole["upgrader"].length < 1 && spawn.room.controller.level <= 7 || creepsRole["upgrader"].length < 1 && spawn.room.controller.ticksToDowngrade <= 140000 && spawn.room.controller.level === 8) {
                    spawn.spawnCreep(dynamicSpawning(spawn.room), 'U' + (Game.time % 1651) + spawn.room.name, 
                        {memory: {role: 'upgrader', room: spawn.room.name}});
                    continue;
                } else if((creepsRole["repairer"].length < 0 && spawn.room.controller.level <= 1 || creepsRole["repairer"].length < 1 && spawn.room.controller.level <= 2 || creepsRole["repairer"].length < 3 && spawn.room.controller.level <= 4 || creepsRole["repairer"].length < 1) || (creepsRole["repairer"].length < 8 && spawn.room.controller.level <= 3 || creepsRole["repairer"].length < 8) && hostileInRoom && dangerClass > 25) {
                    spawn.spawnCreep(dynamicSpawning(spawn.room), 'R' + (Game.time % 1651) + spawn.room.name, 
                        {memory: {role: 'repairer', room: spawn.room.name}});
                    continue;
                } else if(spawn.room.storage && spawn.room.storage.store[RESOURCE_ENERGY] >= 405000) {
                    if(creepsRole["upgrader"].length < 3 && spawn.room.controller.level <= 6 || creepsRole["upgrader"].length < 2 && spawn.room.controller.level <= 7) {
                        spawn.spawnCreep(dynamicSpawning(spawn.room), 'U' + (Game.time % 1651) + spawn.room.name, 
                            {memory: {role: 'upgrader', room: spawn.room.name}});
                    } else if(spawn.room.controller.level === 8 && creepsRole["repairer"].length <= 2) {
                        spawn.spawnCreep(dynamicSpawning(spawn.room), 'R' + (Game.time % 1651) + spawn.room.name, 
                            {memory: {role: 'repairer', room: spawn.room.name}});
                    }
                } else if(spawn.room.storage && spawn.room.storage.store[RESOURCE_ENERGY] >= 405000) {
                    if(creepsRole["upgrader"].length < 3 && spawn.room.controller.level <= 6 || creepsRole["upgrader"].length < 2 && spawn.room.controller.level <= 7) {
                        spawn.spawnCreep(dynamicSpawning(spawn.room), 'U' + (Game.time % 1651) + spawn.room.name, 
                            {memory: {role: 'upgrader', room: spawn.room.name}});
                    }
                } else if(creepsRole["builder"].length < 2 && construction.length > 0) {
                    spawn.spawnCreep(dynamicSpawning(spawn.room), 'B' + (Game.time % 1651) + spawn.room.name, 
                        {memory: {role: 'builder', room: spawn.room.name}});
                    continue;
                } else if(creepsRole["mineralHarvester"].length < 1 && spawn.room.find(FIND_MINERALS)[0].mineralAmount > 0 && spawn.room.controller.level >= 6 && (spawn.room.terminal || spawn.room.storage) && Memory.datas[spawn.room.name]) {
                    spawn.spawnCreep(dynamicSpawningM(spawn.room), 'MH' + (Game.time % 1651) + spawn.room.name, 
                            {memory: {role: 'mineralHarvester', room: spawn.room.name, mineralToMine: Memory.datas[spawn.room.name].minId}});
                } else if(hostiles.length > 0 && (!creepsRole["guard"][hostiles[0].room.name] || creepsRole["guard"][hostiles[0].room.name].length < 3) && (dangerClass <= (spawn.room.controller.level * spawn.room.controller.level * spawn.room.controller.level * 2) || hostiles[0].room.name === spawn.room.name)) {
                    if(spawn.room.energyAvailable >= 430) {
                        spawn.spawnCreep(dynamicSpawningS(spawn.room, dangerClass), 'G' + (Game.time % 1501) + spawn.room.name, 
                            {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: hostiles[0].room.name}});
                    } else {
                        spawn.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], 'G' + (Game.time % 1501) + spawn.room.name, 
                            {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: hostiles[0].room.name}});
                    }
                    continue;
                } else if(Memory.datas[spawn.room.name].steal && creepsRole["vulture"].length < 6) {
                    spawn.spawnCreep(dynamicSpawningR(spawn.room), 'Vul' + Game.time % 1651 + spawn.room.name, 
                        {memory: {role: 'vulture', room: spawn.room.name, rth: Memory.datas[spawn.room.name].steal}});
                    continue;
                } else if(creepsRole["scout"].length < 1 && spawn.room.controller.level >= 3 && spawn.room.controller.level <= 7) {
                    spawn.spawnCreep([MOVE], 'Scout' + Game.time % 1651 + spawn.room.name, 
                        {memory: {role: 'scout', room: spawn.room.name}});
                    continue;
                } else if(Memory.datas[spawn.room.name].toPioneer) {
                    if(Game.rooms[Memory.datas[spawn.room.name].toPioneer] && Game.rooms[Memory.datas[spawn.room.name].toPioneer].find(FIND_MY_SPAWNS).length > 0) {
                        Memory.datas[spawn.room.name].toPioneer = undefined;
                    } else {
                        if(Game.rooms[Memory.datas[spawn.room.name].toPioneer] && (Game.rooms[Memory.datas[spawn.room.name].toPioneer].find(FIND_HOSTILE_CREEPS).length > 0 || Game.rooms[Memory.datas[spawn.room.name].toPioneer].find(FIND_HOSTILE_STRUCTURES).length > 0) && (!creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer] || creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer].length < 6)) {
                            spawn.spawnCreep(dynamicSpawningS(spawn.room, 12), 'G' + (Game.time % 1651) + spawn.room.name, 
                                {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: Memory.datas[spawn.room.name].toPioneer}});
                        } else if(!creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer] || creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer].length < 1) {
                            spawn.spawnCreep(dynamicSpawningS(spawn.room, 12), 'G' + (Game.time % 1651) + spawn.room.name, 
                                {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: Memory.datas[spawn.room.name].toPioneer}});
                        } else if(!creepsRole["pioneer"][true] || creepsRole["pioneer"][true].length <= 0 && (!Game.rooms[Memory.datas[spawn.room.name].toPioneer] || !Game.rooms[Memory.datas[spawn.room.name].toPioneer].controller.owner || !Game.rooms[Memory.datas[spawn.room.name].toPioneer].controller.owner.my)) {
                            spawn.spawnCreep([CLAIM, MOVE], "PC" + Game.time + spawn.room.name, {memory: {role: 'pioneer', room: spawn.room.name, buildRoom: Memory.datas[spawn.room.name].toPioneer, claimer: true}})
                        } else if(!creepsRole["pioneer"][false] || creepsRole["pioneer"][false].length <= 4) {
                            spawn.spawnCreep(pioneerSpawning(spawn.room), "PB" + Game.time + spawn.room.name, {memory: {role: 'pioneer', room: spawn.room.name, buildRoom: Memory.datas[spawn.room.name].toPioneer, claimer: false}})
                        } else if(!creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer] || creepsRole["guard"][Memory.datas[spawn.room.name].toPioneer].length < 3) {
                            spawn.spawnCreep(dynamicSpawningS(spawn.room, 12), 'G' + (Game.time % 1651) + spawn.room.name, 
                                {memory: {role: 'guard', room: spawn.room.name, roomToGoTo: Memory.datas[spawn.room.name].toPioneer}});
                        }
                    }
                } else if(Memory.datas[spawn.room.name].powerRoom) {
                    let powerBank = Game.getObjectById(Memory.power[Memory.datas[spawn.room.name].powerRoom]);
                    if(Game.rooms[Memory.datas[spawn.room.name].powerRoom] && !powerBank) {
                        Memory.datas[spawn.room.name].powerRoom = undefined;
                    } else {
                        if(!creepsRole["powerGetter"]) {
                            creepsRole["powerGetter"] = [];
                        }
                        if(creepsRole["powerGetter"].length < 3 && (!powerBank || powerBank.hits <= 700000)) {
                            spawn.spawnCreep(dynamicSpawningHaul(spawn.room), 'PowerHauler' + (Game.time % 1651) + spawn.room.name, 
                                {memory: {role: 'powerGetter', room: spawn.room.name, roomToGoTo: Memory.datas[spawn.room.name].powerRoom}});
                            return;
                        }
                        global.makeDuo("P" + spawn.room.name, Memory.datas[spawn.room.name].powerRoom, spawn.room.name, "powerGetter", false, [], {lockTarget: Memory.power[Memory.datas[spawn.room.name].powerRoom], stage: null});
                    }
                } else if(creepsRole["goofer"].length < 1 && Memory.datas[spawn.room.name].gooferRoom && spawn.room.controller.level >= 3) {
                    spawn.spawnCreep([MOVE], 'Goofer' + Game.time % 1651 + spawn.room.name, 
                        {memory: {role: 'goofer', room: spawn.room.name, gooferRoom: Memory.datas[spawn.room.name].gooferRoom}});
                    continue;
                }/** else if((spawn.room.name === "E1N1" || spawn.room.name === "E2N1") && creepsRole["helper"].length < 1) {
                    spawn.spawnCreep(pioneerSpawning(spawn.room), 'HL' + (Game.time % 1651) + spawn.room.name, 
                        {memory: {role: 'helper', room: spawn.room.name, rtb: "W3N6", rth: "W2N6"}});
                }*/
                //Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE], "PioneerBuilder", {memory: {role: 'pioneer', room: Game.spawns["Spawn1"].room.name, buildRoom: "E18S58", claimer: false, waypoints: [E19S52, E22S52], waypoint: 0}})
                //Game.spawns["Spawn1"].spawnCreep([CLAIM, MOVE], "PioneerClaimer", {memory: {role: 'pioneer', room: Game.spawns["Spawn1"].room.name, buildRoom: "E21S52", claimer: true, waypoints: ["E19S52"], waypoint: 0}})
            }
        }
    }
};

