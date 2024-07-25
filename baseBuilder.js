const ERR_NOT_ENOUGH = -99;







// RCL 8
let rcl8Base = {"rcl":8,"structures":{"spawn":[{"x":25,"y":26},{"x":28,"y":22},{"x":25,"y":22}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":23,"y":28},{"x":21,"y":28},{"x":22,"y":29},{"x":26,"y":23},{"x":27,"y":24},{"x":28,"y":23},{"x":27,"y":22},{"x":28,"y":21},{"x":29,"y":22},{"x":23,"y":24},{"x":24,"y":23},{"x":23,"y":22},{"x":21,"y":22},{"x":22,"y":21},{"x":25,"y":30},{"x":24,"y":29},{"x":22,"y":25},{"x":21,"y":24},{"x":21,"y":26},{"x":24,"y":21},{"x":26,"y":21},{"x":29,"y":24},{"x":28,"y":25},{"x":20,"y":23},{"x":20,"y":21},{"x":26,"y":20},{"x":24,"y":30},{"x":21,"y":25},{"x":29,"y":25},{"x":25,"y":21},{"x":25,"y":28},{"x":25,"y":25},{"x":30,"y":22},{"x":20,"y":22},{"x":22,"y":24},{"x":20,"y":27},{"x":20,"y":28},{"x":20,"y":29},{"x":20,"y":30},{"x":21,"y":30},{"x":22,"y":30},{"x":28,"y":30},{"x":29,"y":30},{"x":30,"y":30},{"x":30,"y":29},{"x":30,"y":27},{"x":30,"y":26},{"x":30,"y":23},{"x":30,"y":21},{"x":30,"y":20},{"x":29,"y":20},{"x":22,"y":20},{"x":21,"y":20},{"x":20,"y":20},{"x":27,"y":23},{"x":25,"y":20}],"link":[{"x":26,"y":25}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":30},{"x":23,"y":20},{"x":23,"y":30},{"x":20,"y":25},{"x":30,"y":25},{"x":27,"y":20},{"x":23,"y":20},{"x":24,"y":28},{"x":22,"y":27},{"x":25,"y":26},{"x":28,"y":29},{"x":29,"y":28},{"x":24,"y":25},{"x":25,"y":24},{"x":23,"y":23},{"x":25,"y":22},{"x":28,"y":22}],"storage":[{"x":24,"y":25}],"tower":[{"x":23,"y":20},{"x":27,"y":30},{"x":30,"y":25},{"x":20,"y":25},{"x":23,"y":30},{"x":27,"y":20}],"observer":[{"x":22,"y":23}],"powerSpawn":[{"x":22,"y":27}],"terminal":[{"x":25,"y":24}],"lab":[{"x":26,"y":27},{"x":27,"y":27},{"x":27,"y":28},{"x":28,"y":27},{"x":27,"y":26},{"x":28,"y":28},{"x":25,"y":28},{"x":28,"y":29},{"x":29,"y":28},{"x":26,"y":29},{"x":29,"y":26}],"nuker":[{"x":24,"y":28}],"factory":[{"x":23,"y":23}]}}



// RCL 7
let rcl7Base = {"rcl":7,"structures":{"spawn":[{"x":25,"y":26},{"x":25,"y":22}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":23,"y":28},{"x":21,"y":28},{"x":22,"y":29},{"x":26,"y":23},{"x":27,"y":24},{"x":28,"y":23},{"x":27,"y":22},{"x":28,"y":21},{"x":29,"y":22},{"x":23,"y":24},{"x":24,"y":23},{"x":23,"y":22},{"x":21,"y":22},{"x":22,"y":21},{"x":25,"y":30},{"x":24,"y":29},{"x":22,"y":25},{"x":21,"y":24},{"x":21,"y":26},{"x":24,"y":21},{"x":26,"y":21},{"x":29,"y":24},{"x":20,"y":23},{"x":20,"y":21},{"x":26,"y":20},{"x":24,"y":30},{"x":21,"y":25},{"x":29,"y":25},{"x":25,"y":21},{"x":25,"y":28},{"x":25,"y":25},{"x":30,"y":22},{"x":20,"y":22},{"x":22,"y":24},{"x":20,"y":27},{"x":20,"y":28},{"x":22,"y":30},{"x":28,"y":30},{"x":29,"y":30},{"x":30,"y":27},{"x":30,"y":26},{"x":30,"y":23},{"x":22,"y":20},{"x":27,"y":23},{"x":25,"y":20}],"link":[{"x":26,"y":25}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":30},{"x":20,"y":25},{"x":27,"y":20},{"x":25,"y":26},{"x":24,"y":25},{"x":25,"y":24},{"x":23,"y":23},{"x":25,"y":22}],"storage":[{"x":24,"y":25}],"tower":[{"x":27,"y":30},{"x":20,"y":25},{"x":27,"y":20}],"terminal":[{"x":25,"y":24}],"lab":[{"x":26,"y":27},{"x":27,"y":27},{"x":27,"y":28},{"x":28,"y":27},{"x":27,"y":26},{"x":28,"y":28}],"factory":[{"x":23,"y":23}]}}



// RCL 6
let rcl6Base = {"rcl":6,"structures":{"spawn":[{"x":25,"y":26}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":23,"y":28},{"x":21,"y":28},{"x":22,"y":29},{"x":26,"y":23},{"x":27,"y":24},{"x":28,"y":23},{"x":27,"y":22},{"x":28,"y":21},{"x":29,"y":22},{"x":23,"y":24},{"x":24,"y":23},{"x":23,"y":22},{"x":21,"y":22},{"x":22,"y":21},{"x":26,"y":29},{"x":24,"y":29},{"x":22,"y":25},{"x":21,"y":24},{"x":21,"y":26},{"x":24,"y":21},{"x":26,"y":21},{"x":29,"y":24},{"x":28,"y":25},{"x":20,"y":23},{"x":26,"y":20},{"x":21,"y":25},{"x":29,"y":25},{"x":25,"y":21},{"x":25,"y":28},{"x":25,"y":25},{"x":20,"y":22},{"x":22,"y":24},{"x":20,"y":27},{"x":20,"y":28},{"x":30,"y":27},{"x":27,"y":23},{"x":25,"y":20}],"link":[{"x":26,"y":25}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":30},{"x":27,"y":20},{"x":25,"y":26},{"x":24,"y":25},{"x":25,"y":24}],"storage":[{"x":24,"y":25}],"tower":[{"x":27,"y":30},{"x":27,"y":20}],"terminal":[{"x":25,"y":24}],"lab":[{"x":27,"y":27},{"x":28,"y":28},{"x":28,"y":27}]}}



// RCL 5
let rcl5Base = {"rcl":5,"structures":{"spawn":[{"x":25,"y":26}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":23,"y":28},{"x":21,"y":28},{"x":26,"y":23},{"x":27,"y":24},{"x":28,"y":23},{"x":27,"y":22},{"x":28,"y":21},{"x":23,"y":24},{"x":24,"y":23},{"x":23,"y":22},{"x":21,"y":22},{"x":22,"y":21},{"x":26,"y":29},{"x":24,"y":29},{"x":22,"y":25},{"x":21,"y":24},{"x":21,"y":26},{"x":24,"y":21},{"x":26,"y":21},{"x":29,"y":24},{"x":28,"y":25},{"x":21,"y":25},{"x":29,"y":25},{"x":25,"y":21},{"x":25,"y":25},{"x":22,"y":24},{"x":27,"y":23}],"link":[{"x":26,"y":25}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":30},{"x":27,"y":20},{"x":25,"y":26},{"x":24,"y":25}],"storage":[{"x":24,"y":25}],"tower":[{"x":27,"y":30},{"x":27,"y":20}]}}




// RCL 4
let rcl4Base = {"rcl":4,"structures":{"spawn":[{"x":25,"y":26}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":23,"y":28},{"x":26,"y":23},{"x":27,"y":24},{"x":28,"y":23},{"x":27,"y":22},{"x":23,"y":24},{"x":24,"y":23},{"x":23,"y":22},{"x":22,"y":25},{"x":21,"y":24},{"x":21,"y":26},{"x":29,"y":24},{"x":28,"y":25},{"x":25,"y":25},{"x":22,"y":24},{"x":27,"y":23},{"x":29,"y":25}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":20},{"x":25,"y":26},{"x":24,"y":25}],"storage":[{"x":24,"y":25}],"tower":[{"x":27,"y":20}]}}




// RCL 3
let rcl3Base = {"rcl":3,"structures":{"spawn":[{"x":25,"y":26}],"extension":[{"x":23,"y":26},{"x":23,"y":27},{"x":24,"y":27},{"x":26,"y":23},{"x":27,"y":24},{"x":27,"y":22},{"x":23,"y":24},{"x":24,"y":23},{"x":25,"y":25},{"x":27,"y":23}],"road":[{"x":25,"y":31},{"x":24,"y":31},{"x":25,"y":19},{"x":19,"y":25},{"x":19,"y":24},{"x":19,"y":23},{"x":19,"y":22},{"x":19,"y":21},{"x":19,"y":20},{"x":20,"y":19},{"x":21,"y":19},{"x":22,"y":19},{"x":23,"y":19},{"x":24,"y":19},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":20,"y":31},{"x":21,"y":31},{"x":22,"y":31},{"x":23,"y":31},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":29,"y":19},{"x":30,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":22,"y":26},{"x":21,"y":27},{"x":23,"y":29},{"x":26,"y":28},{"x":27,"y":29},{"x":29,"y":27},{"x":28,"y":26},{"x":28,"y":24},{"x":29,"y":23},{"x":27,"y":21},{"x":26,"y":22},{"x":24,"y":22},{"x":23,"y":21},{"x":21,"y":23},{"x":25,"y":27},{"x":20,"y":24},{"x":30,"y":24},{"x":24,"y":20},{"x":29,"y":21},{"x":29,"y":29},{"x":21,"y":21},{"x":30,"y":28},{"x":28,"y":20},{"x":26,"y":30},{"x":22,"y":28},{"x":21,"y":29},{"x":22,"y":22},{"x":20,"y":26}],"rampart":[{"x":25,"y":19},{"x":25,"y":31},{"x":19,"y":25},{"x":31,"y":25},{"x":26,"y":19},{"x":27,"y":19},{"x":28,"y":19},{"x":30,"y":19},{"x":31,"y":19},{"x":30,"y":19},{"x":29,"y":19},{"x":31,"y":20},{"x":31,"y":21},{"x":31,"y":22},{"x":31,"y":23},{"x":31,"y":24},{"x":31,"y":25},{"x":31,"y":26},{"x":31,"y":27},{"x":31,"y":28},{"x":31,"y":29},{"x":31,"y":30},{"x":31,"y":31},{"x":30,"y":31},{"x":29,"y":31},{"x":28,"y":31},{"x":27,"y":31},{"x":26,"y":31},{"x":25,"y":31},{"x":24,"y":31},{"x":23,"y":31},{"x":22,"y":31},{"x":21,"y":31},{"x":20,"y":31},{"x":19,"y":31},{"x":19,"y":26},{"x":19,"y":27},{"x":19,"y":28},{"x":19,"y":29},{"x":19,"y":30},{"x":19,"y":31},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24},{"x":24,"y":19},{"x":23,"y":19},{"x":22,"y":19},{"x":21,"y":19},{"x":20,"y":19},{"x":19,"y":19},{"x":27,"y":20},{"x":25,"y":26}],"tower":[{"x":27,"y":20}]}}




// RCL 2
let rcl2Base = {"rcl":2,"structures":{"spawn":[{"x":25,"y":26}],"extension":[{"x":23,"y":26},{"x":24,"y":27},{"x":26,"y":23},{"x":23,"y":24},{"x":25,"y":25}],"road":[{"x":24,"y":24},{"x":23,"y":25},{"x":24,"y":26},{"x":26,"y":26},{"x":27,"y":25},{"x":26,"y":24},{"x":25,"y":23},{"x":25,"y":27}],"rampart":[{"x":25,"y":26}]}}


// RCL 1
let rcl1Base = {"rcl":1,"structures":{"spawn":[{"x":25,"y":26}],"rampart":[{"x":25,"y":26}]}}
function distanceTransform(roomName, visual) {
    let room = Game.rooms[roomName];
    if(!room) {
        return;
    }
    if(Game.cpu.bucket < 300) {
        return ERR_NOT_ENOUGH;
    }
    let terrain = room.getTerrain();
    let costMatrix = new PathFinder.CostMatrix();
    for(let x = 0; x < 50; x++) {
        for(let y = 0; y < 50; y++) {
            if(x === 0 || x === 49 || y === 0 || y === 49) {
                costMatrix.set(x, y, 0)
            } else if(terrain.get(x, y) !== TERRAIN_MASK_WALL) {
                costMatrix.set(x, y, 255)
            }
        }
    }
    let retry = true;
    while(retry) {
        if(Game.cpu.bucket < 300) {
            break;
        }
        retry = false;
        for(let x = 1; x < 49; x++) {
            for(let y = 1; y < 49; y++) {
                if(costMatrix.get(x, y) === 0) {
                    continue;
                }
                let minVal = 255;
                for(let xd = -1; xd <= 1; xd++) {
                    for(let yd = -1; yd <= 1; yd++) {
                        if(xd === 0 && yd === 0) {
                            continue;
                        }
                        if(costMatrix.get(x + xd, y + yd) < minVal) {
                            minVal = Math.min(costMatrix.get(x + xd, y + yd) + 1, 255);
                        }
                    }
                }
                if(minVal < 255 && costMatrix.get(x, y) !== minVal) {
                    costMatrix.set(x, y, minVal);
                    retry = true;
                }
            }
        }
    }
    let serialized = costMatrix.serialize();
    if(visual) {
        visualizeMatrix(serialized, roomName);
    }
    if(Memory.datas[roomName]) {
        Memory.datas[roomName].distanceMatrix = serialized;
    }
    return serialized;
}
global.distanceTransform = distanceTransform;
function visualizeMatrix(costMatrix, roomName) {
    let matrix = PathFinder.CostMatrix.deserialize(costMatrix);
    let roomVis = new RoomVisual(roomName);
    
    for(let x = 0; x < 50; x++) {
        for(let y = 0; y < 50; y++) {
            roomVis.text(matrix.get(x, y), x, y);
        }
    }
}
function findSpawnPlacement(roomName) {
    let room = Game.rooms[roomName];
    if(room) {
        if(!Memory.datas[roomName].distanceMatrix && distanceTransform(roomName, false) === ERR_NOT_ENOUGH) {
            return;
        }
        let matrix = PathFinder.CostMatrix.deserialize(Memory.datas[roomName].distanceMatrix);
        let roomVis = new RoomVisual(roomName);
        let toVisit = [room.controller.pos];
        let visited = new Set();

        while(toVisit.length > 0) {
            let checking = toVisit.shift();
            let key = `${checking.x},${checking.y}`;
            roomVis.rect(checking.x - 0.5, checking.y - 0.5, 1, 1);
            if(visited.has(key)) {
                continue;
            }
            if(matrix.get(checking.x, checking.y) >= 7) {
                return checking;
            }
            visited.add(key);
            let neighbors = [
                new RoomPosition(checking.x - 1, checking.y - 1, roomName),
                new RoomPosition(checking.x, checking.y - 1, roomName),
                new RoomPosition(checking.x + 1, checking.y - 1, roomName),
                new RoomPosition(checking.x - 1, checking.y, roomName),
                new RoomPosition(checking.x + 1, checking.y, roomName),
                new RoomPosition(checking.x - 1, checking.y + 1, roomName),
                new RoomPosition(checking.x, checking.y + 1, roomName),
                new RoomPosition(checking.x + 1, checking.y + 1, roomName)
            ];

            for(let neighbor of neighbors) {
                if(neighbor.x >= 1 && neighbor.x < 49 && neighbor.y >= 1 && neighbor.y < 49) {
                    toVisit.push(neighbor);
                }
            }
        }
    }
    return null;
}
global.visualizeMatrix = visualizeMatrix;
module.exports = {
    findCenterPos: function(roomName) {
        let spawns = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN});
        if(spawns[0]) {
            return new RoomPosition(spawns[0].pos.x, spawns[0].pos.y - 1, spawns[0].pos.roomName);
        }
        return findSpawnPlacement(roomName);
    },
    findPaths(roomName) {
        let sources = Game.rooms[roomName].find(FIND_SOURCES);
        let terrain = Game.rooms[roomName].getTerrain();
        let matrix = new PathFinder.CostMatrix()
        for(let x = 0; x < 50; x++) {
            for(let y = 0; y < 50; y++) {
                if(terrain.get(x, y) === TERRAIN_MASK_WALL) {
                    matrix.set(x, y, 255);
                } else if(terrain.get(x, y) === TERRAIN_MASK_SWAMP) {
                    matrix.set(x, y, 3);
                } else if(terrain.get(x, y) === TERRAIN_MASK_WALL) {
                    matrix.set(x, y, 3);
                }
            }
        }
        let vis = new RoomVisual(roomName);
        let roadPos = [];
        let containerPos = [];
        let roadPos1 = [];
        let roadPos2 = [];
        let z = 0;
        let path = Game.rooms[roomName].findPath(Game.rooms[roomName].controller.pos, Memory.datas[roomName].centerPos, {range: 6, ignoreCreeps: true, costCallback: function(roomName, costMatrix) {
            return matrix;
        }});
        for(let i in path) {
            matrix.set(path[i].x, path[i].y, 1);
        }
        roadPos = roadPos.concat(path.slice(3, path.length));
        containerPos = containerPos.concat(path[2]);
        for(let s in sources) {
            const path = Game.rooms[roomName].findPath(sources[s].pos, Memory.datas[roomName].centerPos, {range: 6, ignoreCreeps: true, costCallback: function(roomName, costMatrix) {
                return matrix;
            }});
            for(let i in path) {
                matrix.set(path[i].x, path[i].y, 1);
            }
            if(z === 0) {
                roadPos1 = roadPos1.concat(path.slice(1, path.length));
            } else {
                roadPos2 = roadPos2.concat(path.slice(1, path.length));
            }
            containerPos = containerPos.concat(path[0]);
            z++;
        }
        path = Game.rooms[roomName].findPath(Game.rooms[roomName].find(FIND_MINERALS)[0].pos, Memory.datas[roomName].centerPos, {range: 6, ignoreCreeps: true, costCallback: function(roomName, costMatrix) {
            return matrix;
        }});
        for(let i in path) {
            matrix.set(path[i].x, path[i].y, 1);
        }
        roadPos = roadPos.concat(path.slice(0, path.length));
        for(let i in roadPos) {
            roadPos[i] = {x: roadPos[i].x, y: roadPos[i].y}
        }
        for(let i in roadPos1) {
            roadPos1[i] = {x: roadPos1[i].x, y: roadPos1[i].y}
        }
        for(let i in roadPos2) {
            roadPos2[i] = {x: roadPos2[i].x, y: roadPos2[i].y}
        }
        for(let i in containerPos) {
            if(containerPos[i]) {
                containerPos[i] = {x: containerPos[i].x, y: containerPos[i].y}
            }
        }
        Memory.datas[roomName].paths = roadPos;
        Memory.datas[roomName].paths1 = roadPos1;
        Memory.datas[roomName].paths2 = roadPos2;
        Memory.datas[roomName].containers = containerPos;
    },
    runRoomBuild: function(roomName, visual) {
        if(!Memory.datas[roomName]) {
            return "No Data";
        }
        if(!Memory.datas[roomName].centerPos) {
            Memory.datas[roomName].centerPos = this.findCenterPos(roomName);
        }
        if(!Memory.datas[roomName].centerPos) {
            return;
        }
        if(!Memory.datas[roomName].paths || !Memory.datas[roomName].paths1 || !Memory.datas[roomName].paths2 || !Memory.datas[roomName].containers) {
            this.findPaths(roomName);
        } else {
            if(Game.rooms[roomName].controller.level >= 3) {
                for(let i in Memory.datas[roomName].paths1) {
                    if(i === "0" && Game.rooms[roomName].controller.level >= 5) {
                        let isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_ROAD)[0];
                        if(isHere) {
                            isHere.destroy();
                        }
                        isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, roomName).lookFor(LOOK_CONSTRUCTION_SITES), (s) => s.structureType === STRUCTURE_ROAD)[0];
                        if(isHere) {
                            isHere.remove();
                        }
                        isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                        if(isHere) {
                            Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, STRUCTURE_LINK);
                        }
                    } else {
                        let isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_ROAD).length > 0;
                        let isHer = _.filter(new RoomPosition(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                        if(!isHere && isHer && Memory.datas[roomName].paths2 && Memory.datas[roomName].paths2["0"] && Memory.datas[roomName].paths1[i].x !== Memory.datas[roomName].paths2["0"].x && Memory.datas[roomName].paths1[i].y !== Memory.datas[roomName].paths2["0"].y) {
                            Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].paths1[i].x, Memory.datas[roomName].paths1[i].y, STRUCTURE_ROAD);
                        }
                    }
                }
                for(let i in Memory.datas[roomName].paths2) {
                    if(i === "0" && Game.rooms[roomName].controller.level > 5) {
                        isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_ROAD)[0];
                        if(isHere) {
                            isHere.destroy();
                        }
                        isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).lookFor(LOOK_CONSTRUCTION_SITES), (s) => s.structureType === STRUCTURE_ROAD)[0];
                        if(isHere) {
                            isHere.remove();
                        }
                        isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                        if(isHere) {
                            new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).createConstructionSite(STRUCTURE_LINK);
                        }
                    } else {
                        let isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_ROAD).length > 0;
                        let isHer = _.filter(new RoomPosition(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                        if(!isHere && isHer && Memory.datas[roomName].paths1 && Memory.datas[roomName].paths1["0"] && Memory.datas[roomName].paths2[i].x !== Memory.datas[roomName].paths1["0"].x && Memory.datas[roomName].paths2[i].y !== Memory.datas[roomName].paths1["0"].y) {
                            Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].paths2[i].x, Memory.datas[roomName].paths2[i].y, STRUCTURE_ROAD);
                        }
                    }
                }
            }
            if(Game.rooms[roomName].controller.level >= 6) {
                for(let i in Memory.datas[roomName].paths) {
                    let isHere = _.filter(new RoomPosition(Memory.datas[roomName].paths[i].x, Memory.datas[roomName].paths[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_ROAD).length > 0;
                    let isHer = _.filter(new RoomPosition(Memory.datas[roomName].paths[i].x, Memory.datas[roomName].paths[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                    if(!isHere && isHer && 
                        Memory.datas[roomName].paths2 && Memory.datas[roomName].paths2["0"] && Memory.datas[roomName].paths[i].x !== Memory.datas[roomName].paths2["0"].x && Memory.datas[roomName].paths[i].y !== Memory.datas[roomName].paths2["0"].y
                        && Memory.datas[roomName].paths1 && Memory.datas[roomName].paths1["0"] && Memory.datas[roomName].paths[i].x !== Memory.datas[roomName].paths1["0"].x && Memory.datas[roomName].paths[i].y !== Memory.datas[roomName].paths1["0"].y) {
                        Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].paths[i].x, Memory.datas[roomName].paths[i].y, STRUCTURE_ROAD);
                    }
                }
            }
            if(Game.rooms[roomName].controller.level >= 3) {
                for(let i in Memory.datas[roomName].containers) {
                    if(Memory.datas[roomName].containers[i]) {
                        if(i === "0") {
                            if(Game.rooms[roomName].controller.level >= 7) {
                                let isHere = _.filter(new RoomPosition(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_LINK).length === 0;
                                if(isHere) {
                                    new RoomPosition(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, roomName).createConstructionSite(STRUCTURE_LINK);
                                }
                                isHere = _.filter(new RoomPosition(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, roomName).lookFor(LOOK_STRUCTURES), (s) => s.structureType === STRUCTURE_CONTAINER)[0];
                                if(isHere) {
                                    isHere.destroy();
                                }
                            } else {
                                let isHere = _.filter(new RoomPosition(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, roomName).look(), (s) => s.structureType === STRUCTURE_CONTAINER).length > 0;
                                if(!isHere) {
                                    Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, STRUCTURE_CONTAINER);
                                }
                            }
                        } else {
                            let isHere = _.filter(new RoomPosition(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, roomName).look(), (s) => s.structureType === STRUCTURE_CONTAINER).length > 0;
                            if(!isHere) {
                                Game.rooms[roomName].createConstructionSite(Memory.datas[roomName].containers[i].x, Memory.datas[roomName].containers[i].y, STRUCTURE_CONTAINER);
                            }
                        }
                    }
                }
            }
        }
        if(Game.rooms[roomName].controller.level >= 6) {
            let mineralPos = Game.rooms[roomName].find(FIND_MINERALS)[0].pos;
            let isHere = _.filter(mineralPos.look(), (s) => s.structureType === STRUCTURE_EXTRACTOR).length > 0;
            if(!isHere) {
                Game.rooms[roomName].createConstructionSite(mineralPos.x, mineralPos.y, STRUCTURE_EXTRACTOR);
            }
        }
        targets = Game.rooms[roomName].find(FIND_HOSTILE_STRUCTURES);
        for(let i in targets) {
            targets[i].destroy();
        }
        if(visual) {
            let roomVisual = new RoomVisual(roomName);
            roomVisual.rect(Memory.datas[roomName].centerPos.x - 0.5, Memory.datas[roomName].centerPos.y - 0.5, 1, 1, {fill: "#89eb34"});
            roomVisual.rect(Memory.datas[roomName].centerPos.x - 6.5, Memory.datas[roomName].centerPos.y - 6.5, 13, 13, {opacity: 0.03});
        }
        let structureToPlace = null;
        switch(Game.rooms[roomName].controller.level) {
            case 1:
                structureToPlace = rcl1Base;
            break;
            case 2:
                structureToPlace = rcl2Base;
            break;
            case 3:
                structureToPlace = rcl3Base;
            break;
            case 4:
                structureToPlace = rcl4Base;
            break;
            case 5:
                structureToPlace = rcl5Base;
            break;
            case 6:
                structureToPlace = rcl6Base;
            break;
            case 7:
                structureToPlace = rcl7Base;
            break;
            case 8:
                structureToPlace = rcl8Base;
            break;
        }
        if(structureToPlace) {
            for(let i in structureToPlace.structures) {
                for(let j in structureToPlace.structures[i]) {
                    let struct = structureToPlace.structures[i][j];
                    let isHere = _.filter(new RoomPosition(struct["x"] - 25 + Memory.datas[roomName].centerPos.x, struct["y"] - 25 + Memory.datas[roomName].centerPos.y, roomName).look(), (s) => s.structureType === i).length > 0;
                    if(!isHere) {
                        Game.rooms[roomName].createConstructionSite(struct["x"] - 25 + Memory.datas[roomName].centerPos.x, struct["y"] - 25 + Memory.datas[roomName].centerPos.y, i);
                    }
                }
            }
        }
    },
    run: function() {
        if(Game.cpu.bucket < 600) {
            return ERR_NOT_ENOUGH;
        }
        if(Game.time % 150 > 0) {
            return;
        }
        for(let i in Game.rooms) {
            if(Game.rooms[i].controller && Game.rooms[i].controller.my) {
                this.runRoomBuild(i, true);
            }
        }
	}
};


