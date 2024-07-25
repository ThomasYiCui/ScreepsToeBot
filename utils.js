
let injected = false;

function clientInject(force = false) {
if (!injected || force) {
injected = true;
const script = `<script>
if (!window.clientInjected) {
window.clientInjected = true;
window.GM_xmlhttpRequest = function(options) {
let method = options.method || 'GET';
let url = options.url.replace(/^http:/, 'https:');
let xhr = new XMLHttpRequest();
xhr.open(method, url, true);
xhr.onreadystatechange = function() {
if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
if (options.onload) {
options.onload(xhr);
}
}
};
if (options.onerror) {
xhr.onerror = function() {
options.onerror(xhr);
};
}
xhr.send();
};
function loadScript(url) {
return new Promise(function(resolve, reject) {
GM_xmlhttpRequest({
method: 'GET',
url: url,
onload: function(xhr) {
var script = document.createElement('script');
script.innerHTML = xhr.responseText;
document.head.appendChild(script);
resolve(xhr);
},
onerror: function(xhr) {
reject(xhr);
}
});
});
}
Promise.all([
loadScript('https://raw.githubusercontent.com/NesCafe62/screeps-alliance-map/2cf820b9291296588234752320d3ad2309801fb5/randomColor.js'),
loadScript('https://raw.githubusercontent.com/Esryok/screeps-browser-ext/1cb5ffe424861cf961a39c4babba94a8956486aa/screeps-browser-core.js')
]).then(() => loadScript('https://raw.githubusercontent.com/NesCafe62/screeps-alliance-map/master/alliance-overlay.user.js'));
}
</script>`;
const preInject = force ? '<script>window.clientInjected = false;</script>' : '';
return preInject + script.replace(/\r?\n|\r/g, '');
}
}

global.inject = function(force = false) {
injected = false;
return clientInject(force) + 'Client injected';
};
global.inject();









if(!global.stats) {
    global.stats = {};
}
function rateRoom(roomName) {
    let room = Game.rooms[roomName];
    if(room) {
        if(Memory.datas[roomName].canBunker === false) {
            return -99;
        } else if(Memory.datas[roomName].canBunker === true) {
            let points = 0;
            let sources = room.find(FIND_SOURCES);
            points+=(sources.length - 1) * 100;
            let roomsMin = Memory.mineralRooms[room.find(FIND_MINERALS)[0].mineralType].length;
            if(!roomsMin) {
                roomsMin = 0;
            }
            points+=(Memory.mineralAvg - roomsMin) * 40;
            return points;
        }
    } else {
        return null;
    }
}
function canBunker(roomName) {
    let matrix = PathFinder.CostMatrix.deserialize(Memory.datas[roomName].distanceMatrix);
    for(let x = 7; x < 42; x++) {
        for(let y = 7; y < 42; y++) {
            if(matrix.get(x, y) >= 7) {
                return true;
            }
        }
    }
    return false;
}
function updateData() {
    for(let roomName in Game.rooms) {
        if(Memory.datas[roomName] && Memory.datas[roomName].lastTickUpdated >= Game.time) {
            return;
        }
        if(!Memory.datas[roomName]) {
            Memory.datas[roomName] = {};
        }
        if(Memory.datas[roomName]) {
            //console.log(Memory.datas[roomName].sources, roomName);
            if(!Memory.datas[roomName].sources) {
                let sources = {};
                let sourcesD = Game.rooms[roomName].find(FIND_SOURCES).map(source => {
                    return source.id
                });
                for(var i = 0; i < sourcesD.length; i++) {
                    sources[sourcesD[i]] = null;
                }
                Memory.datas[roomName].sources = sources
            }
            if(!Memory.datas[roomName].remoteRooms) {
                Memory.datas[roomName].remoteRooms = [];
            }
            let powerBank = _.filter(Game.rooms[roomName].find(FIND_HOSTILE_STRUCTURES), (structure) => structure.structureType === STRUCTURE_POWER_BANK)[0]
            if(powerBank && !Memory.power[roomName]) {
                Memory.power[roomName] = powerBank.id;
            }
        }
        if(Memory.datas[roomName] && Game.rooms[roomName]) {
            if(Game.rooms[roomName].controller) {
                if(Game.rooms[roomName].controller.owner) {
                    Memory.datas[roomName].control = Game.rooms[roomName].controller.owner;
                    if(Game.rooms[roomName].controller.my) {
                        if(Memory.datas[roomName].distanceMatrix) {
                            Memory.datas[roomName].distanceMatrix = undefined;
                        }
                        if(!Memory.datas[roomName].minId) {
                            Memory.datas[roomName].minId = Game.rooms[roomName].find(FIND_MINERALS)[0].id;
                        }
                        if(!Game.getObjectById(Memory.datas[roomName].controllerLink) || Game.getObjectById(Memory.datas[roomName].controllerLink).room.name !== roomName) {
                            if(Game.rooms[roomName].controller.level >= 7) {
                                let controllerLink = Game.rooms[roomName].controller.pos.findInRange(FIND_MY_STRUCTURES, 4, {filter: (structure) => {return structure.structureType === STRUCTURE_LINK}});
                                if(controllerLink[0]) {
                                    Memory.datas[roomName].controllerLink = controllerLink[0].id;
                                }
                            } else {
                                let controllerLink = Game.rooms[roomName].controller.pos.findInRange(FIND_STRUCTURES, 4, {filter: (structure) => {return structure.structureType === STRUCTURE_CONTAINER}});
                                if(controllerLink[0]) {
                                    Memory.datas[roomName].controllerLink = controllerLink[0].id;
                                }
                            }
                        }
                        if(Game.rooms[roomName].controller.level >= 5 && (!Game.getObjectById(Memory.datas[roomName].masterLink) || Game.getObjectById(Memory.datas[roomName].masterLink).room.name !== roomName)) {
                            Memory.datas[roomName].masterLink = undefined;
                            let masterLink = [];
                            if(Game.rooms[roomName].storage) {
                                masterLink = Game.rooms[roomName].storage.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: (structure) => {return structure.structureType === STRUCTURE_LINK}});
                            }
                            if(masterLink[0]) {
                                Memory.datas[roomName].masterLink = masterLink[0].id;
                            } else {
                                let spawns = Game.rooms[roomName].find(FIND_MY_SPAWNS);
                                for(let sp in spawns) {
                                    masterLink = spawns[sp].pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: (structure) => {return structure.structureType === STRUCTURE_LINK}});
                                    if(masterLink[0]) {
                                        Memory.datas[roomName].masterLink = masterLink[0].id;
                                        break;
                                    }
                                }
                                if(!Memory.datas[roomName].masterLink && Game.rooms[roomName].terminal) {
                                    masterLink = Game.rooms[roomName].terminal.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: (structure) => {return structure.structureType === STRUCTURE_LINK}});
                                    if(masterLink[0]) {
                                        Memory.datas[roomName].masterLink = masterLink[0].id;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if(Memory.datas[roomName].canBunker !== false && Memory.datas[roomName].canBunker !== true) {
                        global.distanceTransform(roomName, false);
                        Memory.datas[roomName].canBunker = canBunker(roomName);
                        Memory.datas[roomName].distanceMatrix = undefined;
                    }
                    Memory.datas[roomName].points = rateRoom(roomName);
                    Memory.datas[roomName].control = undefined;
                    Memory.datas[roomName].masterLink = undefined;
                }
            } else {
                Memory.datas[roomName].control = undefined;
                Memory.datas[roomName].masterLink = undefined;
            }
            Memory.datas[roomName].energyDeposits = _.filter(Game.rooms[roomName].find(FIND_DROPPED_RESOURCES), (resource) => resource.resourceType === RESOURCE_ENERGY).map(resource => {
                return resource.id
            });
        } else {
            let energyDeposits = _.filter(Game.rooms[roomName].find(FIND_DROPPED_RESOURCES), (resource) => resource.resourceType === RESOURCE_ENERGY).map(resource => {
                return resource.id
            });
            Memory.datas[roomName] = {
                lastTickUpdated: Game.time,
                energyDeposits: energyDeposits,
            }
        }
        Memory.datas[roomName].lastTickUpdated = Game.time;
    }
}
global.updateData = updateData;
function getBestRoom() {
    let bestPoints = 70;
    let bestRoom = null;
    for(let i in Memory.datas) {
        let roomData = Memory.datas[i];
        if(roomData.points > bestPoints && roomData.canBunker === true && (!roomData.cantReach || roomData.cantReach < Game.time - 1500) && (!roomData.control || roomData.control && roomData.control.username !== Memory.username)) {
            bestPoints = roomData.points;
            bestRoom = i;
        }
    }
    return bestRoom;
}
global.getBestRoom = getBestRoom;
//global.addRoom("1", "E55S53");
