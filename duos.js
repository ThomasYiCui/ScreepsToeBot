if(!Memory.duos) {
    Memory.duos = {};
}
let getBoosts = function(duo) {
    let duoInfo = Memory.duos[duo];
    let damager = Game.creeps[duoInfo.damager]
    if(!Memory.datas[duoInfo.roomToSpawn] || !Memory.datas[duoInfo.roomToSpawn].labs) {
        return;
    }
    if(damager) {
        for(i in damager.body) {
            if(damager.body[i].boost) {
                continue;
            }
            let boost = null;
            switch(damager.body[i].type) {
                // TOUGH 0, HEAL 1, MOVE 2, RANGED 3, WORK 4, ATTACK
                case MOVE:
                    boost = 2;
                break;
                case HEAL:
                    boost = 1;
                break;
                case TOUGH:
                    boost = 0;
                break;
                case RANGED_ATTACK:
                    boost = 3;
                break;
                case WORK:
                    boost = 4;
                break;
                case ATTACK:
                    boost = 5;
                break;
            }
            if(!Memory.datas[duoInfo.roomToSpawn].labs) {
                return;
            }
            if(boost < Memory.datas[duoInfo.roomToSpawn].labs.length) {
                let lab = Memory.datas[duoInfo.roomToSpawn].labs[boost];
                if(Game.getObjectById(lab)) {
                    damager.moveTo(Game.getObjectById(lab), {range: 1, reusePath: 15, priority: 15});
                    Game.getObjectById(lab).boostCreep(damager);
                    break;
                } else {
                    continue;
                }
            }
        }
    }
    let healer = Game.creeps[duoInfo.healer];
    if(healer) {
        for(i in healer.body) {
            if(healer.body[i].boost) {
                continue;
            }
            let boost = null;
            switch(healer.body[i].type) {
                case MOVE:
                    boost = 2;
                break;
                case HEAL:
                    boost = 1;
                break;
                case TOUGH:
                    boost = 0;
                break;
                case RANGED_ATTACK:
                    boost = 3;
                break;
                case WORK:
                    boost = 4;
                break;
                case ATTACK:
                    boost = 5;
                break;
            }
            let lab = Memory.datas[duoInfo.roomToSpawn].labs[boost];
            if(Game.getObjectById(lab)) {
                healer.moveTo(Game.getObjectById(lab), {range: 1, reusePath: 15, priority: 14});
                Game.getObjectById(lab).boostCreep(healer);
                break;
            } else {
                continue;
            }
        }
    }
}
let renewDuo = function(duo) {
    let spawns = Game.rooms[Memory.duos[duo].roomToSpawn].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN && !s.spawning});
    if(Game.creeps[Memory.duos[duo].healer] && spawns[0]) {
        if(Game.creeps[Memory.duos[duo].healer].ticksToLive <= 1480) {
            spawns[0].renewCreep(Game.creeps[Memory.duos[duo].healer]);
        }
        if(spawns[0]) {
            Game.creeps[Memory.duos[duo].healer].moveTo(spawns[0], {range: 1, reusePath: 5, priority: 14})
        }
    }
    if(Game.creeps[Memory.duos[duo].damager] && spawns[0]) {
        if(Game.creeps[Memory.duos[duo].damager].ticksToLive <= 1480) {
            spawns[0].renewCreep(Game.creeps[Memory.duos[duo].damager]);
        }
        if(spawns[0]) {
            Game.creeps[Memory.duos[duo].damager].moveTo(spawns[0], {range: 1, reusePath: 5, priority: 14})
        }
    }
    if(Memory.duos[duo].options.stage && Memory.duos[duo].options.stage < Game.time) {
        Memory.duos[duo].phase = "attack";
    } else if(!Memory.duos[duo].options.stage && Game.creeps[Memory.duos[duo].damager] && Game.creeps[Memory.duos[duo].damager].ticksToLive > 1450 && Game.creeps[Memory.duos[duo].healer] && Game.creeps[Memory.duos[duo].healer].ticksToLive > 1450) {
        Memory.duos[duo].phase = "attack";
    }
}
let runHealer = function(duo) {
    if(!Game.creeps[Memory.duos[duo].healer] || !Game.creeps[Memory.duos[duo].damager]) {
        return;
    }
    if(Game.creeps[Memory.duos[duo].healer].hits < Game.creeps[Memory.duos[duo].healer].hitsMax && Game.creeps[Memory.duos[duo].healer].hitsMax - Game.creeps[Memory.duos[duo].healer].hits > Game.creeps[Memory.duos[duo].damager].hitsMax - Game.creeps[Memory.duos[duo].damager].hits) {
        Game.creeps[Memory.duos[duo].healer].heal(Game.creeps[Memory.duos[duo].healer]);
    } else {
        if(Game.creeps[Memory.duos[duo].damager].hits < Game.creeps[Memory.duos[duo].damager].hitsMax) {
            Game.creeps[Memory.duos[duo].healer].heal(Game.creeps[Memory.duos[duo].damager]);
        } else {
            let damagedCreeps = Game.creeps[Memory.duos[duo].healer].pos.findInRange(FIND_MY_CREEPS, 1, {
                filter: (creep) => creep.hits < creep.hitsMax
            });
            if(damagedCreeps.length > 0) {
                Game.creeps[Memory.duos[duo].healer].heal(damagedCreeps[0]);
                return;
            } else {
                damagedCreeps = Game.creeps[Memory.duos[duo].healer].pos.findInRange(FIND_MY_CREEPS, 3, {
                    filter: (creep) => creep.hits < creep.hitsMax
                });
                if(damagedCreeps.length > 0) {
                    Game.creeps[Memory.duos[duo].healer].rangedHeal(damagedCreeps[0]);
                    return;
                } else {
                    Game.creeps[Memory.duos[duo].healer].heal(Game.creeps[Memory.duos[duo].damager]);
                }
            }
        }
    }
    if(Memory.duos[duo].duoType === "heal") {
        if(Game.creeps[Memory.duos[duo].healer].hits < Game.creeps[Memory.duos[duo].healer].hitsMax && Game.creeps[Memory.duos[duo].healer].hitsMax - Game.creeps[Memory.duos[duo].healer].hits > Game.creeps[Memory.duos[duo].damager].hitsMax - Game.creeps[Memory.duos[duo].damager].hits) {
            Game.creeps[Memory.duos[duo].damager].heal(Game.creeps[Memory.duos[duo].healer]);
        } else {
            if(Game.creeps[Memory.duos[duo].damager].hits < Game.creeps[Memory.duos[duo].damager].hitsMax) {
                Game.creeps[Memory.duos[duo].damager].heal(Game.creeps[Memory.duos[duo].damager]);
            } else {
                const damagedCreeps = Game.creeps[Memory.duos[duo].damager].pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (creep) => creep.hits < creep.hitsMax
                });
                if(damagedCreeps.length > 0) {
                    Game.creeps[Memory.duos[duo].damager].heal(damagedCreeps[0]);
                } else {
                    damagedCreeps = Game.creeps[Memory.duos[duo].damager].pos.findInRange(FIND_MY_CREEPS, 3, {
                        filter: (creep) => creep.hits < creep.hitsMax
                    });
                    if(damagedCreeps.length > 0) {
                        Game.creeps[Memory.duos[duo].damager].rangedHeal(damagedCreeps[0]);
                    } else {
                        Game.creeps[Memory.duos[duo].damager].heal(Game.creeps[Memory.duos[duo].damager]);
                    }
                }
            }
        }
    }
    if(!Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) || !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), 1)) {
        Game.creeps[Memory.duos[duo].healer].moveTo(Game.creeps[Memory.duos[duo].damager], {range: 0, reusePath: 5, priority: 14});
    }
    //Game.creeps[Memory.duos[duo].healer].heal(Game.creeps[Memory.duos[duo].healer]);
}
let findEnemyMelee = function(duo) {
    if(!Game.creeps[Memory.duos[duo].damager]) {
        return;
    }
    let enemy = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_CREEPS
    , {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Source Keeper" && creep.owner.username !== "Power Bank" && creep.owner.username !== "Power Bank"}});
    if(enemy) {
        return enemy.id;
    }
    let enemySpawns = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (s) => (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.structureType === STRUCTURE_SPAWN && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank"});
    if(enemySpawns) {
        return enemySpawns.id;
    }
    let enemyStructureN = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_STORAGE && s.structureType !== STRUCTURE_CONTROLLER && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7)});
    if(enemyStructureN) {
        return enemyStructureN.id;
    }
    let enemyStructure = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (s) =>(!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.structureType !== STRUCTURE_CONTROLLER && s.structureType !== STRUCTURE_STORAGE && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank"});
    if(enemyStructure) {
        return enemyStructure.id;
    }
    return null;
}
let findEnemyRange = function(duo) {
    let enemyClose = Game.creeps[Memory.duos[duo].damager].pos.findClosestByRange(FIND_HOSTILE_CREEPS
    , {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Source Keeper" && creep.owner.username !== "Power Bank" && creep.owner.username !== "Power Bank" && Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(creep, 3) && creep.pos.lookFor(LOOK_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_RAMPART}).length <= 0 && Game.creeps[Memory.duos[duo].damager].getActiveBodyparts(RANGED_ATTACK) * 10 < creep.hits}});
    if(enemyClose) {
        return enemyClose.id;
    }
    let enemySpawns = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER) && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7)});
    if(enemySpawns) {
        return enemySpawns.id;
    }
    let enemyStructureN = Game.creeps[Memory.duos[duo].damager].pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_STORAGE && s.structureType !== STRUCTURE_CONTROLLER && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.pos.lookFor(LOOK_STRUCTURES, {filter: (se) => se.structureType === STRUCTURE_RAMPART}).length <= 0});
    if(enemyStructureN) {
        return enemyStructureN.id;
    }
    let enemy = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_CREEPS
    , {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && creep.owner.username !== "Power Bank" && creep.owner.username !== "Source Keeper" && creep.owner.username !== "Power Bank" && (creep.getActiveBodyparts(WORK) > 0 || creep.getActiveBodyparts(ATTACK) > 0 || creep.getActiveBodyparts(RANGED_ATTACK) > 0 || creep.getActiveBodyparts(CARRY) > 0)}});
    if(enemy) {
        return enemy.id;
    }
    let enemyStructure = Game.creeps[Memory.duos[duo].damager].pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_CONTROLLER && s.structureType !== STRUCTURE_STORAGE && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7)});
    if(enemyStructure) {
        return enemyStructure.id;
    }
    return null;
}
let findEnemyRam = function(duo) {
    let enemySpawns = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && s.owner.username !== "Invader"});
    if(enemySpawns) {
        return enemySpawns.id;
    }
    let enemyUnRampart = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_CONTROLLER && s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_STORAGE && 
        (s.owner && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && s.owner.username !== "Power Bank" && s.owner.username !== "Invader")
    });
    if(enemyUnRampart) {
        return enemyUnRampart.id;
    }
    let enemyStructure = Game.creeps[Memory.duos[duo].damager].pos.findClosestByPath(FIND_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_CONTROLLER && 
        (s.owner && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && s.owner.username !== "Power Bank" && s.owner.username !== "Invader")
    });
    if(enemyStructure) {
        return enemyStructure.id;
    }
}
let runDamager = function(duo) {
    if(!Game.creeps[Memory.duos[duo].damager]) {
        return;
    }
    if(Memory.duos[duo].options.followingDuo && Memory.duos[Memory.duos[duo].options.followingDuo]) {
        let followingDuoDamager = Game.creeps[Memory.duos[Memory.duos[duo].options.followingDuo].damager];
        if(Game.creeps[Memory.duos[duo].damager] && followingDuoDamager && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(followingDuoDamager, 2) && (Game.creeps[Memory.duos[duo].damager].room.name === followingDuoDamager.room.name && followingDuoDamager.fatigue > 0) && followingDuoDamager.pos.y > 1 && followingDuoDamager.pos.y < 49 && followingDuoDamager.pos.x > 1 && followingDuoDamager.pos.x < 49) {
            Game.creeps[Memory.duos[duo].damager].say("Connect Duo", true);
            Game.creeps[Memory.duos[duo].damager].moveTo(followingDuoDamager, {range: 2, priority: 17});
            return;
        }
    }
    //g.log((Game.creeps[Memory.duos[duo].damager] && Game.creeps[Memory.duos[duo].healer] && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.creeps[Memory.duos[duo].healer], 1) && (Game.creeps[Memory.duos[duo].damager].room.name === Game.creeps[Memory.duos[duo].healer].room.name || Game.creeps[Memory.duos[duo].healer].fatigue > 0) && Game.creeps[Memory.duos[duo].healer].pos.y > 1 && Game.creeps[Memory.duos[duo].healer].pos.y < 49 && Game.creeps[Memory.duos[duo].healer].pos.x > 1 && Game.creeps[Memory.duos[duo].healer].pos.x < 49));
    if(Game.creeps[Memory.duos[duo].healer] && Game.creeps[Memory.duos[duo].damager]) {
        if(Game.creeps[Memory.duos[duo].damager].room.name === Game.creeps[Memory.duos[duo].healer].room.name && Game.creeps[Memory.duos[duo].damager] && Game.creeps[Memory.duos[duo].healer] && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.creeps[Memory.duos[duo].healer], 1) || (Game.creeps[Memory.duos[duo].damager].room.name === Game.creeps[Memory.duos[duo].healer].room.name && Game.creeps[Memory.duos[duo].healer].fatigue > 0) && Game.creeps[Memory.duos[duo].healer].pos.y > 1 && Game.creeps[Memory.duos[duo].healer].pos.y < 49 && Game.creeps[Memory.duos[duo].healer].pos.x > 1 && Game.creeps[Memory.duos[duo].healer].pos.x < 49) {
            Game.creeps[Memory.duos[duo].damager].say("Connect Healer", true);
            Game.creeps[Memory.duos[duo].healer].moveTo(Game.creeps[Memory.duos[duo].damager], {range: 1, priority: 20});
            if(!Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.creeps[Memory.duos[duo].healer], 2)) {
                Game.creeps[Memory.duos[duo].damager].moveTo(Game.creeps[Memory.duos[duo].healer], {range: 1, priority: 17});
            }
            return;
        }
    }
    //console.log((Game.creeps[Memory.duos[duo].damager].hits <= Game.creeps[Memory.duos[duo].damager].hitsMax - 400 && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target)));
    if(Game.creeps[Memory.duos[duo].damager].hits <= Game.creeps[Memory.duos[duo].damager].hitsMax - 400 && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Memory.duos[duo].duoType !== "powerGetter") {
        Game.creeps[Memory.duos[duo].damager].say("Flee!", true);
        let ret = PathFinder.search(Game.creeps[Memory.duos[duo].damager].pos, {pos: Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target).pos, range: 8}, {flee: true})
        let pos = ret.path[0];
        if(pos) {
            Game.creeps[Memory.duos[duo].damager].moveTo(pos, {priority: 18, range: 0});
        }
        return;
    }
    //console.log(!Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target));
    if(!Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) || Game.creeps[Memory.duos[duo].damager].memory.target === Memory.duos[duo].options.lockTarget) {
        if(Memory.duos[duo].onpoint < Memory.duos[duo].waypoint.length && Memory.duos[duo].waypoint && Memory.duos[duo].waypoint[Memory.duos[duo].onpoint]) {
            if(Memory.duos[duo].options.duoFollow && Memory.duos[Memory.duos[duo].options.duoFollow]) {
                Game.creeps[Memory.duos[duo].damager].moveTo(Game.creeps[Memory.duos[Memory.duos[duo].options.duoFollow].healer], {range: 0, preferHighway: true, reusePath: 15, priority: 12});
            } else {
                Game.creeps[Memory.duos[duo].damager].say(Memory.duos[duo].onpoint + ", " + Memory.duos[duo].waypoint[Memory.duos[duo].onpoint], true);
                Game.creeps[Memory.duos[duo].damager].moveTo(new RoomPosition(25, 25, Memory.duos[duo].waypoint[Memory.duos[duo].onpoint]), {range: 0, preferHighway: true, reusePath: 15, priority: 15});
            }
            if(Game.creeps[Memory.duos[duo].damager].room.name === Memory.duos[duo].waypoint[Memory.duos[duo].onpoint]) {
                Memory.duos[duo].onpoint+=1;
            }
        } else if(Game.creeps[Memory.duos[duo].damager].room.name !== Memory.duos[duo].roomToAttack) {
            Game.creeps[Memory.duos[duo].damager].say(Memory.duos[duo].roomToAttack);
            Game.creeps[Memory.duos[duo].damager].moveTo(new RoomPosition(25, 25, Memory.duos[duo].roomToAttack), {range: 0, preferHighway: true, reusePath: 15, priority: 15, avoidRooms: ["E51S51"]});
        }
    }
    //console.log(Game.getObjectById(Memory.duos[duo].options.lockTarget), duo);
    if(Game.getObjectById(Memory.duos[duo].options.lockTarget) && Memory.duos[duo].roomToAttack === Game.creeps[Memory.duos[duo].damager].room.name || Memory.duos[duo].options.lockTarget && Memory.duos[duo].roomToAttack !== Game.creeps[Memory.duos[duo].damager].room.name) {
        Game.creeps[Memory.duos[duo].damager].memory.target = Memory.duos[duo].options.lockTarget;
    } else {
        if(Memory.duos[duo].duoType === "ram") {
            Game.creeps[Memory.duos[duo].damager].memory.target = findEnemyRam(duo);
        } else if(Memory.duos[duo].duoType === "melee") {
            Game.creeps[Memory.duos[duo].damager].memory.target = findEnemyMelee(duo);
        } else if(Memory.duos[duo].duoType === "range") {
            Game.creeps[Memory.duos[duo].damager].memory.target = findEnemyRange(duo);
        }
    }
    if(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target)) {
        switch(Memory.duos[duo].duoType) {
            case "powerGetter":
                Game.creeps[Memory.duos[duo].damager].say("Attack target: " + Game.creeps[Memory.duos[duo].damager].memory.target);
                Game.creeps[Memory.duos[duo].damager].attack(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target));
                Game.creeps[Memory.duos[duo].damager].moveTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), {range: 0, priority: 15})
                return;
            break;
            case "melee":
                Game.creeps[Memory.duos[duo].damager].attack(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target));
                Game.creeps[Memory.duos[duo].damager].moveTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), {range: 0, priority: 15})
                return;
            break;
            case "range":
                if(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target).room.name === Game.creeps[Memory.duos[duo].damager].room.name && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), 1)) {
                    Game.creeps[Memory.duos[duo].damager].say("Attack target: " + Game.creeps[Memory.duos[duo].damager].memory.target);
                    Game.creeps[Memory.duos[duo].damager].moveTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), {maxRooms: 1, range: 1, priority: 15})
                }
                if(Game.creeps[Memory.duos[duo].damager] && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), 1)) {
                    Game.creeps[Memory.duos[duo].damager].rangedMassAttack();
                    return;
                } else if(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target)) {
                    Game.creeps[Memory.duos[duo].damager].rangedAttack(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target));
                    return;
                }
                Game.creeps[Memory.duos[duo].damager].rangedMassAttack();
            break;
            case "ram":
                if(Game.creeps[Memory.duos[duo].damager].dismantle(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target)) === OK) {
                    return;
                }
            break;
            case "heal":
                Game.creeps[Memory.duos[duo].damager].moveTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), {range: 0, priority: 15})
            break;
        }
    }
    //console.log(Game.creeps[Memory.duos[duo].damager].name, Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target).room.name === Game.creeps[Memory.duos[duo].damager].room.name && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), 1));
    if(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target).room.name === Game.creeps[Memory.duos[duo].damager].room.name && !Game.creeps[Memory.duos[duo].damager].pos.inRangeTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), 1)) {
        Game.creeps[Memory.duos[duo].damager].say("Attack target: " + Game.creeps[Memory.duos[duo].damager].memory.target);
        Game.creeps[Memory.duos[duo].damager].moveTo(Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target), {maxRooms: 1, range: 1, priority: 15})
    }
    if(!Game.getObjectById(Game.creeps[Memory.duos[duo].damager].memory.target) && Memory.duos[duo].duoType === "powerGetter" && Memory.duos[duo].damager.roomToSpawn) {
        Game.creeps[Memory.duos[duo].damager].moveTo(new RoomPosition(25, 25, Memory.duos[duo].damager.roomToSpawn), {maxRooms: 0, range: 20, priority: 15})
    }
};
let spawnDuo = function(duo) {
// Duo Attacker
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], "DuoAttacker");
// Duo Healer
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], "DuoHealer");
// Duo Dismantle
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK], "DuoD");
    if(!Game.rooms[Memory.duos[duo].roomToSpawn]) {
        return;
    }
    let spawns = Game.rooms[Memory.duos[duo].roomToSpawn].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN});
    for(let i in spawns) {
        if(!spawns[i].spawning) {
            if(!Game.creeps[Memory.duos[duo].healer]) {
                let cBody = null;
                if(Memory.duos[duo].duoType === "powerGetter") {
                    if(spawns[i].room.controller.level === 7) {
                        cBody = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
                    } else if(spawns[i].room.controller.level === 8) {
                        cBody = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
                    }
                } else if(spawns[i].room.controller.level === 5) {
                    cBody = [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                } else if(spawns[i].room.controller.level === 6) {
                    cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                } else if(spawns[i].room.controller.level === 7) {
                    cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                }
                if(spawns[i].spawnCreep(cBody, "DuoHealer" + Game.time + Memory.duos[duo].roomToSpawn) === OK) {
                    Memory.duos[duo].healer = "DuoHealer" + Game.time + Memory.duos[duo].roomToSpawn;
                }
            } else if(!Game.creeps[Memory.duos[duo].damager]) {
                let name = null;
                if(Memory.duos[duo].duoType === "melee") {
                    let cBody = null;
                    if(spawns[i].room.controller.level === 5) {
                        cBody = [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                    } else if(spawns[i].room.controller.level === 6) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];
                    } else if(spawns[i].room.controller.level === 7) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];
                    }
                    spawns[i].spawnCreep(cBody, "DuoRam" + Game.time + Memory.duos[duo].roomToSpawn);
                    name = "DuoRam" + Game.time + Memory.duos[duo].roomToSpawn;
                } else if(Memory.duos[duo].duoType === "ram") {
                    let cBody = null;
                    if(spawns[i].room.controller.level === 5) {
                        cBody = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                    } else if(spawns[i].room.controller.level === 6) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
                    } else if(spawns[i].room.controller.level === 7) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
                    }
                    spawns[i].spawnCreep(cBody, "DuoRam" + Game.time + Memory.duos[duo].roomToSpawn);
                    name = "DuoRam" + Game.time + Memory.duos[duo].roomToSpawn;
                } else if(Memory.duos[duo].duoType === "range") {
                    let cBody = null;
                    if(spawns[i].room.controller.level === 6) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
                    } else if(spawns[i].room.controller.level === 7) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
                    }
                    spawns[i].spawnCreep(cBody, "DuoRange" + Game.time + Memory.duos[duo].roomToSpawn);
                    name = "DuoRange" + Game.time + Memory.duos[duo].roomToSpawn;
                } else if(Memory.duos[duo].duoType === "heal") {
                    let cBody = null;
                    if(spawns[i].room.controller.level === 5) {
                        cBody = [HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
                    } else if(spawns[i].room.controller.level === 6) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                    } else if(spawns[i].room.controller.level === 7) {
                        cBody = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL];
                    }
                    spawns[i].spawnCreep(cBody, "DuoHealer2" + Game.time + Memory.duos[duo].roomToSpawn)
                    name = "DuoHealer2" + Game.time + Memory.duos[duo].roomToSpawn;
                } else if(Memory.duos[duo].duoType === "powerGetter") {
                    let cBody = null;
                    if(spawns[i].room.controller.level === 7) {
                        cBody = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
                    } else if(spawns[i].room.controller.level === 8) {
                        cBody = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK]
                    }
                    spawns[i].spawnCreep(cBody, "DuoPowerGetter" + Game.time + Memory.duos[duo].roomToSpawn)
                    name = "DuoPowerGetter" + Game.time + Memory.duos[duo].roomToSpawn;
                }
                Memory.duos[duo].damager = name;
            } else {
                Memory.duos[duo].phase = "renew"
            }
        }
    }
};
let runDuo = function(duo) {
    if(Memory.duos[duo] && !Memory.duos[duo].options) {
        Memory.duos[duo].options = {};
    }
    if(!Memory.duos[duo] || Memory.duos[duo].options.duoFollow && !Memory.duos[Memory.duos[duo].options.duoFollow]) {
        return;
    }
    if(Memory.duos[duo].options.duoFollow) {
        if(!Game.creeps[Memory.duos[Memory.duos[duo].options.duoFollow].healer]) {
            return;
        }
        if(!Game.creeps[Memory.duos[Memory.duos[duo].options.duoFollow].damager]) {
            return;
        }
    }
    if(Memory.duos[duo].phase === "spawn") {
        spawnDuo(duo);
    } else if(Memory.duos[duo].phase === "renew") {
        renewDuo(duo);
    } else if(Memory.duos[duo].phase === "attack") {
        if(!Game.creeps[Memory.duos[duo].damager] && !Game.creeps[Memory.duos[duo].healer]) {
            Memory.duos[duo] = undefined;
            return;
        }
        runHealer(duo);
        runDamager(duo);
        if(Memory.duos[duo].boosted && Memory.duos[duo].duoType !== "powerGetter") {
            getBoosts(duo);
        }
    }
};
let runAllDuos = function() {
    for(let i in Memory.duos) {
        runDuo(i);
    }
}
function makeDuo(name, toAttack, toSpawn, type, isBoosted, wayPoint, options) {
    if(!Memory.duos[name]) {
        Memory.duos[name] = {
            damager: null,
            healer: null,
            roomToAttack: toAttack,
            roomToSpawn: toSpawn,
            duoType: type,
            boosted: isBoosted,
            phase: "spawn",
            options: options,
            waypoint: wayPoint,
            onpoint: 0,
        };
    }
}
global.makeDuo = makeDuo;
//global.makeDuo("Leader", "E57S57", "E56S51", "ram", true, ["E57S51", "E57S56"], {lockTarget: null, stage: null});
//global.makeDuo("Follower", "E51S41", "E56S51", "ram", true, ["E56S50", "E50S50", "E50S42", "E51S42"], {lockTarget: "6647b2a52dedfc31a21264c", stage: null, duoFollow: "Leader"});
//global.makeDuo("ReliefDu", "E0N1", "E1N1", "range", false, [], {lockTarget: "6681323807005a0086c67ec0", stage: null});

module.exports = runAllDuos;
