let roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name !== creep.memory.room) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {range: 15, reusePath: 50, priority: 7});
            return;
        }
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
            creep.memory.target = null;
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }

	    if(creep.memory.repairing) {
	        if(Memory.datas[creep.memory.room].fixNow) {
    	        let fixNow = Game.getObjectById(Memory.datas[creep.memory.room].fixNow[0]);
                if(fixNow && Game.getObjectById(creep.memory.target) && Game.getObjectById(creep.memory.target).hits >= 10000 && Game.getObjectById(creep.memory.target).hits < Game.getObjectById(creep.memory.target).hitsMax) {
                    creep.memory.target = fixNow.id;
                }
	        }
	        if(creep.memory.target) {
                if(creep.repair(Game.getObjectById(creep.memory.target)) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 3, reusePath: 15, priority: 8, maxRooms: 1});
                } else {
                    if(creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3).length > 0) {
                        creep.say("Flee!", true);
                        let ret = PathFinder.search(creep.pos, {pos: creep.pos.findInRange(FIND_HOSTILE_CREEPS, 3)[0].pos, range: 3}, {flee: true})
                        let pos = ret.path[0];
                        if(pos) {
                            creep.moveTo(pos, {priority: 18, range: 0});
                        }
                        return;
                    }
                }
                if(!Game.getObjectById(creep.memory.target) || Game.getObjectById(creep.memory.target).hits >= Game.getObjectById(creep.memory.target).hitsMax) {
                    creep.memory.target = null;
                    creep.findRepairTarget();
                }
                return;
            } else {
                creep.findRepairTarget();
                if(!creep.memory.target) {
                    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if(targets.length) {
                        creep.build(targets[0]);
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8.5, maxRooms: 1});
                    } else {
                        creep.upgradeController(creep.room.controller)
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7, maxRooms: 1});
                        if(creep.room.sign && creep.room.sign.text !== Memory.message) {
                            creep.signController(creep.room.controller, Memory.message);
                        }
                    }
                }
            }
	    }
	    else {
            let storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] >= storage.store.getCapacity() * 0.375) {
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7, maxRooms: 1});
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
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7, maxRooms: 1});
                return;
            }
            if(creep.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7, maxRooms: 1});
                return;
            }
            creep.memory.resource = null;
	    }
	}
};

module.exports = roleRepairer;
