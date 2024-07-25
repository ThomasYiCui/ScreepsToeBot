function getRoom(creep) {
    let exits = Game.map.describeExits(creep.room.name);
    let openExits = Object.values(exits).filter(exit => Game.map.getRoomStatus(exit).status !== "closed");
    return openExits[Math.floor(Math.random() * openExits.length)];
}

module.exports = {
    run: function(creep) {
        if(!creep.memory.roomToGoTo || Game.map.getRoomStatus(creep.memory.roomToGoTo).status === "closed") {
            creep.memory.roomToGoTo = getRoom(creep);
        }

        if(creep.room.name === creep.memory.roomToGoTo) {
            if(creep.controllerSign() !== "signing") {
                creep.memory.roomToGoTo = getRoom(creep);
            }
        }

        if(creep.memory.roomToGoTo) {
            if(creep.moveTo(new RoomPosition(25, 25, creep.memory.roomToGoTo), {range: 24, reusePath: 50, preferHighway: true, maxRooms: 1, priority: 6, maxOps: 2000}) === ERR_NO_PATH) {
                creep.memory.roomToGoTo = getRoom(creep);
            }
        } else {
            creep.memory.roomToGoTo = null;
        }
    }
}
