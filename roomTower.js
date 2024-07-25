/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('see_all');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    see: function(room,params) {
        if (params) {
            params = {"heal":params.heal || 15, "block":params.block || 0.7, "lem":params.lem || 4};
        } else {
            params = {"heal":15, "block":0.7, "lem":4};
        }
        if (Game.rooms[room]) {
            const towers = Game.rooms[room].find(FIND_STRUCTURES,{filter: (struct) => struct.structureType == STRUCTURE_TOWER});
            
            function getRange(pos1, pos2) {
                return Math.max(Math.abs(pos1.x - pos2.x), Math.abs(pos1.y - pos2.y));
            }
            
            function calc_point(pos) {
                var hp = 0;
                for (var i=0; i<towers.length; i++) {
                    let dist = getRange(pos,towers[i].pos);
                    if (dist <= 5) {
                        hp += 600;
                    } else if (dist < 20) {
                        hp += 600 - ((dist-5) * 30);
                    } else {
                        hp += 150;
                    }
                }
                return hp;
            }
            var t = [];
            var text = "";
            const visual = new RoomVisual(room);
            for (var x = 0; x < 50; x ++) {
                for (var y = 0; y < 50; y++) {
                    let calc = calc_point({"x":x,"y":y});
                    if ((calc*(1 - params.block)-((params.heal * params.lem)*12))>0) {
                        visual.circle(x, y, {radius: 0.2, fill: "#ff0000", opacity: 0.6}); 
                    } else if (((calc*1.3)*(1 - params.block)-((params.heal * params.lem)*12))>0){
                        visual.circle(x, y, {radius: 0.2, fill: "##0000ff", opacity: 0.6});
                    } else {
                        visual.circle(x, y, {radius: 0.2, fill: "#00ff00", opacity: 0.6});
                    }
                    t.push(calc);
                    if (calc >9999) {//MAX
                        text += "MAX+ ";
                    } else if (calc>999) {//4 digits, 1 space
                        text += calc + " "
                    } else if (calc > 99) {//3 digits, 2 space
                        text += calc + "  "
                    } else if (calc > 9) {//2 digits, 3 space
                        text += calc + "   "
                    } else {
                        text += "MIN- "
                    }
                }
                text += "\n"
            }
            console.log(JSON.stringify(t));
            //console.log(text);
            //return text;
        }
    }
};
