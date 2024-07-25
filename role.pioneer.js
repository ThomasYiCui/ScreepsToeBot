const profilePioneer = false;
module.exports = {
    run: function(creep) {
        if(!creep.memory.buildRoom) {
            return;
        }
        let pCPU = Game.cpu.getUsed();
        if(creep.memory.claimer) {
            if(creep.ticksToLive <= 2) {
                if(creep.room.name !== creep.memory.buildRoom || creep.room.name === creep.memory.buildRoom && creep.room.controller && creep.room.controller.owner && creep.room.controller.owner.username !== creep.owner.username) {
                    Memory.datas[creep.memory.room].toPioneer = null;
                    Memory.datas[creep.memory.buildRoom].cantReach = Game.time;
                }
            }
        }
        if(creep.room.name !== creep.memory.buildRoom) {
            if(Game.getObjectById(creep.memory.sourceToHarvest)) {
                creep.moveTo(Game.getObjectById(creep.memory.sourceToHarvest), {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 15, range: 1, priority: 9});
            } else if(Game.getObjectById(creep.memory.target)) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 15, range: 1, priority: 9});
            } else {
                creep.moveToRoom(creep.memory.buildRoom, options = {maxOps: 20000, maxRooms: 50})
            }
            if(profilePioneer) {
                console.log("PathingToRoom: " + (Game.cpu.getUsed() - pCPU));
                pCPU = Game.cpu.getUsed();
            }
            return;
        }
        if(creep.memory.claimer) {
            if(creep.ticksToLive <= 2) {
                if(creep.room.name !== creep.memory.buildRoom || creep.room.controller.owner && creep.room.controller.owner.username !== creep.owner.username) {
                    Memory.datas[creep.memory.room].toPioneer = null;
                    Memory.datas[creep.memory.buildRoom].cantReach = Game.time;
                }
            }
            creep.moveTo(creep.room.controller, {range: 1, reusePath: 50, priority: 11.5});
            if(creep.claimController(creep.room.controller) == ERR_GCL_NOT_ENOUGH) {
                Memory.datas[creep.memory.room].toPioneer = null;
                Memory.datas[creep.memory.buildRoom].cantReach = Game.time;
            }
            structs = creep.room.find(FIND_HOSTILE_STRUCTURES);
            for(let i in structs) {
                structs[i].destroy();
            }
        }
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    if(creep.memory.building) {
	        if(creep.room.controller.ticksToDowngrade <= 1000) {
                creep.upgradeController(creep.room.controller)
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 3, reusePath: 15, priority: 7, maxRooms: 1});
            }
	        let fixNow = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType !== STRUCTURE_CONTROLLER && structure.hits < 500}});
            if(fixNow) {
                creep.repair(fixNow);
                creep.moveTo(fixNow, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 8.5});
                return;
            }
            if(profilePioneer) {
                console.log("FixNow: " + (Game.cpu.getUsed() - pCPU));
                pCPU = Game.cpu.getUsed();
            }
            //creep.upgradeController(creep.room.controller)
            //creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7});
            //return;
            if(creep.memory.targets) {
	            if(!Game.getObjectById(creep.memory.targets)) {
	                creep.memory.targets = null
	            } else {
    	            creep.build(Game.getObjectById(creep.memory.targets));
    	            if(Game.getObjectById(creep.memory.targets)) {
                        creep.moveTo(Game.getObjectById(creep.memory.targets), {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 15, range: 3, priority: 7, maxRooms: 1});
    	            }
    	            return;
	            }
	        }
	        let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {return structure.structureType === STRUCTURE_SPAWN}});
            if(targets) {
                creep.memory.targets = targets.id;
                creep.build(targets);
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 15, range: 3, priority: 7, maxRooms: 1});
                return;
            }
	        targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(targets) {
                creep.memory.targets = targets.id;
                creep.build(targets);
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 15, range: 3, priority: 7, maxRooms: 1});
            } else {
                creep.upgradeController(creep.room.controller)
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 3, reusePath: 15, priority: 7, maxRooms: 1});
            }
            if(profilePioneer) {
                console.log("Build: " + (Game.cpu.getUsed() - pCPU));
                pCPU = Game.cpu.getUsed();
            }
	    }
	    else {
	        if(!creep.memory.resource) {
    	        var resources = creep.room.find(FIND_DROPPED_RESOURCES, {filter: (re) => {
                    return re.resourceType === RESOURCE_ENERGY;
                }}).sort((a, b) => b.amount - a.amount);
                if(resources && resources.length > 0 && resources[0].amount >= creep.store.getCapacity()) {
                    creep.memory.resource = resources[0].id;
                }
	        }
	        let resource = Game.getObjectById(creep.memory.resource);
            if(!resource || resource.amount < creep.store.getCapacity()) {
                creep.memory.resource = null;
            } else {
                if(creep.pickup(resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 8, maxRooms: 1});
                    return;
                }
            }
	        if(!creep.memory.sourceToHarvest || !Game.getObjectById(creep.memory.sourceToHarvest)) {
	            let sources = creep.room.find(FIND_SOURCES);
	            creep.memory.sourceToHarvest = sources[Math.floor(Math.random()*sources.length)].id;
	        }
            if(creep.harvest(Game.getObjectById(creep.memory.sourceToHarvest)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.sourceToHarvest), {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 15, range: 1, priority: 9, maxRooms: 1});
            }
            if(profilePioneer) {
                console.log("Getting ENergy: " + (Game.cpu.getUsed() - pCPU));
                pCPU = Game.cpu.getUsed();
            }
	    }
	}
	
};
