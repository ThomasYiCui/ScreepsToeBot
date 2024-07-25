if(!Memory.quads) {
    Memory.quads = {}; 
}
let healerBody = {
    1: [HEAL, MOVE],
    6: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,RANGED_ATTACK],
    7: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,RANGED_ATTACK],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
}
let rangeBody = {
    1: [TOUGH, RANGED_ATTACK, MOVE, MOVE],
    6: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
    7: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK],
}
let meleeBody = {
    1: [ATTACK, ATTACK, MOVE, MOVE],
    6: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
    7: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
};
let ramBody = {
    1: [WORK, WORK, MOVE, MOVE],
    6: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
    7: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK],
}
let blinkyBody = {
    1: [RANGED_ATTACK, TOUGH, MOVE, MOVE],
    6: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE],
    7: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
};
let tankBody = {
    7: [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    8: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
}
let quadTypes = {
    "range": ["range", "heal", "range", "heal"],
    "melee": ["melee", "heal", "melee", "heal"],
    "blinky": ["blinky", "blinky", "blinky", "blinky"],
    "ram": ["ram", "heal", "ram", "heal"],
    "tankRam": ["heal", "heal", "heal", "ram"],
    "tank": ["tank", "tank", "tank", "tank"],
}

let dir2d = {
    "7": [{x: 0, y: 0}, {x: 0, y: 1}],
    "3": [{x: 1, y: 0}, {x: 1, y: 1}],
    "1": [{x: 0, y: 0}, {x: 1, y: 0}],
    "5": [{x: 0, y: 1}, {x: 1, y: 1}],
}
class quad {
    constructor(quadName) {
        this.quadName = quadName;
        this.quadObj = Memory.quads[this.quadName];
        this.creepTypes = quadTypes[this.quadObj.quadType]
    }
    getCreeps() {
        return this.quadObj.creeps;
    }
    availableSpawns() {
        if(Game.rooms[this.quadObj.roomToSpawn]) {
            return Game.rooms[this.quadObj.roomToSpawn].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN && !s.spawning});
        } else {
            return [];
        }
    }
    creepBody(spawn, type) {
        if(Game.rooms[this.quadObj.roomToSpawn]) {
            switch(type) {
                case "range":
                    if(this.quadObj.options.test) {
                        return rangeBody[1];
                    } else {
                        return rangeBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
                case "heal":
                    if(this.quadObj.options.test) {
                        return healerBody[1];
                    } else {
                        return healerBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
                case "ram":
                    if(this.quadObj.options.test) {
                        return ramBody[1];
                    } else {
                        return ramBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
                case "melee":
                    if(this.quadObj.options.test) {
                        return meleeBody[1];
                    } else {
                        return meleeBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
                case "blinky":
                    if(this.quadObj.options.test) {
                        return blinkyBody[1];
                    } else {
                        return blinkyBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
                case "tank":
                    if(this.quadObj.options.test) {
                        return tankBody[1];
                    } else {
                        return tankBody[Game.rooms[this.quadObj.roomToSpawn].controller.level];
                    }
                break;
            }
        } else {
            return null;
        }
    }
    spawnQuad() {
        let creeps = this.getCreeps();
        let availableSpawns = this.availableSpawns();
        for(let i in availableSpawns) {
            let spawn = availableSpawns[i];
            if(!Game.creeps[this.quadName + "_0"]) {
                spawn.spawnCreep(this.creepBody(spawn, this.creepTypes[0]), this.quadName + "_0")
                this.quadObj.creeps[0] = this.quadName + "_0";
            } else if(!Game.creeps[this.quadName + "_1"]) {
                spawn.spawnCreep(this.creepBody(spawn, this.creepTypes[1]), this.quadName + "_1")
                this.quadObj.creeps[1] = this.quadName + "_1";
                
            } else if(!Game.creeps[this.quadName + "_2"]) {
                spawn.spawnCreep(this.creepBody(spawn, this.creepTypes[2]), this.quadName + "_2")
                this.quadObj.creeps[2] = this.quadName + "_2";
            } else if(!Game.creeps[this.quadName + "_3"]) {
                spawn.spawnCreep(this.creepBody(spawn, this.creepTypes[3]), this.quadName + "_3")
                this.quadObj.creeps[3] = this.quadName + "_3";
            } else {
                this.quadObj.state = "renew";
            }
        }
        for(let i in creeps) {
            if(Game.creeps[creeps[i]] && Memory.datas[Game.creeps[creeps[i]].room.name] && Memory.datas[Game.creeps[creeps[i]].room.name].centerPos) {
                Game.creeps[creeps[i]].moveTo(new RoomPosition(Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.x - 6, Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.y - 6, Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.roomName), {priority: 1, range: 4});
            }
        }
    }
    renewQuad() {
        let creeps = this.getCreeps();
        let availableSpawns = this.availableSpawns();
        let spawn = availableSpawns[0];
        let renewNoNeed = 0;
        if(spawn) {
            for(let i in creeps) {
                if(!Game.creeps[creeps[i]]) {
                    this.quadObj.state = "spawn";
                }
                let renew = spawn.renewCreep(Game.creeps[creeps[i]]);
                if(Game.creeps[creeps[i]] && Game.creeps[creeps[i]].ticksToLive >= 1450) {
                    renewNoNeed+=1;
                } else if(renew === ERR_NOT_IN_RANGE) {
                    Game.creeps[creeps[i]].moveTo(spawn);
                } else if(renew === ERR_FULL) {
                    renewNoNeed+=1;
                }
            }
        } else {
            for(let i in creeps) {
                if(!Game.creeps[creeps[i]]) {
                    this.quadObj.state = "spawn";
                } else if(Memory.datas[Game.creeps[creeps[i]].room.name] && Memory.datas[Game.creeps[creeps[i]].room.name].centerPos) {
                    Game.creeps[creeps[i]].moveTo(new RoomPosition(Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.x - 6, Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.y - 6, Memory.datas[Game.creeps[creeps[i]].room.name].centerPos.roomName), {priority: 1, range: 4});
                }
            }
        }
        if(renewNoNeed >= 4) {
            this.quadObj.state = "boost";
        }
    }
    isFormed() {
        let creeps = this.getCreeps();
        if(!Game.creeps[creeps[0]]) {
            return;
        }
        let leaderPos = Game.creeps[creeps[0]].pos;
        if(Game.creeps[creeps[1]] && (leaderPos.x + 1 !== Game.creeps[creeps[1]].pos.x || leaderPos.y !== Game.creeps[creeps[1]].pos.y)) {
            return false;
        }
        if(Game.creeps[creeps[2]] && (leaderPos.x !== Game.creeps[creeps[2]].pos.x || leaderPos.y + 1 !== Game.creeps[creeps[2]].pos.y)) {
            return false;
        }
        if(Game.creeps[creeps[3]] && (leaderPos.x + 1 !== Game.creeps[creeps[3]].pos.x || leaderPos.y + 1 !== Game.creeps[creeps[3]].pos.y)) {
            return false;
        }
        return true;
    }
    sortQuad() {
        this.quadObj.creeps = this.quadObj.creeps.sort((a, b) => (Game.creeps[a] && Game.creeps[b] && (Game.creeps[a].pos.x + (Game.creeps[a].pos.y * 1.01)) - (Game.creeps[b].pos.x + (Game.creeps[b].pos.y * 1.01))))
    }
    dfsTerrain() {
        if(this.quadObj.terrainMatrixRoom && this.quadObj.terrainMatrix) {
            const roomName = this.quadObj.terrainMatrixRoom;
            const terrain = PathFinder.CostMatrix.deserialize(this.quadObj.terrainMatrix);
            const structures = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_STRUCTURES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
            for(let i in structures) {
                terrain.set(structures[i].pos.x, structures[i].pos.y, 255);
                terrain.set(structures[i].pos.x - 1, structures[i].pos.y, 255);
                terrain.set(structures[i].pos.x, structures[i].pos.y - 1, 255);
                terrain.set(structures[i].pos.x - 1, structures[i].pos.y - 1, 255);
            }
            const sites = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_MY_CONSTRUCTION_SITES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
            for(let i in sites) {
                terrain.set(sites[i].pos.x, sites[i].pos.y, 255);
                terrain.set(sites[i].pos.x - 1, sites[i].pos.y, 255);
                terrain.set(sites[i].pos.x, sites[i].pos.y - 1, 255);
                terrain.set(sites[i].pos.x - 1, sites[i].pos.y - 1, 255);
            }
            const myCreeps = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_MY_CREEPS, {filter: (a) => a.name.length > this.quadName.length && a.name.substr(this.quadName.length) === this.quadName.length});
            for(let i in myCreeps) {
                terrain.set(myCreeps[i].pos.x, myCreeps[i].pos.y, 255);
                terrain.set(myCreeps[i].pos.x - 1, myCreeps[i].pos.y, 255);
                terrain.set(myCreeps[i].pos.x, myCreeps[i].pos.y - 1, 255);
                terrain.set(myCreeps[i].pos.x - 1, myCreeps[i].pos.y - 1, 255);
            }
            let toVisit = [Game.creeps[this.quadObj.creeps[0]].pos];
            let visited = new Set();
            while(toVisit.length > 0) {
                let checking = toVisit.shift();
                let key = `${checking.x},${checking.y}`;
                if(visited.has(key)) {
                    continue;
                }
                if(terrain.get(checking.x, checking.y) !== 255 && checking.x > 0 && checking.x < 49 && checking.y > 0 && checking.y < 49) {
                    return checking;
                }
                visited.add(key);
                let newPos = [
                    {x: checking.x - 1, y: checking.y - 1},
                    {x: checking.x + 1, y: checking.y - 1},
                    {x: checking.x - 1, y: checking.y + 1},
                    {x: checking.x + 1, y: checking.y + 1},
                    {x: checking.x - 1, y: checking.y},
                    {x: checking.x + 1, y: checking.y},
                    {x: checking.x, y: checking.y - 1},
                    {x: checking.x, y: checking.y + 1},
                ];
    
                for(let neighbor of newPos) {
                    if(neighbor.x >= 1 && neighbor.x < 49 && neighbor.y >= 1 && neighbor.y < 49) {
                        toVisit.push(new RoomPosition(neighbor.x, neighbor.y, roomName));
                    }
                }
            }
        }
    }
    formQuad() {
        let creeps = this.getCreeps();
        if(Game.creeps[creeps[0]]) {
            if(!Memory.quads[this.quadName].leaderPos && Game.creeps[creeps[0]].room.name === this.quadObj.roomToAttack) {
                Memory.quads[this.quadName].leaderPos = this.dfsTerrain();
            }
            let leaderPos = Memory.quads[this.quadName].leaderPos;
            if(leaderPos) {
                Game.creeps[creeps[0]].reservePos(Game.creeps[creeps[0]].pos, 35);
                if(Game.creeps[creeps[0]]) {
                    Game.creeps[creeps[0]].moveTo(new RoomPosition(leaderPos.x, leaderPos.y, leaderPos.roomName), {priority: 30 + Game.time % 5, range: 0});
                }
                if(Game.creeps[creeps[1]]) {
                    Game.creeps[creeps[1]].moveTo(new RoomPosition(leaderPos.x + 1, leaderPos.y, leaderPos.roomName), {priority: 30 + Game.time % 6, range: 0});
                }
                if(Game.creeps[creeps[2]]) {
                    Game.creeps[creeps[2]].moveTo(new RoomPosition(leaderPos.x, leaderPos.y + 1, leaderPos.roomName), {priority: 30 + Game.time % 7, range: 0});
                }
                if(Game.creeps[creeps[3]]) {
                    Game.creeps[creeps[3]].moveTo(new RoomPosition(leaderPos.x + 1, leaderPos.y + 1, leaderPos.roomName), {priority: 30 + Game.time % 8, range: 0});
                }
            } else {
                Game.creeps[creeps[0]].reservePos(Game.creeps[creeps[0]].pos, 35);
                if(Game.creeps[creeps[0]]) {
                    Game.creeps[creeps[0]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {priority: 30 + Game.time % 5, range: 24});
                }
                if(Game.creeps[creeps[1]]) {
                    Game.creeps[creeps[1]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {priority: 30 + Game.time % 6, range: 24});
                }
                if(Game.creeps[creeps[2]]) {
                    Game.creeps[creeps[2]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {priority: 30 + Game.time % 7, range: 24});
                }
                if(Game.creeps[creeps[3]]) {
                    Game.creeps[creeps[3]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {priority: 30 + Game.time % 8, range: 24});
                }
            }
        }
    }
    formWallMatrix() {
        let creeps = this.getCreeps();
        let leader = Game.creeps[creeps[0]];
        let terrainData = leader.room.getTerrain();
        let wallMatrix = new PathFinder.CostMatrix;
        for(let x = 0; x < 50; x++) {
            for(let y = 0; y < 50; y++) {
                if(wallMatrix.get(x, y) === 255) {
                    return;
                }
                if(terrainData.get(x, y) === TERRAIN_MASK_WALL) {
                    wallMatrix.set(x, y, 255);
                } else if(terrainData.get(x + 1, y) === TERRAIN_MASK_WALL) {
                    wallMatrix.set(x, y, 255);
                } else if(terrainData.get(x, y + 1) === TERRAIN_MASK_WALL) {
                    wallMatrix.set(x, y, 255);
                } else if(terrainData.get(x + 1, y + 1) === TERRAIN_MASK_WALL) {
                    wallMatrix.set(x, y, 255);
                } else if(terrainData.get(x, y) === TERRAIN_MASK_SWAMP) {
                    wallMatrix.set(x, y, 5);
                } else if(terrainData.get(x + 1, y) === TERRAIN_MASK_SWAMP) {
                    wallMatrix.set(x, y, 5);
                } else if(terrainData.get(x, y + 1) === TERRAIN_MASK_SWAMP) {
                    wallMatrix.set(x, y, 5);
                } else if(terrainData.get(x + 1, y + 1) === TERRAIN_MASK_SWAMP) {
                    wallMatrix.set(x, y, 5);
                }
            }
        }
        return wallMatrix.serialize();
    }
    visualizeMatrix() {
        const visual = new RoomVisual(this.quadObj.terrainMatrixRoom);
        const terrain = PathFinder.CostMatrix.deserialize(this.quadObj.terrainMatrix);
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                if(terrain.get(x, y) === 255) {
                    visual.rect(x - 0.5, y - 0.5, 1, 1, {fill: "#000000", opacity: 0.4});
                } else if(terrain.get(x, y) === 5) {
                    visual.rect(x - 0.5, y - 0.5, 1, 1, {fill: "#00FF00", opacity: 0.2});
                }
            }
        }
    }
    visualizeMatrixT(matrix, room) {
        const visual = new RoomVisual(room);
        const terrain = matrix;
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                if(terrain.get(x, y) === 255) {
                    visual.rect(x - 0.5, y - 0.5, 1, 1, {fill: "#000000", opacity: 0.4});
                } else if(terrain.get(x, y) === 5) {
                    visual.rect(x - 0.5, y - 0.5, 1, 1, {fill: "#00FF00", opacity: 0.2});
                }
            }
        }
    }
    isAlly(s) {
        return (!s.owner || s.owner && (!Memory.diplomacy[s.owner.username] || Memory.diplomacy[s.owner.username] < 7) && s.owner.username !== "Source Keeper" && s.owner.username !== "Power Bank" && s.owner.username !== "Power Bank" && s.owner.username !== "Invader")
    }
    findEnemy() {
        const terrain = PathFinder.CostMatrix.deserialize(this.quadObj.terrainMatrix);
        const structures = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_STRUCTURES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
        for(let i in structures) {
            terrain.set(structures[i].pos.x, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x, structures[i].pos.y - 1, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y - 1, 255);
        }
        let creeps = this.getCreeps();
        if(!Game.creeps[creeps[0]]) {
            return;
        }
        let enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER) && this.isAlly(s)});
        let enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_CREEPS, {filter: (s) => this.isAlly(s)});
        enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_CONTROLLER) && this.isAlly(s)});
        enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType !== STRUCTURE_CONTROLLER) && this.isAlly(s)});
        enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        return null;
    }
    findEnemyRam() {
        if(!this.quadObj.terrainMatrixRoom) {
            return;
        }
        const terrain = PathFinder.CostMatrix.deserialize(this.quadObj.terrainMatrix);
        const structures = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_STRUCTURES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
        for(let i in structures) {
            terrain.set(structures[i].pos.x, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x, structures[i].pos.y - 1, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y - 1, 255);
        }
        let creeps = this.getCreeps();
        if(!Game.creeps[creeps[0]]) {
            return;
        }
        let enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_TOWER) && this.isAlly(s)});
        let enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        enemyStructure = Game.creeps[creeps[0]].room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => (s.structureType !== STRUCTURE_RAMPART && s.structureType !== STRUCTURE_CONTROLLER) && this.isAlly(s)});
        enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        enemyStructure = Game.creeps[creeps[0]].room.find(FIND_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_CONTROLLER && this.isAlly(s)});
        enemyStructures = Game.creeps[creeps[0]].pos.findClosestByPath(enemyStructure, {
            costCallback: (roomName, costMatrix) => terrain
        });
        if(enemyStructures) {
            return enemyStructures.id;
        }
        return null;
    }
    findTarget() {
        if(Game.getObjectById(this.quadObj.options.lockTarget)) {
            return this.quadObj.options.lockTarget;
        }
        switch(this.quadObj.quadType) {
            case "range":
                return this.findEnemy();
            break;
            case "blinky":
                return this.findEnemy();
            break;
            case "tank":
                return this.findEnemy();
            break;
            case "melee":
                return this.findEnemy();
            break;
            case "ram":
                return this.findEnemyRam();
            break;
            case "tankRam":
                return this.findEnemyRam();
            break;
        }
    }
    snakeQuad() {
        let creeps = this.getCreeps();
        if(!creeps || !Game.creeps[creeps[0]] || !Game.creeps[creeps[1]] || !Game.creeps[creeps[2]] || !Game.creeps[creeps[3]]) {
            Memory.quads[this.quadName] = undefined;
            return;
        }
        if(Game.creeps[creeps[0]] && Game.creeps[creeps[1]].fatigue <= 0 && (Game.creeps[creeps[0]].pos.inRangeTo(Game.creeps[creeps[1]], 1) || Game.creeps[creeps[0]].pos.inRangeTo(Memory.datas[this.quadObj.roomToSpawn].centerPos, 7)) || Game.creeps[creeps[0]].room.name !== Game.creeps[creeps[1]].room.name) {
            Game.creeps[creeps[0]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {range: 23, priority: 50});
        } else if(Game.creeps[creeps[0]].pos.x > 2 && Game.creeps[creeps[0]].pos.x < 48 && Game.creeps[creeps[0]].pos.y > 2 && Game.creeps[creeps[0]].pos.y < 48) {
            Game.creeps[creeps[0]].moveTo(Game.creeps[creeps[1]], {range: 0, priority: 50, maxRooms: 1});
        }
        if(Game.creeps[creeps[1]] && Game.creeps[creeps[0]] && Game.creeps[creeps[2]].fatigue <= 0 && Game.creeps[creeps[1]].pos.inRangeTo(Game.creeps[creeps[2]], 1) || Game.creeps[creeps[1]].room.name !== Game.creeps[creeps[2]].room.name) {
            Game.creeps[creeps[1]].moveTo(Game.creeps[creeps[0]], {range: 0, priority: 51});
        } else if(Game.creeps[creeps[1]] && Game.creeps[creeps[2]] && Game.creeps[creeps[1]].pos.x > 2 && Game.creeps[creeps[1]].pos.x < 48 && Game.creeps[creeps[1]].pos.y > 2 && Game.creeps[creeps[1]].pos.y < 48) {
            Game.creeps[creeps[1]].moveTo(Game.creeps[creeps[2]], {range: 0, priority: 51, maxRooms: 1});
        }
        if(Game.creeps[creeps[2]] && Game.creeps[creeps[1]] && Game.creeps[creeps[3]].fatigue <= 0 && Game.creeps[creeps[2]].pos.inRangeTo(Game.creeps[creeps[3]], 1) || Game.creeps[creeps[2]].room.name !== Game.creeps[creeps[3]].room.name) {
            Game.creeps[creeps[2]].moveTo(Game.creeps[creeps[1]], {range: 0, priority: 52});
        } else if(Game.creeps[creeps[2]] && Game.creeps[creeps[3]] && Game.creeps[creeps[2]].pos.x > 2 && Game.creeps[creeps[2]].pos.x < 48 && Game.creeps[creeps[2]].pos.y > 2 && Game.creeps[creeps[2]].pos.y < 48) {
            Game.creeps[creeps[2]].moveTo(Game.creeps[creeps[3]], {range: 0, priority: 52, maxRooms: 1});
        }
        if(Game.creeps[creeps[3]] && Game.creeps[creeps[2]]) {
            Game.creeps[creeps[3]].moveTo(Game.creeps[creeps[2]], {range: 0, priority: 53});
        }
    }
    moveQuad() {
        this.sortQuad();
        let creeps = this.getCreeps();
        if(Game.creeps[creeps[0]]) {
            const visual = new RoomVisual(Game.creeps[creeps[0]].roomName);
            visual.rect(Game.creeps[creeps[0]].pos.x - 0.5, Game.creeps[creeps[0]].pos.y - 0.5, 1, 1, {opacity: 0.4});
            if(Game.creeps[creeps[1]]) {
                visual.rect(Game.creeps[creeps[1]].pos.x - 0.5, Game.creeps[creeps[1]].pos.y - 0.5, 1, 1, {opacity: 0.3});
            }
            if(Game.creeps[creeps[2]]) {
                visual.rect(Game.creeps[creeps[2]].pos.x - 0.5, Game.creeps[creeps[2]].pos.y - 0.5, 1, 1, {opacity: 0.2});
            }
            if(Game.creeps[creeps[3]]) {
                visual.rect(Game.creeps[creeps[3]].pos.x - 0.5, Game.creeps[creeps[3]].pos.y - 0.5, 1, 1, {opacity: 0.1});
            }
        }
        for(let i in creeps) {
            if(Game.creeps[creeps[i]] && Game.creeps[creeps[i]].fatigue > 0) {
                return;
            }
        }
        const terrain = PathFinder.CostMatrix.deserialize(this.quadObj.terrainMatrix);
        const structures = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_STRUCTURES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
        for(let i in structures) {
            terrain.set(structures[i].pos.x, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y, 255);
            terrain.set(structures[i].pos.x, structures[i].pos.y - 1, 255);
            terrain.set(structures[i].pos.x - 1, structures[i].pos.y - 1, 255);
        }
        const sites = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_MY_CONSTRUCTION_SITES, {filter: (a) => a.structureType !== STRUCTURE_ROAD && a.structureType !== STRUCTURE_CONTAINER});
        for(let i in sites) {
            terrain.set(sites[i].pos.x, sites[i].pos.y, 255);
            terrain.set(sites[i].pos.x - 1, sites[i].pos.y, 255);
            terrain.set(sites[i].pos.x, sites[i].pos.y - 1, 255);
            terrain.set(sites[i].pos.x - 1, sites[i].pos.y - 1, 255);
        }
        const myCreeps = Game.rooms[this.quadObj.terrainMatrixRoom].find(FIND_MY_CREEPS, {filter: (a) => a.name.length > this.quadName.length && a.name.substr(this.quadName.length) === this.quadName.length});
        for(let i in myCreeps) {
            terrain.set(myCreeps[i].pos.x, myCreeps[i].pos.y, 255);
            terrain.set(myCreeps[i].pos.x - 1, myCreeps[i].pos.y, 255);
            terrain.set(myCreeps[i].pos.x, myCreeps[i].pos.y - 1, 255);
            terrain.set(myCreeps[i].pos.x - 1, myCreeps[i].pos.y - 1, 255);
        }
        //this.visualizeMatrixT(terrain, this.quadObj.terrainMatrixRoom);
        if(Game.getObjectById(this.quadObj.target) && !Game.creeps[creeps[0]].pos.inRangeTo(Game.getObjectById(this.quadObj.target), 1)) {
            if(Game.getObjectById(this.quadObj.target)) {
                Game.creeps[creeps[0]].moveTo(Game.getObjectById(this.quadObj.target), {range: 0, priority: 50, maxRooms: 1, costCallback: function(roomName, costMatrix) {
                    return terrain;
                }});
            } else {
                Game.creeps[creeps[0]].moveTo(new RoomPosition(25, 25, this.quadObj.roomToAttack), {range: 20, priority: 50, maxRooms: 1, costCallback: function(roomName, costMatrix) {
                    return terrain;
                }});
            }
            const path = Game.creeps[creeps[0]].memory._m[5];
            const dir = path ? Number(path[0]) : 0;
            if(Game.creeps[creeps[0]].memory._m) {
                for(let i in creeps) {
                    if(Game.creeps[creeps[i]]) {
                        Game.creeps[creeps[i]].move(dir);
                    }
                }
            }
        }
    }
    attackTarget() {
        let target = Game.getObjectById(this.quadObj.target);
        let damager = [];
        let healer = [];
        let creeps = this.getCreeps();
        let creepsHps = [Game.creeps[creeps[0]], Game.creeps[creeps[1]], Game.creeps[creeps[2]], Game.creeps[creeps[3]]].sort((a, b) => (b.hitsMax - b.hits) - (a.hitsMax - a.hits));
        for(let c in creeps) {
            let creep = Game.creeps[creeps[c]];
            //creep.suicide()
            if(creep) {
                if(creep.getActiveBodyparts(ATTACK)) {
                    damager.push(creep);
                    if(!target && false) {
                        target = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 1)[0];
                        if(!target) {
                            target = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1)[0];
                        }
                        /**
                        if(!target && (!creep.room.controller || creep.room.controller.owner.username !== creep.owner.username)) {
                            target = creep.pos.findInRange(FIND_STRUCTURES, 1)[0];
                        }
                        */
                    }
                    if(target) {
                        creep.attack(target);
                    }
                } else if(creep.getActiveBodyparts(WORK)) {
                    damager.push(creep);
                    if(!target && false) {
                        target = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 1)[0];
                    }
                    /**
                    if(!target && (!creep.room.controller || creep.room.controller.owner && creep.room.controller.owner.username !== creep.owner.username)) {
                        target = creep.pos.findInRange(FIND_STRUCTURES, 1)[0];
                    }
                    */
                    if(target) {
                        creep.dismantle(target);
                    }
                }
                if(creep.getActiveBodyparts(RANGED_ATTACK)) {
                    if(creep.getActiveBodyparts(RANGED_ATTACK) > 5 || creep.getActiveBodyparts(HEAL) <= 0) {
                        damager.push(creep);
                    }
                    if(!target && false) {
                        target = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 1)[0];
                        if(!target) {
                            target = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 1)[0];
                        }
                        if(!target) {
                            target = creep.pos.findInRange(FIND_HOSTILE_STRUCTURES, 3)[0];
                        }
                        /**
                        if(!target && (!creep.room.controller || creep.room.controller.owner && creep.room.controller.owner.username !== creep.owner.username)) {
                            target = creep.pos.findInRange(FIND_STRUCTURES, 1)[0];
                        }
                        */
                        if(!target) {
                            target = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3)[0];
                        }
                        /**
                        if(!target && (!creep.room.controller || creep.room.controller.owner && creep.room.controller.owner.username !== creep.owner.username)) {
                            target = creep.pos.findInRange(FIND_STRUCTURES, 3)[0];
                        }
                        */
                    }
                    if(target) {
                        if(target && creep.pos.inRangeTo(target, 1)) {
                            creep.rangedMassAttack();
                        } else if(target && creep.pos.inRangeTo(target, 3) && creep.getActiveBodyparts(RANGED_ATTACK) > 2) {
                            creep.rangedAttack(target);
                        } else {
                            creep.rangedMassAttack();
                        }
                    }
                }
                if(creep.getActiveBodyparts(HEAL)) {
                    if(creep.pos.inRangeTo(creepsHps[0], 1)) {
                        creep.heal(creepsHps[0]);
                    } else {
                        creep.rangedHeal(creepsHps[0]);
                    }
                }
            }
        }
        target = Game.getObjectById(this.quadObj.target);
        if(this.isFormed()) {
            let leaderPos = Game.creeps[creeps[0]].pos;
            if(damager.length === 2) {
                let direct = TOP;
                if(target) {
                    if(target.pos.x > leaderPos.x + 1) {
                        direct = RIGHT;
                    } else if(target.pos.x < leaderPos.x) {
                        direct = LEFT;
                    } else {
                        if(target.pos.y > leaderPos.y) {
                            direct = BOTTOM;
                        } else if(target.pos.y < leaderPos.y) {
                            direct = TOP;
                        } else {
                            direct = TOP;
                        }
                    }
                }
                if(!direct) {
                    direct = TOP;
                }
                let availableSpots = dir2d[direct];
                for(let c in damager) {
                    for(let p in availableSpots) {
                        if(damager[c].pos.x === availableSpots[p].x + leaderPos.x && damager[c].pos.y === availableSpots[p].y + leaderPos.y) {
                            availableSpots.splice(p, 1);
                            damager.splice(c, 1);
                        }
                    }
                }
                let switching = false;
                for(let c in damager) {
                    if(availableSpots[0]) {
                        let crep = Game.creeps[creeps[0]].room.lookForAt(LOOK_CREEPS, availableSpots[0].x + leaderPos.x, availableSpots[0].y + leaderPos.y)[0];
                        if(crep && crep !== damager[c]) {
                            crep.moveTo(damager[c].pos, {range: 0, priority: 20});
                            damager[c].moveTo(crep, {range: 0, priority: 20});
                            availableSpots.splice(0, 1);
                            switching = true;
                        }
                    }
                }
                if(switching) {
                    return "switch";
                }
            }
        }
    }
    attackQuad() {
        let creeps = this.getCreeps();
        if(!creeps) {
            Memory.quads[this.quadName] = undefined;
            return;
        }
        let leader = Game.creeps[creeps[0]];
        if(!Game.creeps[creeps[0]] && !Game.creeps[creeps[1]] && !Game.creeps[creeps[2]] && !Game.creeps[creeps[3]] || !leader) {
            Memory.quads[this.quadName] = undefined;
            return;
        }
        if(!this.quadObj.terrainMatrix || this.quadObj.terrainMatrixRoom !== leader.room.name) {
            this.quadObj.terrainMatrix = this.formWallMatrix();
            this.quadObj.terrainMatrixRoom = leader.room.name;
        }
        this.quadObj.target = this.findTarget();
        if(Game.creeps[creeps[0]] && Game.creeps[creeps[0]].room.name !== this.quadObj.roomToAttack) {
            this.snakeQuad();
            this.attackTarget();
        } else {
            if(this.isFormed()) {
                Memory.quads[this.quadName].leaderPos = undefined;
                if(this.attackTarget() !== "switch") {
                    this.moveQuad();
                }
            } else {
                this.sortQuad();
                this.formQuad();
                this.attackTarget();
            }
        }
    }
    boostCreep(creep, lab) {
        Game.getObjectById(lab).boostCreep(creep);
        creep.moveTo(Game.getObjectById(lab), {priority: 20, range: 1});
    }
    boostQuad() {
        let allBoosted = true;
        if(!Memory.datas[this.quadObj.roomToSpawn]) {
            this.quadObj.state = "attack";
            return;
        }
        for(let c in this.getCreeps()) {
            let creep = Game.creeps[this.getCreeps()[c]];
            for(let i in creep.body) {
                let bodyPart = creep.body[i];
                if(bodyPart.boost) {
                    continue;
                }
                if(bodyPart.type === TOUGH && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"]).store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"]).store[RESOURCE_GHODIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"]).store[RESOURCE_GHODIUM_OXIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["0"])
                        allBoosted = false;
                        break;
                    }
                } else if(bodyPart.type === HEAL && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"]).store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"]).store[RESOURCE_LEMERGIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"]).store[RESOURCE_LEMERGIUM_OXIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["1"])
                        allBoosted = false;
                        break;
                    }
                } else if(bodyPart.type === MOVE && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"]).store[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"]).store[RESOURCE_ZYNTHIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"]).store[RESOURCE_ZYNTHIUM_OXIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["2"])
                        allBoosted = false;
                        break;
                    }
                } else if(bodyPart.type === ATTACK && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"]).store[RESOURCE_CATALYZED_UTRIUM_ACID] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"]).store[RESOURCE_UTRIUM_ACID] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"]).store[RESOURCE_UTRIUM_HYDRIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["3"])
                        allBoosted = false;
                        break;
                    }
                } else if(bodyPart.type === WORK && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"]).store[RESOURCE_CATALYZED_ZYNTHIUM_ACID] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"]).store[RESOURCE_ZYNTHIUM_ACID] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"]).store[RESOURCE_ZYNTHIUM_HYDRIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["4"])
                        allBoosted = false;
                        break;
                    }
                } else if(bodyPart.type === RANGED_ATTACK && Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"])) {
                    if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"]).store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"]).store[RESOURCE_KEANIUM_ALKALIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"])
                        allBoosted = false;
                        break;
                    } else if(Game.getObjectById(Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"]).store[RESOURCE_KEANIUM_OXIDE] > 30) {
                        this.boostCreep(creep, Memory.datas[this.quadObj.roomToSpawn].structures["lab"]["5"])
                        allBoosted = false;
                        break;
                    }
                }
            }
        }
        if(allBoosted) {
            this.quadObj.state = "attack";
        }
    }
    run() {
        switch(this.quadObj.state) {
            case "spawn":
                if(Memory.datas[this.quadObj.roomToSpawn]) {
                    Memory.datas[this.quadObj.roomToSpawn].combatLabs = true;
                }
                this.spawnQuad();
            break;
            case "renew":
                if(Memory.datas[this.quadObj.roomToSpawn]) {
                    Memory.datas[this.quadObj.roomToSpawn].combatLabs = true;
                }
                this.renewQuad();
            break;
            case "boost":
                if(Memory.datas[this.quadObj.roomToSpawn]) {
                    Memory.datas[this.quadObj.roomToSpawn].combatLabs = true;
                }
                if(this.quadObj.options.boosted === false) {
                    this.quadObj.state = "attack";
                } else {
                    this.boostQuad();
                }
            break;
            case "attack":
                this.attackQuad();
            break;
        }
    }
};
function runAllQuads() {
    for(let i in Memory.quads) {
        if(i && Memory.quads[i]) {
            let currentQuad = new quad(i);
            currentQuad.run();
        }
    }
}

module.exports.runAllQuads = runAllQuads;

global.makeQuad = function(quadName, roomToAttack, roomToSpawn, quadType, options) {
    if(!Memory.quads[quadName]) {
        Memory.quads[quadName] = {
            roomToAttack: roomToAttack,
            roomToSpawn: roomToSpawn,
            quadType: quadType,
            creeps: [null, null, null, null],
            state: "spawn",
            options: options,
        }
    }
}


// global.makeQuad("0_2", "E6N5", "E4N3", "ram", {test: false});


