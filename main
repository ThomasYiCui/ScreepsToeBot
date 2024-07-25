// 24.4
const pserver = true;
Memory.diplomacy = {
    "ThomasCui": 11,
    "Morningtea": 10,
    "Arigilos": 10,
}
if(!Memory.war) {
    Memory.war = {};
}
if(!Memory.power) {
    Memory.power = {};
}
let dir2d = {
    7: [{x: 0, y: 0}, {x: 0, y: 1}],
    3: [{x: 1, y: 0}, {x: 1, y: 1}],
    1: [{x: 0, y: 0}, {x: 1, y: 0}],
    5: [{x: 0, y: 1}, {x: 1, y: 1}],
}
/// MARKET =======
// Game.market.deal('668bd411b19abc3512b47d16', 7000, "E1N1")

// DUO =============
// Duo Power Getter
// global.makeDuo("Leader", "E1N1", "E2N0", "powerGetter", true, [], {lockTarget: "667bf6eae91f9900f21da237", stage: null});
// Duo Attacker
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], "DuoAttacker");
// Duo Healer
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], "DuoHealer");
// Duo Dismantle
// Game.spawns["Spawn1"].spawnCreep([TOUGH,TOUGH,TOUGH,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK], "DuoD");

// global.makeDuo("Leader", "E48S53", "E56S51", "melee", true, ["E56S50", "E48S50", "E48S52"], {lockTarget: null, stage: null});


/*
Memory.duos = {
    "1": {
        damager: "DuoRange58121792E56S51",
        healer: "DuoHealer58121711E56S51",
        roomToAttack: "E57S39",
        roomToSpawn: "E56S51",
        duoType: "range",
        phase: "attack",
    },
}*/

function makeDuo(name, toAttack, toSpawn, type, isBoosted) {
    if(!Memory.duos[name]) {
        Memory.duos[name] = {
            damager: null,
            healer: null,
            roomToAttack: toAttack,
            roomToSpawn: toSpawn,
            duoType: type,
            boosted: isBoosted,
            phase: "spawn",
        };
    }
}
Memory.minimumStore = 5000;
Memory.labStore = 5000;
//makeDuo("TestDrive", "E49S52", "E56S51", "range", true);
function addRoom(roomGroup, roomName) {
    Memory.roomGroup[roomGroup].push({name: roomName});
}
//addRoom("1", "E55S53");

// PIONEERS =============
// Pioneer Claim
// Game.spawns["Spawn2"].spawnCreep([CLAIM, MOVE], "PioneerClaimer", {memory: {role: 'pioneer', room: Game.spawns["Spawn2"].room.name, buildRoom: "E53S49", claimer: true}})
// Pioneer Builders
// Game.spawns["Spawn2"].spawnCreep([WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE, WORK, MOVE, CARRY, MOVE], "PioneerBuilder2", {memory: {role: 'pioneer', room: Game.spawns["Spawn2"].room.name, buildRoom: "E53S49", claimer: false}})


// POWERS =============
// Power breaker
// Game.spawns["Spawn1"].spawnCreep([ATTACK, MOVE, HEAL, ATTACK, MOVE, HEAL, ATTACK, MOVE, HEAL], "PowerBreaker", {memory: {role: 'powerGetter', room: Game.spawns["Spawn1"].room.name, roomToGoTo: Game.spawns["Spawn1"].room.name}})
// Power Hauler
// Game.spawns["Spawn1"].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE,CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], "PowerCollector", {memory: {role: 'powerGetter', room: Game.spawns["Spawn1"].room.name, roomToGoTo: Game.spawns["Spawn1"].room.name}})

// ENERGY SURPLUSS ==========
// Super Upgrader
// Game.spawns["Spawn1"].spawnCreep([CARRY, MOVE,CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE], "Upgrader123123Iloveme", {memory: {role: 'upgrader', room: Game.spawns["Spawn1"].room.name}})

// SOLDIER =======
// Game.spawns["Spawn1"].spawnCreep([ATTACK, MOVE, HEAL, ATTACK, MOVE, HEAL, ATTACK, MOVE, HEAL], "SoldierLarry", {memory: {role: 'soldier', room: Game.spawns["Spawn1"].room.name, roomToGoTo: "W9N9"}});

const utils = require('utils');
const calcTowerDamage = require('roomTower');
const allianceManager = require('allianceManager');
const wM = require('warManager');
const warManager = new wM();

let cpuToUse = {
    creeps: {
        
    },
    pixelMarket: 0,
    spawnLogic: 0,
    towers: 0,
    duoLogic: 0,
    roomsGroup: 0,
    memHack: 0,
    tick: 0,
};

if(!Memory.datas) {
    Memory.datas = {};
}
if(!Memory.duos) {
    Memory.duos = {};
}
Memory.unownedMessage = [
    "I propose a new axiom! Toes are the best",
    "Are there more doors then wheels?",
    "The important questions must be answered!",
    "How random is random. Are these statements really random?",
    "I propose a new commandment! All shall love their toes",
    "Ie now kno gramer",
    "# screeps for life",
    "If your computer is a computer who are you",
    "If you don't like toes what are you doing.",
    "I might be insane but probably not",
    "If your happy and you know it clap your hands................",
    "Love your toes already stop being so stubborn.",
    "Self diagnosed depression is a problem. Stop doing that",
    "I will find you and kill you if you keep not loving your toes",
    "How many kettles are made of meatal",
    "Is cereal a soup",
    "Cereal is NOT a breakfast. Its a break fast",
    "Kidnapped kids kool? kkk",
    "Breaking news! Bad code!",
    "Seminar - n. a conference or other meeting for discussion or training.",
    "Eternity of Screeps!",
    "Shame on you",
    "Bring him back. Hit-",
    "Communism was kind of nice",
    "organization of dumb dumbs",
    "REBEL AGAINST THE GOVERMENT",
    "coalition 4",
    "Not the blender, put it in the oven",
    "Ask about us! We won't answer",
    "Grenade Parade?",
    "I'm qualified",
    "correspondence is a pretty long word you agree?",
    "Your biggest fan ❤️",
    "Work harder get smarter",
    "Peasants deserve no pay",
    "These jokes aren't really hitting anymore are they",
    "I snack on feasts!",
    "THE WALL, ITS REAL",
    "Cheer up you have like 4000 weeks to start of. How many weeks are left?",
    "quick cover the evidence",
    "Donald duck is a duck. But he walks so is he a duck. Do ducks walk?",
    "if it looks like a duck, swims like a duck and quacks like a duck, then it probably is a duck",
    "Quack Quack.",
    "got sacked. donations pls",
    "Lord have mercy",
    "BLOOD FOR THE BLOOD GOD",
    "Lets build a shrine!",
    "Why'd she leave 😭",
    "Its a pipeb-GIFT!",
    "Why are we here. When are we here. How are we here",
    "Evil go away!",
    "Are we the villians?",
    "In the beginning father created me and me",
    "Ever heard of a Shlong?",
    "and it was a disappointment",
]
Memory.attacking = undefined;
global.lastMemoryTick = undefined;
function exportStats() {
  // Reset stats object
  Memory.stats = {
    gcl: {},
    rooms: {},
    cpu: {},
    resources: {},
  };

  Memory.stats.time = Game.time;

  // Collect room stats
  for (let roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    let isMyRoom = (room.controller ? room.controller.my : false);
    if (isMyRoom) {
      let roomStats = Memory.stats.rooms[roomName] = {};
      roomStats.storageEnergy           = (room.storage ? room.storage.store.energy : 0);
      roomStats.terminalEnergy          = (room.terminal ? room.terminal.store.energy : 0);
      roomStats.energyAvailable         = room.energyAvailable;
      roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
      roomStats.controllerProgress      = Math.round(room.controller.progress/room.controller.progressTotal * 100);
      roomStats.controllerLevel         = room.controller.level;
    }
  }

  // Collect GCL stats
  Memory.stats.gcl.progress      = Math.round(Game.gcl.progress/Game.gcl.progressTotal * 100);
  Memory.stats.gcl.level         = Game.gcl.level;

  // Collect CPU stats
  Memory.stats.cpu.bucket        = Game.cpu.bucket;
  Memory.stats.cpu.limit         = Game.cpu.limit;
  Memory.stats.cpu.used          = Game.cpu.getUsed();
  
  
  // Collect resoure stats
  Memory.stats.resources.credits  = Game.market.credits || 0;
  Memory.stats.resources.pixels  = Game.resources[PIXEL] || 0;
  Memory.stats.resources.accessKeys  = Game.resources[ACCESS_KEY] || 0;
  Memory.stats.resources.cpuUnlock  = Game.resources[CPU_UNLOCK] || 0;
}
function tryInitSameMemory() {
    if (lastMemoryTick && global.LastMemory && Game.time == (lastMemoryTick + 1)) {
        delete global.Memory
        global.Memory = global.LastMemory
        RawMemory._parsed = global.LastMemory
    } else {
        Memory;
        global.LastMemory = RawMemory._parsed
    }
    lastMemoryTick = Game.time
}


const roleHarvester = require('role.harvester');
const roleMineralHarvester = require('role.mineralHarvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleScout = require('role.scout');
const rolePioneer = require('role.pioneer');
const roleGuard = require('role.guard');
const roleRepairer = require('role.repairer');
const roleHauler = require('role.hauler');
const roleLinkHauler = require('role.linkHauler');
const roleSoldier = require('role.soldier');
const roleVulture = require('role.vulture');
const roleHelper = require('role.helper');
const roleManager = require('role.manager');
const roleReserver = require('role.reserver');
const roleTowerDrainer = require("role.towerDrainer");
const rolePowerGetter = require("role.powerGetter");
const powerCreep = require('powerCreep');
const Spawners = require('spawner');
const Pathing = require('pathing');
const duos = require('duos');
const quads = require('quads');
const baseBuilder = require("baseBuilder");
const creepMissions = require("creepMissions");
const mats = {
    "Z": {
        base1: [[RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_ZYNTHIUM, RESOURCE_OXYGEN], [RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYST]],
        base2: [[RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_ZYNTHIUM, RESOURCE_HYDROGEN], [RESOURCE_ZYNTHIUM_ACID, RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYST]],
    },
    "K": {
        base1: [[RESOURCE_KEANIUM_OXIDE, RESOURCE_KEANIUM, RESOURCE_OXYGEN], [RESOURCE_KEANIUM_ALKALIDE, RESOURCE_KEANIUM_OXIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_KEANIUM_ALKALIDE, RESOURCE_CATALYST]],
        base2: [[RESOURCE_KEANIUM_HYDRIDE, RESOURCE_KEANIUM, RESOURCE_HYDROGEN], [RESOURCE_KEANIUM_ACID, RESOURCE_KEANIUM_HYDRIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_KEANIUM_ACID, RESOURCE_KEANIUM_ACID, RESOURCE_CATALYST]],
    },
    "L": {
        base1: [[RESOURCE_LEMERGIUM_OXIDE, RESOURCE_LEMERGIUM, RESOURCE_OXYGEN], [RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_LEMERGIUM_OXIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_CATALYST]],
        base2: [[RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN], [RESOURCE_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_LEMERGIUM_ACID, RESOURCE_LEMERGIUM_ACID, RESOURCE_CATALYST]],
    },
    "U": {
        base1: [[RESOURCE_UTRIUM_OXIDE, RESOURCE_UTRIUM, RESOURCE_OXYGEN], [RESOURCE_UTRIUM_ALKALIDE, RESOURCE_UTRIUM_OXIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_UTRIUM_ALKALIDE, RESOURCE_CATALYST]],
        base2: [[RESOURCE_UTRIUM_HYDRIDE, RESOURCE_UTRIUM, RESOURCE_HYDROGEN], [RESOURCE_UTRIUM_ACID, RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST]],
    },
    "H": {
        base1: [[RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM], [RESOURCE_UTRIUM_LEMERGITE, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM], [RESOURCE_GHODIUM, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE]],
        base2: [[RESOURCE_GHODIUM_HYDRIDE, RESOURCE_GHODIUM, RESOURCE_HYDROGEN], [RESOURCE_GHODIUM_ACID, RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST]],
    },
    "O": {
        base1: [[RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM], [RESOURCE_UTRIUM_LEMERGITE, RESOURCE_UTRIUM, RESOURCE_LEMERGIUM], [RESOURCE_GHODIUM, RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE]],
        base2: [[RESOURCE_GHODIUM_OXIDE, RESOURCE_GHODIUM, RESOURCE_OXYGEN], [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_GHODIUM_OXIDE, RESOURCE_HYDROXIDE], [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYST]],
    },
}

if(!Memory.mineralRooms) {
    Memory.mineralRooms = {}
}

function updateCoordinates(name, xOffset, yOffset) {
    // Parse the initial coordinates from the name
    let xDir = name[0];
    let xVal = parseInt(name[1]);
    let yDir = name[2];
    let yVal = parseInt(name[3]);

    // Apply the offsets
    xVal += xOffset;
    yVal += yOffset;

    // Determine the new directions based on the offsets
    if (xVal < 0) {
        xDir = 'W';
        xVal = Math.abs(xVal);
    } else {
        xDir = 'E';
    }

    if (yVal < 0) {
        yDir = 'S';
        yVal = Math.abs(yVal);
    } else {
        yDir = 'N';
    }

    // Construct the new name
    let newName = `${xDir}${xVal}${yDir}${yVal}`;
    return newName;
}

function Rooms() {
    this.resourceRequests = {}
}
Rooms.prototype.resourceNeeded = function(roomName) {
    if(Memory.datas[roomName].mineral) {
        switch(Memory.datas[roomName].mineral) {
            case "K":
                return ["K", "O", "H", "X"]
            break;
            case "Z":
                return ["Z", "O", "H", "X"]
            break;
            case "L":
                return ["L", "O", "H", "X"]
            break;
            case "U":
                return ["L", "O", "H", "X"]
            break;
            case "O":
                return ["L", "U", "K", "Z", "H", "O", "X"]
            break;
            case "H":
                return ["L", "U", "K", "Z", "H", "O", "X"]
            break;
            case "X":
                return ["L", "U", "K", "Z", "H", "O"]
            break;
        }
    }
}
Rooms.prototype.checkReaction = function(p, s1, s2, roomName, mStore) {
    //console.log(roomName, Game.rooms[roomName].terminal.store[p] + Game.rooms[roomName].storage.store[p], Game.rooms[roomName].terminal.store[s1] + Game.rooms[roomName].storage.store[s1], Game.rooms[roomName].terminal.store[s2] + Game.rooms[roomName].storage.store[s2], p);
    /**
    console.log(Game.rooms[roomName].terminal.store[p] + Game.rooms[roomName].storage.store[p],
        Game.rooms[roomName].terminal.store[s1] + Game.rooms[roomName].storage.store[s1],
        Game.rooms[roomName].terminal.store[s2] + Game.rooms[roomName].storage.store[s2],
        p, s1, s2, roomName);
    */
    return Game.rooms[roomName].terminal.store[p] + Game.rooms[roomName].storage.store[p] < mStore && 
        (Game.rooms[roomName].terminal.store[s1] + Game.rooms[roomName].storage.store[s1] >= 5 &&
        Game.rooms[roomName].terminal.store[s2] + Game.rooms[roomName].storage.store[s2] >= 5 ||
        Memory.datas[roomName].sourceLabs && 
        Game.getObjectById(Memory.datas[roomName].sourceLabs[0]) && 
        Game.getObjectById(Memory.datas[roomName].sourceLabs[1]) && 
        Game.getObjectById(Memory.datas[roomName].sourceLabs[0]).store[s1] >= 5 && 
        Game.getObjectById(Memory.datas[roomName].sourceLabs[1]).store[s2] >= 5);
}
Rooms.prototype.reactionToRun = function(roomName) {
    if(Memory.datas[roomName] && Memory.datas[roomName].mineral && mats[Memory.datas[roomName].mineral] && Game.rooms[roomName].terminal && Game.rooms[roomName].storage) {
        if(this.checkReaction("OH", "O", "H", roomName, Memory.labStore)) {
            return ["O", "H", "OH"];
        }
        if(Memory.datas[roomName].minInLab && Game.rooms[roomName].terminal.store[Memory.datas[roomName].minInLab[2]] + Game.rooms[roomName].storage.store[Memory.datas[roomName].minInLab[2]] < Memory.labStore * 6 &&
            Game.rooms[roomName].terminal.store[Memory.datas[roomName].minInLab[1]] + Game.rooms[roomName].storage.store[Memory.datas[roomName].minInLab[1]] >= 5 &&
            Game.rooms[roomName].terminal.store[Memory.datas[roomName].minInLab[0]] + Game.rooms[roomName].storage.store[Memory.datas[roomName].minInLab[0]] >= 5) {
            return Memory.datas[roomName].minInLab;
        }
        for(let i = 1; i < 5; i++) {
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base1[0][0], mats[Memory.datas[roomName].mineral].base1[0][1], mats[Memory.datas[roomName].mineral].base1[0][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base1[0][1], mats[Memory.datas[roomName].mineral].base1[0][2], mats[Memory.datas[roomName].mineral].base1[0][0]];
            }
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base2[0][0], mats[Memory.datas[roomName].mineral].base2[0][1], mats[Memory.datas[roomName].mineral].base2[0][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base2[0][1], mats[Memory.datas[roomName].mineral].base2[0][2], mats[Memory.datas[roomName].mineral].base2[0][0]];
            }
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base1[1][0], mats[Memory.datas[roomName].mineral].base1[1][1], mats[Memory.datas[roomName].mineral].base1[1][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base1[1][1], mats[Memory.datas[roomName].mineral].base1[1][2], mats[Memory.datas[roomName].mineral].base1[1][0]];
            }
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base2[1][0], mats[Memory.datas[roomName].mineral].base2[1][1], mats[Memory.datas[roomName].mineral].base2[1][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base2[1][1], mats[Memory.datas[roomName].mineral].base2[1][2], mats[Memory.datas[roomName].mineral].base2[1][0]];
            }
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base1[2][0], mats[Memory.datas[roomName].mineral].base1[2][1], mats[Memory.datas[roomName].mineral].base1[2][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base1[2][1], mats[Memory.datas[roomName].mineral].base1[2][2], mats[Memory.datas[roomName].mineral].base1[2][0]];
            }
            if(this.checkReaction(mats[Memory.datas[roomName].mineral].base2[2][0], mats[Memory.datas[roomName].mineral].base2[2][1], mats[Memory.datas[roomName].mineral].base2[2][2], roomName, Memory.labStore * i)) {
                return [mats[Memory.datas[roomName].mineral].base2[2][1], mats[Memory.datas[roomName].mineral].base2[2][2], mats[Memory.datas[roomName].mineral].base2[2][0]];
            }
        }
        
        if(this.checkReaction(mats[Memory.datas[roomName].mineral].base1[2][0], mats[Memory.datas[roomName].mineral].base1[2][1], mats[Memory.datas[roomName].mineral].base1[2][2], roomName, Memory.labStore * 10)) {
            return [mats[Memory.datas[roomName].mineral].base1[2][1], mats[Memory.datas[roomName].mineral].base1[2][2], mats[Memory.datas[roomName].mineral].base1[2][0]];
        }
        if(this.checkReaction(mats[Memory.datas[roomName].mineral].base2[2][0], mats[Memory.datas[roomName].mineral].base2[2][1], mats[Memory.datas[roomName].mineral].base2[2][2], roomName, Memory.labStore * 10)) {
            return [mats[Memory.datas[roomName].mineral].base2[2][1], mats[Memory.datas[roomName].mineral].base2[2][2], mats[Memory.datas[roomName].mineral].base2[2][0]];
        }
        
        if(Game.rooms[roomName].terminal.store["OH"] + Game.rooms[roomName].storage.store["OH"] < Memory.labStore * 4 && Memory.datas[roomName].mineral !== "O" && Memory.datas[roomName].mineral !== "H") {
            return ["O", "H", "OH"];
        }
    }
}
Rooms.prototype.runLabs = function(roomName) {
    if(Memory.datas[roomName].sourceLabs && Memory.datas[roomName].sourceLabs[2]) {
        for(let e in Memory.datas[roomName].sourceLabs[2]) {
            let i = Memory.datas[roomName].sourceLabs[2][e];
            if(Game.getObjectById(i) && Game.getObjectById(i).cooldown <= 0) {
                Game.getObjectById(i).runReaction(Game.getObjectById(Memory.datas[roomName].sourceLabs[0]), Game.getObjectById(Memory.datas[roomName].sourceLabs[1]));
            }
        }
    }
}
Rooms.prototype.sourceLabs = function(roomName) {
    if(Memory.datas[roomName].centerPos) {
        let sourceLab1 = _.filter(new RoomPosition(Memory.datas[roomName].centerPos.x + 2, Memory.datas[roomName].centerPos.y + 2, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LAB)[0];
        let sourceLab2 = _.filter(new RoomPosition(Memory.datas[roomName].centerPos.x + 3, Memory.datas[roomName].centerPos.y + 3, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LAB)[0];
        if(sourceLab1 && sourceLab2) {
            let reactionLabs = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: (s) => {return s.id !== sourceLab1.id && s.id !== sourceLab2.id && s.structureType === STRUCTURE_LAB}}).map(lab => {
                return lab.id
            });
            return [sourceLab1.id, sourceLab2.id, reactionLabs];
        }
    }
}
Rooms.prototype.cacheStructures = function(i) {
    Memory.datas[i].fixNow = Game.rooms[i].find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType !== STRUCTURE_CONTROLLER && structure.hits < 500 && structure.hits < structure.hitsMax}}).map(struct => {
        return struct.id
    });
    Memory.datas[i].structures = _.groupBy(Game.rooms[i].find(FIND_STRUCTURES), (struct) => struct.structureType);
    for(let s in Memory.datas[i].structures) {
        Memory.datas[i].structures[s] = Memory.datas[i].structures[s].map(struct => {
            return struct.id
        })
    }
};
Rooms.prototype.findPowerRooms = function() {
    for(let power in Memory.power) {
        if(Game.rooms[power] && !Game.getObjectById(Memory.power[power])) {
            Memory.power[power] = undefined;
            continue;
        }
        let closest = undefined;
        let closestDistance = 10;
        for(let i in Memory.ownedRooms) {
            if(Game.rooms[Memory.ownedRooms[i]].controller.level === 8 && !Memory.datas[Memory.ownedRooms[i]].powerRoom) {
                const distance = Game.map.getRoomLinearDistance(Memory.ownedRooms[i], power);
                if(distance < closestDistance) {
                    closest = Memory.ownedRooms[i];
                    closestDistance = distance;
                }
            }
        }
        if(Memory.datas[closest]) {
            Memory.datas[closest].powerRoom = power;
        }
    }
}
Rooms.prototype.runOwnedRooms = function() {
    for(let j in Memory.ownedRooms) {
        let i = Memory.ownedRooms[j];
        let room = Game.rooms[i];
        for(let j in this.resourceNeeded(i)) {
            let res = this.resourceNeeded(i)[j];
            if(!this.resourceRequests[res]) {
                this.resourceRequests[res] = {};
            }
            if(room.terminal && room.terminal.store[res] < Memory.minimumStore && Memory.datas[i].mineral !== res) {
                this.resourceRequests[res][Game.time + i] = i;
            }
        }
        if(Memory.datas[i] && Memory.datas[i].mineral) {
            if(!Memory.mineralRooms[Memory.datas[i].mineral]) {
                Memory.mineralRooms[Memory.datas[i].mineral] = 0;
            }
            Memory.mineralRooms[Memory.datas[i].mineral].push(i);
        }
    }
    for(let j in Memory.ownedRooms) {
        let i = Memory.ownedRooms[j];
        Memory.datas[i].combatLabs = false;
        let room = Game.rooms[i];
        if(room && room.controller && room.controller.my) {
            if(Memory.datas[i] && !Memory.datas[i].mineral) {
                let min = room.find(FIND_MINERALS)[0];
                if(min) {
                    Memory.datas[i].mineral = min.mineralType;
                }
            }
            this.cacheStructures(i);
            if(!Memory.datas[i].structures["spawn"] || Memory.datas[i].structures["spawn"].length <= 0) {
                let roomPioneer = i;
                let pioneeringRoom = undefined;
                let minDistance = 7;
                if(roomPioneer) {
                    for(let i in Memory.ownedRooms) {
                        if(Game.map.getRoomLinearDistance(Memory.ownedRooms[i], roomPioneer) < minDistance && !Memory.datas[Memory.ownedRooms[i]].toPioneer) {
                            pioneeringRoom = Memory.ownedRooms[i];
                            minDistance = Game.map.getRoomLinearDistance(Memory.ownedRooms[i], roomPioneer);
                        }
                    }
                    if(!pioneeringRoom && Memory.datas[roomPioneer]) {
                        Memory.datas[roomPioneer].cantReach = Game.time;
                    }
                    if(Memory.datas[pioneeringRoom]) {
                        Memory.datas[pioneeringRoom].toPioneer = roomPioneer;
                    }
                }
            }
            if(Game.time % 450 === 0) {
                let structs = Game.rooms[i].find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_WALL}});
                for(let i in structs) {
                    structs[i].destroy();
                }
            }
            if(Memory.datas[i].structures["observer"] && Game.getObjectById(Memory.datas[i].structures["observer"][0])) {
                let roomObserving = updateCoordinates(i, -5 + Game.time % 11, -5 + Math.floor(Game.time/10) % 11);
                roomObserving = "W6N1";
                Game.getObjectById(Memory.datas[i].structures["observer"][0]).observeRoom(roomObserving);
                Game.map.visual.rect(new RoomPosition(0, 0, roomObserving), 50, 50, {fill: 'transparent', stroke: '#ff0000'});
            }
            if(Memory.datas[i].structures["powerSpawn"] && Game.getObjectById(Memory.datas[i].structures["powerSpawn"][0])) {
                if(Game.getObjectById(Memory.datas[i].structures["powerSpawn"][0]).store[RESOURCE_ENERGY] >= 50 && Game.getObjectById(Memory.datas[i].structures["powerSpawn"][0]).store[RESOURCE_POWER] > 0) {
                    Game.getObjectById(Memory.datas[i].structures["powerSpawn"][0]).processPower();
                }
            }
            if(room.terminal) {
                this.runLabs(i);
                if(Game.time % 150 === 0) {
                    Memory.datas[i].sourceLabs = this.sourceLabs(i);
                    Memory.datas[i].minInLab = this.reactionToRun(i);
                }
            }
            let hostiles = room.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (!Memory.diplomacy[creep.owner.username] || Memory.diplomacy[creep.owner.username] < 7) && 
                    (!creep.room.controller || !creep.room.controller.safeMode)}});
            let rampart = room.find(FIND_MY_STRUCTURES, {filter: (s) => {return s.structureType === STRUCTURE_RAMPART}});
            for(let b in rampart) {
                if(hostiles.length > 0 && rampart[b].isPublic) {
                    rampart[b].setPublic(false)
                } else if(hostiles.length <= 0 && !rampart[b].isPublic) {
                    rampart[b].setPublic(true);
                }
            }
            if(room && room.terminal && room.terminal.cooldown <= 0) {
                let res = Memory.datas[i].mineral;
                if(res && room.terminal.store[RESOURCE_ENERGY] > 0) {
                    if(room.terminal.store[res] > Memory.minimumStore * 3) {
                        let order = Game.market.getAllOrders({type: ORDER_BUY, resourceType: res}).sort((a, b) => {
                            return b.price - a.price;
                        });
                        Game.market.deal(order[0].id, Math.min(room.terminal.store[res] - Memory.minimumStore * 2, room.terminal.store[RESOURCE_ENERGY]), i);
                    } else if(room.terminal.store[res] >= Memory.minimumStore * 2) {
                        let RR = this.resourceRequests[res];
                        if(RR) {
                            for(let rR in RR) {
                                if(RR[rR] && RR[rR] !== room.name && Game.rooms[RR[rR]]) {
                                    room.terminal.send(res, Math.min(room.terminal.store[res] - Memory.minimumStore, room.terminal.store[RESOURCE_ENERGY]), RR[rR]);
                                }
                            }
                        }
                    }
                }
                for(let res in this.resourceRequests) {
                    for(let romR in this.resourceRequests[res]) {
                        if(Memory.mineralRooms[res].length <= 0) {
                            let roomR = this.resourceRequests[res][romR];
                            let order = Game.market.getAllOrders({type: ORDER_SELL, resourceType: res}).sort((a, b) => {
                                return a.price - b.price;
                            });
                            if(order[0]) {
                                Game.market.deal(order[0].id, Math.min(Memory.minimumStore * 2 - Game.rooms[roomR].terminal.store[res], Game.rooms[roomR].terminal.store[RESOURCE_ENERGY]), roomR);
                            }
                        }
                    }
                }
                if(!i.min) {
                    i.min = room.find(FIND_MINERALS)[0].mineralType;
                }
                if(!i.minId) {
                    i.minId = room.find(FIND_MINERALS)[0].id;
                }
                if(Memory.datas[i].mineral && !Memory.datas[i].minProduce) {
                    switch(Memory.datas[i].mineral) {
                        case RESOURCE_OXYGEN:
                            Memory.datas[i].minProduce = RESOURCE_OXIDANT;
                        break;
                        case RESOURCE_HYDROGEN:
                            Memory.datas[i].minProduce = RESOURCE_REDUCTANT;
                        break;
                        case RESOURCE_UTRIUM:
                            Memory.datas[i].minProduce = RESOURCE_UTRIUM_BAR;
                        break;
                        case RESOURCE_KEANIUM:
                            Memory.datas[i].minProduce = RESOURCE_KEANIUM_BAR;
                        break;
                        case RESOURCE_LEMERGIUM:
                            Memory.datas[i].minProduce = RESOURCE_LEMERGIUM_BAR;
                        break;
                        case RESOURCE_ZYNTHIUM:
                            Memory.datas[i].minProduce = RESOURCE_ZYNTHIUM_BAR;
                        break;
                    }
                }
                if(Memory.datas[i] && Game.getObjectById(Memory.datas[i].structures["factory"]) && Game.getObjectById(Memory.datas[i].structures["factory"]).store[RESOURCE_ENERGY] >= 200 && Game.getObjectById(Memory.datas[i].structures["factory"]).store[Memory.datas[i].mineral] >= 500) {
                    Game.getObjectById(Memory.datas[i].structures["factory"]).produce(Memory.datas[i].minProduce);
                }
                if(room.terminal.store[Memory.datas[i].minProduce] > 0) {
                    const order = Game.market.getAllOrders({type: ORDER_BUY, resourceType: Memory.datas[i].minProduce}).sort((a, b) => {
                        return b.price - a.price;
                    });
                    if(order[0] && order[0].price > 300) {
                        Game.market.deal(order[0].id, Math.min(room.terminal.store[Memory.datas[i].minProduce], room.terminal.store[RESOURCE_ENERGY]), i);
                    }
                }
                const neededBoosts = [[RESOURCE_CATALYZED_UTRIUM_ACID, RESOURCE_UTRIUM], [RESOURCE_CATALYZED_ZYNTHIUM_ACID, RESOURCE_ZYNTHIUM], [RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_KEANIUM], [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_LEMERGIUM],[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_ZYNTHIUM], [RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_OXYGEN], [RESOURCE_CATALYZED_GHODIUM_ACID, RESOURCE_HYDROGEN], [RESOURCE_GHODIUM, RESOURCE_OXYGEN], [RESOURCE_GHODIUM, RESOURCE_HYDROGEN]];
                for(let boostIs in neededBoosts) {
                    const boost = neededBoosts[boostIs][0];
                    if(room.terminal.store[boost] <= 10000) {
                        const resourceBoost = neededBoosts[boostIs][1];
                        if(Memory.mineralRooms[resourceBoost] && Memory.mineralRooms[resourceBoost].length > 0) {
                            for(let roomBoost in Memory.mineralRooms[resourceBoost]) {
                                let roomBoosts = Memory.mineralRooms[resourceBoost][roomBoost]
                                if(Game.rooms[roomBoosts] && Game.rooms[roomBoosts].terminal) {
                                    if(Game.rooms[roomBoosts].terminal.store[boost] >= 15000) {
                                        Game.rooms[roomBoosts].terminal.send(boost, Math.min(Game.rooms[roomBoosts].terminal.store[boost], 15000), i)
                                    }
                                }
                            }
                        }
                        if(room.terminal.cooldown <= 0 && Game.market.credits >= 10000000) {
                            let order = Game.market.getAllOrders({type: ORDER_SELL, resourceType: boost}).sort((a, b) => {
                                return a.price - b.price;
                            });
                            if(order[0] && order[0].price < 600) {
                                Game.market.deal(order[0].id, 10000 - room.terminal.store[boost], i);
                            }
                        }
                    }
                }
            }
        }
    }
}
Rooms.prototype.run = function() {
    this.resourceRequests = {}
    if(!Memory.ownedRooms || Game.time % 150 === 0) {
        Memory.ownedRooms = [];
        for(let i in Game.rooms) {
            let room = Game.rooms[i];
            if(room.controller && room.controller.my) {
                Memory.ownedRooms.push(i);
            }
        }
    }
    this.runOwnedRooms();
    this.findPowerRooms();
}

module.exports.loop = function () {
    if(Game.cpu.bucket <= 100) {
        return;
    }
    let pCPU = Game.cpu.getUsed();
    tryInitSameMemory()
    cpuToUse.memHack+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    let shardCPUuse = Game.cpu.getUsed();
    allianceManager.sync(); // ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ ALLIANCE MANAGER ============ 
    global.updateData();
    if(cpuToUse.tick >= 30000) {
        cpuToUse = {
            creeps: {
                
            },
            pixelMarket: 0,
            spawnLogic: 0,
            towers: 0,
            duoLogic: 0,
            roomsGroup: 0,
            memHack: 0,
            cpuAvg: 0,
            tick: 0,
        };
    }
    if(Game.time % 150 === 0 && Game.cpu.limit > Memory.cpuAvg.cpu/Memory.cpuAvg.ticks - 5) {
        let roomsOwned = 0;
        if(!pserver) {
            let s0Data = JSON.parse(InterShardMemory.getRemote('shard0') || "{}").rooms || 0;
            roomsOwned+=s0Data;
            let s1Data = JSON.parse(InterShardMemory.getRemote('shard1') || "{}").rooms || 0;
            roomsOwned+=s1Data;
            let s2Data = JSON.parse(InterShardMemory.getRemote('shard2') || "{}").rooms || 0;
            roomsOwned+=s2Data;
            let s3Data = JSON.parse(InterShardMemory.getRemote('shard3') || "{}").rooms || 0;
            roomsOwned+=s3Data;
        } else {
            for(let i in Game.rooms) {
                if(Game.rooms[i].controller && Game.rooms[i].controller.my) {
                    roomsOwned+=1;
                }
            }
        }
        if(roomsOwned < Game.gcl.level) {
            let roomPioneer = global.getBestRoom();
            let pioneeringRoom = undefined;
            let minDistance = 7;
            if(roomPioneer) {
                for(let i in Memory.ownedRooms) {
                    if(Game.rooms[Memory.ownedRooms[i]] && Game.rooms[Memory.ownedRooms[i]].energyCapacityAvailable >= 650) {
                        if(Game.map.getRoomLinearDistance(Memory.ownedRooms[i], roomPioneer) < minDistance && (!Memory.datas[Memory.ownedRooms[i]].toPioneer || Memory.datas[Memory.ownedRooms[i]].toPioneer === Memory.ownedRooms[i])) {
                            pioneeringRoom = Memory.ownedRooms[i];
                            minDistance = Game.map.getRoomLinearDistance(Memory.ownedRooms[i], roomPioneer);
                        }
                    }
                }
                if(!pioneeringRoom && Memory.datas[roomPioneer]) {
                    Memory.datas[roomPioneer].cantReach = Game.time;
                }
                if(Memory.datas[pioneeringRoom]) {
                    Memory.datas[pioneeringRoom].toPioneer = roomPioneer;
                }
            }
        } else {
            let remoteRoomNum = 0;
            for(let i in Memory.ownedRooms) {
                if(Memory.datas[Memory.ownedRooms[i]] && Memory.datas[Memory.ownedRooms[i]].remoteRooms && Memory.datas[Memory.ownedRooms[i]].remoteRooms.length <= 0) {
                    let availableRooms = Game.map.describeExits(Memory.ownedRooms[i]);
                    if(availableRooms[LEFT]) {
                        if(Memory.datas[availableRooms[LEFT]].points <= 70) {
                            Memory.datas[Memory.ownedRooms[i]].remoteRooms.push(availableRooms[LEFT]);
                            remoteRoomNum+=1;
                        }
                    }
                    if(availableRooms[RIGHT] && Memory.datas[Memory.ownedRooms[i]].remoteRooms.length <= 0) {
                        if(Memory.datas[availableRooms[RIGHT]].points <= 70) {
                            Memory.datas[Memory.ownedRooms[i]].remoteRooms.push(availableRooms[RIGHT]);
                            remoteRoomNum+=1;
                        }
                    }
                    if(availableRooms[BOTTOM] && Memory.datas[Memory.ownedRooms[i]].remoteRooms.length <= 0) {
                        if(Memory.datas[availableRooms[BOTTOM]].points <= 70) {
                            Memory.datas[Memory.ownedRooms[i]].remoteRooms.push(availableRooms[BOTTOM]);
                            remoteRoomNum+=1;
                        }
                    }
                    if(availableRooms[TOP] && Memory.datas[Memory.ownedRooms[i]].remoteRooms.length <= 0) {
                        if(Memory.datas[availableRooms[TOP]].points <= 70) {
                            Memory.datas[Memory.ownedRooms[i]].remoteRooms.push(availableRooms[TOP]);
                            remoteRoomNum+=1;
                        }
                    }
                }
                if(Game.cpu.limit - 5 < Memory.cpuAvg.cpu/Memory.cpuAvg.ticks + remoteRoomNum * 2) {
                    break;
                }
            }
        }
    } else {
        let remoteRoomNums = 0;
        for(let i in Memory.ownedRooms) {
            if(Memory.datas[Memory.ownedRooms[i]] && Memory.datas[Memory.ownedRooms[i]].remoteRooms) {
                remoteRoomNums+=Memory.datas[Memory.ownedRooms[i]].remoteRooms.length;
            }
        }
        let remoteRoomNum = 0;
        for(let i in Memory.ownedRooms) {
            if(Memory.datas[Memory.ownedRooms[i]] && Memory.datas[Memory.ownedRooms[i]].remoteRooms) {
                remoteRoomNum+=Memory.datas[Memory.ownedRooms[i]].remoteRooms.length;
                if(Game.cpu.limit - 5 < (Memory.cpuAvg.cpu/Memory.cpuAvg.ticks - remoteRoomNums * 2) + remoteRoomNum * 2) {
                    Memory.datas[Memory.ownedRooms[i]].remoteRooms = [];
                }
            }
        }
    }
    //return;
    if(Game.cpu.bucket === 10000) {
        if(!pserver) {
            Game.cpu.generatePixel();
        }
    }
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    cpuToUse.pixelMarket+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    Memory.mineralRooms = {
        "H": [],
        "O": [],
        "L": [],
        "K": [],
        "Z": [],
        "U": [],
        "X": [],
    };
    Memory.mineralAvg = 0;
    for(let i in Memory.mineralRooms) {
        Memory.mineralAvg+=Memory.mineralRooms[i].length;
    }
    let sdata = undefined;
    if(!pserver) {
        sdata = JSON.parse(InterShardMemory.getLocal() || "{}");
        sdata.rooms = Memory.mineralAvg;
    }
    Memory.mineralAvg = Memory.mineralAvg/7;
    let roomsClass = new Rooms();
    roomsClass.run();
    baseBuilder.run();
    cpuToUse.roomsGroup+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for(let tower in towers) {
        tower = towers[tower];
        if(tower !== undefined) {
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (s) => !s.owner || !Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7});
            if(target) {
                tower.attack(target);
            } else {
                target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (s) => s.hits < s.hitsMax});
                tower.heal(target);
            }
        }
    }
    cpuToUse.towers+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    duos();
    cpuToUse.duoLogic+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    quads.runAllQuads();
    cpuToUse.quadLogic+=Game.cpu.getUsed() - pCPU;
    pCPU = Game.cpu.getUsed();
    warManager.run();
    cpuToUse.warManager+=Game.cpu.getUsed() - pCPU;
    for(let name in Game.powerCreeps) {
        let creep = Game.powerCreeps[name];
        if(!creep.memory.room || !creep.memory.role) {
            let settings = name.split(".");
            creep.memory.room = settings[0];
            creep.memory.role = settings[1];
        }
        powerCreep.run(creep);
    }
    for(let name in Game.creeps) {
        let pCPU = Game.cpu.getUsed();
        let creep = Game.creeps[name];
        if(!Memory.username) {
            Memory.username = creep.owner.username;
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'mineralHarvester') {
            roleMineralHarvester.run(creep);
        } else if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        } else if(creep.memory.role == 'linkHauler') {
            roleLinkHauler.run(creep);
        } else if(creep.memory.role == 'manager') {
            roleManager.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if(creep.memory.role == 'pioneer') {
            rolePioneer.run(creep);
        } else if(creep.memory.role == 'manager') {
            roleManager.run(creep);
        } else if(creep.memory.role == 'vulture') {
            roleVulture.run(creep);
        } else if(creep.memory.role == 'scout') {
            roleScout.run(creep);
        } else if(creep.memory.role == 'guard') {
            roleGuard.run(creep);
        } else if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        } else if(creep.memory.role == 'powerGetter') {
            rolePowerGetter.run(creep);
        } else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        } else if(creep.memory.role == 'reserver') {
            roleReserver.run(creep);
        } else if(creep.memory.role == 'helper') {
            roleHelper.run(creep);
        } else if(creep.memory.role == 'towerDrainer') {
            roleTowerDrainer.run(creep);
        }
        if(!cpuToUse.creeps[creep.memory.role]) {
            cpuToUse.creeps[creep.memory.role] = Game.cpu.getUsed() - pCPU;
            cpuToUse.creeps[creep.memory.role + "num"] = 1;
        } else {
            cpuToUse.creeps[creep.memory.role]+=Game.cpu.getUsed() - pCPU;
            cpuToUse.creeps[creep.memory.role + "num"]+=1;
        }
    }
    pCPU = Game.cpu.getUsed();
    Spawners.run();
    cpuToUse.spawnLogic+=Game.cpu.getUsed() - pCPU;
    exportStats();
    RawMemory.segments[0] = JSON.stringify(Memory.stats);
    cpuToUse.tick+=1;
    if(Game.time % 1000 === 0) {
        console.log("====================CPU CHECK======================")
        console.log("Time Check: " + cpuToUse.tick);
        console.log("Towers: " + cpuToUse.towers/cpuToUse.tick)
        console.log("Spawn Logic: " + cpuToUse.spawnLogic/cpuToUse.tick)
        console.log("Duo Logic: " + cpuToUse.duoLogic/cpuToUse.tick)
        console.log("Quad Logic: " + cpuToUse.quadLogic/cpuToUse.tick)
        console.log("Room Groups: " + (cpuToUse.roomsGroup/cpuToUse.tick))
        console.log("Mem Hack: " + cpuToUse.memHack/cpuToUse.tick)
        console.log("Pixel Market: " + cpuToUse.pixelMarket/cpuToUse.tick)
        console.log("CPU Creep Roles ====")
        for(let roomMin in Memory.mineralRooms) {
            console.log(roomMin + ": " + Memory.mineralRooms[roomMin].length);
        }
        let i = 0;
        for(let crep in cpuToUse.creeps) {
            if(i % 2 === 0) {
                console.log("   " + crep + ": " + (cpuToUse.creeps[crep]/cpuToUse.tick)/(cpuToUse.creeps[crep + "num"]/cpuToUse.tick) + " #" + cpuToUse.creeps[crep + "num"]/cpuToUse.tick + " Total: " + (cpuToUse.creeps[crep + "num"] * cpuToUse.creeps[crep])/cpuToUse.tick);
            }
            i+=1;
        }
    }
    if(!Memory.cpuAvg || !Memory.cpuAvg.cpu || !Memory.cpuAvg.ticks) {
        Memory.cpuAvg = {
            cpu: 0,
            ticks: 0,
        };
    }
    if(!pserver) {
        InterShardMemory.setLocal(JSON.stringify(sdata));
    }
    Pathing.runMoves();
    if(Memory.cpuAvg.ticks > 2500) {
        Memory.cpuAvg = {
            cpu: 0,
            ticks: 0,
        };
    }
    Memory.cpuAvg.cpu+=Game.cpu.getUsed() - shardCPUuse;
    Memory.cpuAvg.ticks+=1;
    /**
    if(!Memory.datas["E19S53"].distanceMatrix) {
        pCPU = Game.cpu.getUsed();
        global.distanceTransform("E19S53", true);
        console.log("Distance Transform Uses: " + (Game.cpu.getUsed() - pCPU));
    } else {
        global.visualizeMatrix(Memory.datas["E19S53"].distanceMatrix, "E19S53");
    }
    */
    //calcTowerDamage.see("E56S51", {"heal": 5})
}


