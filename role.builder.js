function getTarget(creep) {
    let container = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax * 0.75}})
    if(container[0]) {
        creep.memory.target = container[0].id;
        return;
    }
    let road = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.8;}});
    if(road) {
        creep.memory.target = road.id;
        return;
    }
    let rampart = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_RAMPART || structure.structureType === STRUCTURE_WALL) && structure.hits < structure.hitsMax - 5000}}).sort((a, b) => a.hits - b.hits);
    if(rampart[0]) {
        creep.memory.target = rampart[0].id;
        return;
    }
}


let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.memory.target = null;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        let fixNow = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType !== STRUCTURE_CONTROLLER && structure.structureType !== STRUCTURE_ROAD && structure.hits < 5000 && structure.hits < structure.hitsMax || structure.structureType === STRUCTURE_ROAD && structure.hits < 1000 && structure.hits < structure.hitsMax}});
            if(fixNow && (!Game.getObjectById(creep.memory.target) || Game.getObjectById(creep.memory.target).hits > 10000)) {
                creep.memory.target = fixNow.id;
                return;
            }
            
            if(Game.getObjectById(creep.memory.target)) {
                if(creep.build(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET && creep.repair(Game.getObjectById(creep.memory.target)) === ERR_INVALID_TARGET) {
                    creep.memory.target = null;
                }
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 5, maxRooms: 1});
            } else {
                let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(targets) {
                    creep.memory.target = targets.id;
                } else {
                    creep.memory.target = null;
                    getTarget(creep);
                    if(!Game.getObjectById(creep.memory.target)) {
                        creep.memory.target = null;
                    } else {
                        creep.repair(Game.getObjectById(creep.memory.target));
                        creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 5, maxRooms: 1});
                    }
                }
            }
	    }
	    else {
	        let storage = creep.room.storage;
            if(storage && storage.store[RESOURCE_ENERGY] >= storage.store.getCapacity() * 0.1) {
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7, maxRooms: 1});
                }
                return;
            }
            let ruins = creep.room.find(FIND_RUINS, {filter: (re) => {
                return re.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity();
            }});
            if(ruins && ruins.length > 0) {
                creep.memory.resource = ruins[0].id;
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
            }
	    }  
	}
};

module.exports = roleBuilder;
