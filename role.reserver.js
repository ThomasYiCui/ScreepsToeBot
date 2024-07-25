let roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name !== creep.memory.rtr && creep.memory.rtr) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.rtr), {range: 20, reusePath: 15, priority: 10});
            return;
        } else if(creep.room.controller) {
            if(creep.pos.inRangeTo(creep.room.controller, 1)) {
                if(creep.room.controller.reservation && creep.room.controller.reservation.username === creep.owner.username || !creep.room.controller.reservation || !creep.room.controller.reservation.username) {
                    creep.reserveController(creep.room.controller);
                } else {
                    creep.attackController(creep.room.controller);
                }
            } else {
                creep.moveTo(creep.room.controller, {range: 1, reusePath: 15, priority: 9.5, maxRooms: 1});
            }
        }
	}
};

module.exports = roleReserver;
