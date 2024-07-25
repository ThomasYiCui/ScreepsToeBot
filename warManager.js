class warManager {
    constructor() {
        
    }
    userRooms(user) {
        let roomNames = [];
        for(let i in Memory.datas) {
            if(Memory.datas[i].control) {
                if(Memory.datas[i].control.username === user) {
                    roomNames.push(i);
                }
            }
        }
        return roomNames;
    }
    findAttackRoom(user) {
        let closestRoom = null;
        let closestRoomUs = null;
        let closestDistance = 999999999;
        for(let i in Memory.ownedRooms) {
            for(let j in Memory.war[user].userRooms) {
                let us = Memory.ownedRooms[i];
                let them = Memory.war[user].userRooms[j];
                if(Game.map.getRoomLinearDistance(us, them) < closestDistance) {
                    closestDistance = Game.map.getRoomLinearDistance(us, them);
                    closestRoom = them;
                    closestRoomUs = us;
                }
            }
        }
        //console.log("User To Attack: " + user + ", Attacking Room: " + closestRoomUs + ", Room To Attack: " + closestRoom);
        return {us: closestRoomUs, them: closestRoom};
    }
    run() {
        for(let user in Memory.war) {
            let warData = Memory.war[user];
            if(!warData.userRooms) {
                Memory.war[user].userRooms = this.userRooms(user);
            } else if(warData.attack) {
                if(Game.time % 150 === 0) {
                    Memory.war[user].userRooms = this.userRooms(user);
                }
                Memory.war[user].attackingRooms = this.findAttackRoom(user);
                if(warData.attackingRooms) {
                    if(!Memory.quads[warData.attackingRooms.them]) {
                        //global.makeQuad(warData.attackingRooms.them, warData.attackingRooms.them, warData.attackingRooms.us, "ram", {test: false});
                    }
                }
            }
        }
    }
};

module.exports = warManager;




