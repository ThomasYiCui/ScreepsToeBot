module.exports = {
    run: function(creep) {
        creep.heal(creep);
        if(creep.hits < creep.hitsMax || creep.room.name === creep.memory.drainRoom) {
            creep.moveTo(new RoomPosition(25, 25, "W0N1"), {range: 24, priority: 13});
        } else {
            creep.moveToRoom(creep.memory.drainRoom)
        }
    }
}
