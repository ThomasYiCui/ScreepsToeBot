Creep.prototype.findEnergy = function() {
    let resources = this.room.find(FIND_DROPPED_RESOURCES).sort((a, b) => b.amount - a.amount);
    if(resources.length > 0) {
        return resources[0].id;
    }
    let containers = this.room.find(FIND_STRUCTURES, {filter: (re) => {
        return re.structureType === STRUCTURE_CONTAINER && re.id !== Memory.datas[this.memory.room].controllerLink;
    }}).sort((a, b) => b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY]);
    if(containers.length > 0) {
        return containers[0].id;
    }
    return null;
}
Creep.prototype.controllerSign = function() {
    if(Memory.unownedMessage && this.room.controller && this.room.controller.sign && !Memory.unownedMessage.includes(this.room.controller.sign.text)) {
        this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}, range: 1, reusePath: 15, maxRooms: 1, priority: 6, maxOps: 2000})
        const randomKey = Memory.unownedMessage[Math.floor(Math.random() * Memory.unownedMessage.length)];
        this.signController(this.room.controller, randomKey);
        return "signing";
    }
}
Creep.prototype.upgradeMission = function() {
    this.controllerSign();
    if(this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller, {range: 3, reusePath: 15, priority: 6});
    }
}

Creep.prototype.findRepairTarget = function() {
    let container = this.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax * 0.1}})
    if(container[0]) {
        this.memory.target = container[0].id;
        return;
    }
    let road = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.1;}});
    if(road) {
        this.memory.target = road.id;
        return;
    }
    if(this.room.controller.level >= 3) {
        let rampart = this.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType === STRUCTURE_RAMPART || structure.structureType === STRUCTURE_WALL) && structure.hits < structure.hitsMax - 5000}}).sort((a, b) => a.hits - b.hits);
        if(rampart[0]) {
            this.memory.target = rampart[0].id;
            return;
        }
    }
}

Creep.prototype.getEnergy = function(resource) {
    if(this.pickup(resource) == ERR_NOT_IN_RANGE) {
        if(this.room.name === resource.room.name) {
            this.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2, maxRooms: 1});
        } else {
            this.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2});
        }
        return;
    }
    if(this.withdraw(resource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        if(this.room.name === resource.room.name) {
        this.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2, maxRooms: 1});
        } else {
            this.moveTo(resource, {visualizePathStyle: {stroke: '#ffaa00'}, range: 1, reusePath: 15, priority: 7.2});
        }
        return;
    }
}
Creep.prototype.unloadExcess = function() {
    for(let i in this.store) {
        if(this.room.terminal && (i !== RESOURCE_ENERGY || this.room.terminal.store[i] < 30000)&& this.transfer(this.room.terminal, i) === ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.terminal, {range: 1, reusePath: 50, priority: 8});
        } else if(this.room.storage && this.transfer(this.room.storage, i) === ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.storage, {range: 1, reusePath: 50, priority: 8});
        }
    }
}






