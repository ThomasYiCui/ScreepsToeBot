module.exports = {
    run: function(creep) {
        if(creep.room.name !== creep.memory.gooferRoom) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.gooferRoom), {range: 24, reusePath: 50, preferHighway: true, priority: 6, maxOps: 2000})
        } else {
            if(creep.ticksToLive % 100 <= 10) {
                creep.say("Imma goofy", true);
            } else if(creep.ticksToLive % 100 <= 20) {
                creep.say("magician!", true);
            } else if(creep.ticksToLive % 100 <= 30) {
                creep.say("Want to", true);
            } else if(creep.ticksToLive % 100 <= 40) {
                creep.say("see trick?", true);
            } else if(creep.ticksToLive % 100 <= 50) {
                creep.say("Imma creep", true);
            } else if(creep.ticksToLive % 100 <= 60) {
                creep.say("can't even", true);
            } else if(creep.ticksToLive % 100 <= 70) {
                creep.say("hear you", true);
            } else if(creep.ticksToLive % 100 <= 80) {
                creep.say("so I'll do", true);
            } else if(creep.ticksToLive % 100 <= 90) {
                creep.say("it anyways", true);
            } else {
                
            }
            creep.moveTo(new RoomPosition(creep.memory.x, creep.memory.y, creep.memory.gooferRoom), {range: 0, reusePath: 50, preferHighway: true, priority: 6, maxOps: 2000})
            if(Game.time % 20 === 0) {
                creep.memory.x = 1 + Math.round(Math.random() * 47);
                creep.memory.y = 1 + Math.round(Math.random() * 47);
            }
        }
    }
}
