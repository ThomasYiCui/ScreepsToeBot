let roleMineralHarvester = {
    run: function(creep) {
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.hauling = true;
        } else if(creep.store.getUsedCapacity() === 0) {
            creep.memory.hauling = false;
        }
        if(creep.memory.hauling) {
            if(Memory.datas[creep.memory.room] && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]) && Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]).store[Memory.datas[creep.memory.room].mineral] < 25000 && (!creep.room.terminal || creep.room.terminal.store[Memory.datas[creep.memory.room].mineral] > Memory.minimumStore * 5.2)) {
                if(creep.transfer(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), Memory.datas[creep.memory.room].mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(Memory.datas[creep.memory.room].structures["factory"]), {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5});
                }
                return;
            }
            if(creep.room.terminal) {
                if(creep.transfer(creep.room.terminal, Memory.datas[creep.memory.room].mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5});
                }
                return;
            } else if(creep.room.storage) {
                if(creep.transfer(creep.room.storage, Memory.datas[creep.memory.room].mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, priority: 7.5});
                }
                return;
            }
        } else {
            if(creep.harvest(Game.getObjectById(creep.memory.mineralToMine)) === ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.mineralToMine), {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 150, priority: 8});
            }
        }
	}
};

module.exports = roleMineralHarvester;
