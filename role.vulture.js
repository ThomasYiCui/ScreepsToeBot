let roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.hauling = false;
        } else if(creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = true;
        }
        let resource = Game.getObjectById(creep.memory.resource);
	    if(creep.memory.hauling) {
	        if(resource) {
	            if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8});
                    return;
                }
                if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8});
                    return;
                }
	        }
	        if(creep.room.name !== creep.memory.rth && creep.memory.rth) {
	            creep.moveTo(new RoomPosition(25, 25, creep.memory.rth), {range: 20, reusePath: 15, priority: 7.5});
	            return;
	        }
            if(!resource) {
                let ruins = creep.pos.findClosestByRange(FIND_RUINS, {filter: (re) => {
                    return re.store.getUsedCapacity() > 0;
                }});
                if(ruins) {
                    resource = ruins;
                    creep.memory.resource = ruins.id;
                } else {
                    let struct = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (re) => {
                        return re.store && re.store.getUsedCapacity() > 0;
                    }});
                    if(struct) {
                        resource = struct;
                        creep.memory.resource = struct.id;
                    }
                    if(creep.memory.rth !== creep.memory.room) {
                        creep.moveTo(new RoomPosition(25, 25, creep.memory.rth), {range: 10, reusePath: 50, priority: 7.5});
                    }
                    return;
                }
            }
            if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8});
                return;
            }
            for(let i in resource.store) {
                if(creep.withdraw(resource, i) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8.5});
                }
                return;
            }
            creep.memory.resource = null;
        } else {
            if(creep.room.name !== creep.memory.room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 20, reusePath: 50, priority: 7.5});
                return;
            }
            if(creep.room.terminal && creep.store[RESOURCE_ENERGY] <= 0) {
                for(let i in creep.store) {
                    if(creep.transfer(creep.room.terminal, i) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    }
                    creep.memory.resource = null;
                    return;
                }
            }
            if(creep.room.storage) {
                for(let i in creep.store) {
                    if(creep.transfer(creep.room.storage, i) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8});
                    }
                    creep.memory.resource = null;
                    return;
                }
            }
        }
	}
};

module.exports = roleHauler;
