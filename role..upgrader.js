let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name !== creep.memory.room) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 15, reusePath: 50, priority: 7.5});
            return;
        }
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }
	    if(creep.room.controller.ticksToDowngrade < 1000) {
	        creep.memory.eupgrade = true;
	    } else if(creep.room.controller.ticksToDowngrade > CONTROLLER_LEVELS[1] - 5000) {
	        creep.memory.eupgrade = false;
	    }
	    if(!creep.memory.upgrading) {
    	    let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(targets) {
                creep.memory.target = targets.id;
            }
            let b = creep.build(Game.getObjectById(creep.memory.target));
            if(b === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target))
                return;
            } else if(b === OK) {
                return;
            }
	    }
	    if(creep.memory.upgrading) {
            creep.upgradeMission();
        }
        else {
            let controllerLink = Game.getObjectById(Memory.datas[creep.room.name].controllerLink);
            if(controllerLink && controllerLink.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(RESOURCE_ENERGY)) {
                if(creep.withdraw(controllerLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controllerLink, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8, maxRooms: 1});
                }
                return;
            }
            let storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] >= storage.store.getCapacity() * 0.4) {
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8});
                }
                return;
            }
            let resource = Game.getObjectById(creep.memory.resource);
            if(!resource) {
                let resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (re) => {
                    return re.resourceType === RESOURCE_ENERGY;
                }}).sort((a, b) => b.amount - a.amount);
                if(resources && resources.length > 0) {
                    creep.memory.resource = resources[0].id;
                    resource = resources[0];
                } else {
                    resources = creep.room.find(FIND_STRUCTURES, {filter: (re) => {
                        return re.structureType === STRUCTURE_CONTAINER && re.store[RESOURCE_ENERGY] > 0;
                    }}).sort((a, b) => b.amount - a.amount);
                    if(resources && resources.length > 0) {
                        creep.memory.resource = resources[0].id;
                        resource = resources[0];
                    }
                }
            }
            if(!resource) {
                creep.memory.resource = null;
                return;
            }
            if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8, maxRooms: 1});
                return;
            }
            if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8, maxRooms: 1});
            }
        }
	}
};


module.exports = roleUpgrader;
