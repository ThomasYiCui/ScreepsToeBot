let rolePowerCreep = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.ticksToLive < 1000 && Memory.datas[creep.memory.room] && Memory.datas[creep.memory.room].structures["powerSpawn"]) {
	        let powerSpawn = Game.getObjectById(Memory.datas[creep.memory.room].structures["powerSpawn"][0]);
	        if(creep.renew(powerSpawn) === ERR_NOT_IN_RANGE && powerSpawn) {
	            creep.moveTo(powerSpawn, {range: 1, reusePath: 50, preferHighway: true, priority: 80})
	        }
	    } else {
	        if(creep.room && creep.room.controller && !creep.room.controller.isPowerEnabled) {
	            if(creep.enableRoom(creep.room.controller) === ERR_NOT_IN_RANGE) {
	                creep.moveTo(creep.room.controller, {range: 1, reusePath: 50, preferHighway: true, priority: 10})
	            }
	        }
	        if(creep.powers[PWR_GENERATE_OPS]) {
	            creep.usePower(PWR_GENERATE_OPS);
	        }
	        if(creep.powers[PWR_OPERATE_EXTENSION] && creep.store[RESOURCE_OPS] > 2) {
	            let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                if(targets.length > 0) {
	                creep.usePower(PWR_OPERATE_EXTENSION, creep.room.storage);
                }
	        }
	        if(creep.store.getFreeCapacity() <= 0) {
	            for(let i in creep.store) {
	                if(i === RESOURCE_POWER && creep.room.terminal && creep.room.terminal.store[i] < 5000) {
	                    if(creep.transfer(creep.room.terminal, i) === ERR_NOT_IN_RANGE) {
        	                creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, preferHighway: true, priority: 10});
        	            }
	                }
    	            if(creep.room.storage && creep.transfer(creep.room.storage, i) === ERR_NOT_IN_RANGE) {
    	                creep.moveTo(creep.room.storage, {range: 1, reusePath: 50, preferHighway: true, priority: 10});
    	            } else if(creep.room.terminal && creep.transfer(creep.room.terminal, i) === ERR_NOT_IN_RANGE) {
    	                creep.moveTo(creep.room.terminal, {range: 1, reusePath: 50, preferHighway: true, priority: 10});
    	            }
	            }
	        }
	    }
	}
};

module.exports = rolePowerCreep;
