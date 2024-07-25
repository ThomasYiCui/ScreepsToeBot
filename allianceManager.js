const { encrypt, decrypt } = require('./crypt');

// alliance leader playerName. undefined to disable synchronization
const SYNC_PLAYER_BY_SHARD = {
	shard0: undefined,
	shard1: 'U-238',
	shard2: 'Winnduu',
	shard3: 'Shylo132',
};

// set to `true` if you are alliance leader
const SYNC_LEADER_BY_SHARD = {
	shard0: false,
	shard1: false,
	shard2: false,
	shard3: false,
};

const COUNCIL = 'council';
const MEMBER = 'member';
const INACTIVE = 'inactive';
const ASSOCIATE = 'associate';

const NEXT_TICK = Symbol('NEXT_TICK');
const ERR_DECRYPTION_FAILED = -1;
const ERR_JSON_PARSE_FAILED = -2;

const ALLIANCE_OPTIONS = {
	
	interval: 20, // interval of members data sync in game ticks
	
	sync: {
		enabled: true,
		isLeader: SYNC_LEADER_BY_SHARD[Game.shard.name],
		playerName: SYNC_PLAYER_BY_SHARD[Game.shard.name],
		
		keyExpireInterval: {days: 14},
		keySegmentId: 65, // (private) segment id for key storage
		segmentId: 66, // (public) segment id for allies synchronization
		dataSegmentId: 67, // (public) segment id for ally members data
		interval: 100, // interval of synchronization in game ticks
	},
	
	// synced:
	allies: {
		Shylo132: COUNCIL,
		Winnduu: COUNCIL,
		"U-238": COUNCIL,

		MerlinMan5: MEMBER,
		ThomasCui: MEMBER,
		Arigilos: MEMBER,
		Salieri: MEMBER,
		Loop_Cat: MEMBER,
		Acquawo: MEMBER,

		PlainCucumber25: INACTIVE,
		
		Virus_377b2d: ASSOCIATE,
		Diesel13: ASSOCIATE,
		ChuChuChu: ASSOCIATE,
		Pankpanther: ASSOCIATE,
		DollarAkshay: ASSOCIATE,
		Starb: ASSOCIATE,
		_KFC_: ASSOCIATE,
		Penzz: ASSOCIATE,
		tidusfox9: ASSOCIATE,
	},

	// non synced:
	// localAllies: {},
	
};

function isEmptyObject(data) {
	for (const key in data) {
		if (data[key]) {
			return false;
		}
	}
	return true;
}

class ForeignSegmentProvider {
	
	constructor() {
		this.requestedPlayerName = undefined;
		this.requestedSegmentId = undefined;
		this.dataRaw = undefined;
		this.data = undefined;
	}
	
	read(raw = false) {
		const { username, id, data } = RawMemory.foreignSegment || {};
		if (
			username !== this.requestedPlayerName ||
			id !== this.requestedSegmentId ||
			!data
		) {
			return;
		}
		try {
			this.data = raw ? undefined : JSON.parse(data);
			this.dataRaw = data;
			return raw ? this.dataRaw : this.data;
		} catch(error) {
			console.log(`ForeignSegmentProvider failed to parse foreign segment data player='${username}', segmentId=${id}: ${error.message}`);
			return ERR_JSON_PARSE_FAILED;
		}
	}
	
	requestSegment(playerName, segmentId) {
		this.requestedPlayerName = playerName;
		this.requestedSegmentId = segmentId;
		this.data = undefined;
		this.dataRaw = undefined;
		RawMemory.setActiveForeignSegment(playerName, segmentId);
	}

	readSegment(playerName, segmentId, raw = false) {
		if (
			this.requestedPlayerName !== playerName ||
			this.requestedSegmentId !== segmentId
		) {
			this.requestSegment(playerName, segmentId);
			return;
		}
		return this.read(raw);
	}
	
	writeSegment(segmentId, data, raw = false) {
		RawMemory.segments[segmentId] = raw ? data : JSON.stringify(data);
	}
	
	setPublicSegments(segments) {
		RawMemory.setPublicSegments(segments);
	}
	
	writeEncryptedSegment(segmentId, data, key) {
		const s = JSON.stringify(data);
		this.writeSegment(segmentId, s ? encrypt(s, key) : '', true);
	}
	
	readEncryptedSegment(playerName, segmentId, key) {
		const data = this.readSegment(playerName, segmentId, true);
		try {
			if (data === '') {
				return {};
			}
			if (!data) {
				return;
			}
			const s = decrypt(data, key);
			if (s.charAt(0) !== '{') {
				return ERR_DECRYPTION_FAILED;
			}
			return JSON.parse(s);
		} catch (error) {
			console.log(`ForeignSegmentProvider failed to parse foreign segment data player='${username}', segmentId=${id}: ${error.message}`);
			return ERR_JSON_PARSE_FAILED;
		}
	}
	
}

class AllianceDataSync {
	
	constructor(foreignSegmentProvider, getData, isAlly, onKeyChanged, options = {}) {
		this.segmentProvider = foreignSegmentProvider;
		this.getData = getData;
		this.isAlly = isAlly;
		this.onKeyChanged = onKeyChanged;
		this.isLeader = options.isLeader || false;
		this.leaderPlayerName = options.playerName;
		this.keySegmentId = options.keySegmentId;
		this.segmentId = options.segmentId;
		this.dataSegmentId = options.dataSegmentId;
		this.interval = options.interval || 100;
		this.keyExpireInterval = options.keyExpireInterval;
		this.keyData = undefined;
		this.nextSyncTime = Game.time;
		this.leaderRoomName = undefined;
		this.isEnabled = this.isLeader || Boolean(this.leaderPlayerName);

		if (this.isLeader) {
			this.keyRequests = new Map();
		}
		this.segmentProvider.setPublicSegments(
			this.isLeader ? [this.segmentId, this.dataSegmentId] : [this.dataSegmentId]
		);
	}
	
	setPublicSegments(segments = []) {
		const allianceSegments = this.isLeader
			? [this.segmentId, this.dataSegmentId]
			: [this.dataSegmentId];
		this.segmentProvider.setPublicSegments(
			(segments.length > 0) ? allianceSegments.concat(segments) : allianceSegments
		);
	}
	
	generateKey() {
		return Array.from({length: 8}, (_, i) => Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0')).join('');
	}
	
	setActiveSegments(segments) {
		RawMemory.setActiveSegments(
			this.keyData ? segments : segments.concat([this.keySegmentId])
		);
	}
	
	readKeyFromTransactions() {
		let i = 0;
		for (const transaction of Game.market.incomingTransactions) {
			if (
				transaction.sender.username === this.leaderPlayerName &&
				transaction.resourceType === RESOURCE_ENERGY &&
				transaction.amount === 3
			) {
				if (transaction.description.length === 66) {
					this.keyData.newKey = transaction.description.slice(2);
					this.saveKeyData();
					return true;
				}
				if (transaction.description.length === 64) {
					this.keyData.key = transaction.description;
					this.saveKeyData();
					return true;
				}
			}
			i++;
			if (i >= 30) {
				break;
			}
		}
		return false;
	}
	
	readKeyFromLocalSegment() {
		const data = RawMemory.segments[this.keySegmentId];
		if (data === undefined) {
			RawMemory.setActiveSegments([this.keySegmentId]);
			return false;
		}
		this.keyData = JSON.parse(data || 'null') || {key: undefined, expire: null};
		return true;
	}
	
	saveKeyData() {
		RawMemory.segments[this.keySegmentId] = JSON.stringify(this.keyData);
	}
	
	publishAllies(data) {
		this.segmentProvider.writeEncryptedSegment(this.segmentId, data, this.keyData.key);
	}
	
	getFreeTerminal() {
		for (const name in Game.rooms) {
			const terminal = this.getValidTerminal(Game.rooms[name]);
			if (terminal && terminal.cooldown === 0 && !terminal.isUsed && terminal.store.energy >= 10) {
				return terminal;
			}
		}
	}
	
	sendRequestedKeys() {
		if (this.keyRequests.size === 0) {
			let i = 0;
			for (const transaction of Game.market.incomingTransactions) {
				if (Game.time > transaction.time + 1000) {
					break;
				}
				const playerName = transaction.sender.username;
				if (
					transaction.resourceType === RESOURCE_ENERGY && transaction.amount === 3 &&
					!this.keyRequests.has(playerName) && this.isAlly(playerName)
				) {
					this.keyRequests.set(playerName, {
						roomName: transaction.from,
						time: transaction.time
					});
				}
				if (++i >= 30) {
					break;
				}
			}

			if (this.keyRequests.size === 0) {
				return true;
			}
		}
		
		let i = 0;
		for (const transaction of Game.market.outgoingTransactions) {
			if (Game.time > transaction.time + 1000) {
				break;
			}
			const playerName = transaction.recipient.username;
			if (
				transaction.resourceType === RESOURCE_ENERGY && transaction.amount === 3 &&
				this.keyRequests.has(playerName) && transaction.time > this.keyRequests.get(playerName).time
			) {
				this.keyRequests.delete(playerName);
			}
			if (++i >= 30) {
				break;
			}
		}
		
		let hasRequests = false;
		i = 0;
		const key = this.keyData.newKey ? 'n:' + this.keyData.newKey : this.keyData.key;
		for (const [playerName, keyRequest] of this.keyRequests) {
			hasRequests = true;
			const terminal = this.getFreeTerminal();
			if (!terminal) {
				break;
			}
			terminal.send(RESOURCE_ENERGY, 3, keyRequest.roomName, key);
			if (++i >= 3) {
				break;
			}
		}
		
		if (!hasRequests) {
			this.keyRequests.clear();
			return true;
		}
		return false; // not finished sending (NEXT_TICK)
	}
	
	/**
	 * @param {Date} time
	 */
	setNextKeyTime(time) {
		if (!this.isLeader) {
			console.log(`AllianceDataSync could not set 'nextKeyTime' you are not a leader`);
			return;
		}
		this.keyData.nextKeyTime = time.getTime();
	}
	
	updateLeaderNextKey() {
		if (new Date() < this.keyData.nextKeyTime) {
			return false;
		}
		const nextKeyTime = new Date(this.keyData.nextKeyTime);
		nextKeyTime.setDate(nextKeyTime.getDate() + this.keyExpireInterval.days);
		this.keyData.newKey = this.generateKey();
		this.keyData.nextKeyTime = nextKeyTime.getTime();
		this.keyData.expire = Game.time + 1000;
		return true;
	}
	
	initNextKeyTime() {
		// next sunday 9:00 AM UTC (5:00 AM EDT)
		const date = new Date();
		date.setUTCHours(9, 0, 0, 0);
		date.setDate(date.getDate() + (7 - date.getDay()) % 7);
		return date;
	}
	
	syncLeader() {
		if (!this.keyData && !this.readKeyFromLocalSegment()) {
			return NEXT_TICK;
		}
		if (!this.keyData.key) {
			this.keyData.key = this.generateKey();
			this.keyData.nextKeyTime = this.initNextKeyTime().getTime();
			this.saveKeyData();
		}

		if (this.updateExpiredKey() || !this.sendRequestedKeys()) {
			return NEXT_TICK;
		}

		if (this.updateLeaderRoomName() || this.updateLeaderNextKey()) {
			const data = this.getData();
			data.room = this.leaderRoomName;
			data.keyExpireTime = this.keyData.expire || undefined;
			this.publishAllies(data);
		}
	}


	updateLeaderRoomName() {
		if (this.leaderRoomName && this.hasValidLeaderTerminal(Game.rooms[this.leaderRoomName])) {
			return false;
		}
		
		for (const name in Game.rooms) {
			if (this.hasValidLeaderTerminal(Game.rooms[name])) {
				this.leaderRoomName = name;
				return true;
			}
		}
		this.leaderRoomName = undefined;
		console.log(`AllianceDataSync you don't have a valid terminal`);
		return true;
	}

	hasValidLeaderTerminal(room) {
		return (
			room && room.controller && room.controller.my &&
			room.terminal && room.terminal.my && room.terminal.store.getFreeCapacity() > 100
			// prob check `room.terminal.isActive`
		);
	}
	
	getValidTerminal(room) {
		if (
			room.controller && room.controller.my &&
			room.terminal && room.terminal.my
			// prob check `room.terminal.isActive`
		) {
			return room.terminal;
		}
	}
	
	
	setKeyData(expire, leaderRoom) {
		if (
			expire === this.keyData.expire &&
			leaderRoom === this.keyData.leaderRoom
		) {
			return;
		}
		this.keyData.expire = expire;
		this.keyData.leaderRoom = leaderRoom;
		this.saveKeyData();
	}
	
	updateExpiredKey() {
		if (this.keyData.key && this.keyData.expire && Game.time >= this.keyData.expire) {
			this.keyData.key = this.keyData.newKey; // intended that it might be undefined
			this.keyData.newKey = undefined;
			this.keyData.expire = null;
			this.saveKeyData();
			if (this.keyData.key && this.onKeyChanged) {
				this.onKeyChanged();
			}
			return true;
		}
		return false;
	}
	
	setLeaderRoom(leaderRoom) {
		if (this.isLeader) {
			console.log(`AllianceDataSync should not use 'setLeaderRoom' for leader`);
			return;
		}
		this.keyData.leaderRoom = leaderRoom;
		this.saveKeyData();
	}
	
	requestKey() {
		if (this.keyData.newKey || this.readKeyFromTransactions()) {
			return;
		}
		
		if (!this.keyData.leaderRoom) {
			console.log(`AllianceDataSync leader room is undefined`);
			console.log(`type in game console: require('allianceManager').setLeaderRoom('<leader room name here...>')`);
			return;
		}
		
		let hasValidTerminal = false;
		for (const name in Game.rooms) {
			const terminal = this.getValidTerminal(Game.rooms[name]);
			if (terminal) {
				hasValidTerminal = true;
				if (
					terminal.cooldown === 0 && terminal.store.energy >= 10 &&
					terminal.send(RESOURCE_ENERGY, 3, this.keyData.leaderRoom) === OK
				) {
					break;
				}
			}
		}
		if (!hasValidTerminal) {
			console.log(`AllianceDataSync you don't have a valid terminal`);
		}
	}
	
	writeMyData(data) {
		if (!this.keyData.key) {
			return;
		}
		const _data = isEmptyObject(data)
			? undefined : data;
		this.segmentProvider.writeEncryptedSegment(this.dataSegmentId, _data, this.keyData.key);
	}
	
	readAllyData(playerName) {
		if (!this.keyData.key) {
			return;
		}
		
		const data = this.segmentProvider.readEncryptedSegment(
			playerName, this.dataSegmentId, this.keyData.key
		);
		if (data === undefined) {
			return NEXT_TICK;
		}
		if (Object.keys(data).length === 0) {
			return;
		}		
		return data;
	}
	
	syncMember() {
		if (!this.keyData && !this.readKeyFromLocalSegment()) {
			return NEXT_TICK;
		}
		if (this.updateExpiredKey()) {
			return NEXT_TICK;
		}
		
		if (
			!this.keyData.key ||
			(this.keyData.expire && Game.time >= this.keyData.expire - 1000)
		) {
			this.requestKey();
			return;
		}

		const useNewKey = (this.keyData.newKey && !this.keyData.expire);
		const data = this.segmentProvider.readEncryptedSegment(
			this.leaderPlayerName, this.segmentId,
			useNewKey ? this.keyData.newKey : this.keyData.key
		);
		if (data === undefined) {
			return NEXT_TICK;
		}
		if (data === ERR_JSON_PARSE_FAILED) {
			return;
		}
		if (data === ERR_DECRYPTION_FAILED) { // key changed
			if (useNewKey) {
				return;
			}
			this.keyData = {
				key: undefined,
				leaderRoom: this.keyData.leaderRoom,
				expire: null
			};
			this.saveKeyData();
			return NEXT_TICK;
		}
		if (data.keyExpireTime || data.room) {
			this.setKeyData(data.keyExpireTime || null, data.room);
		}
		return data;
	}
	
	sync() {
		if (Game.time < this.nextSyncTime) {
			return;
		}
		const data = this.isLeader ? this.syncLeader() : this.syncMember();
		if (data !== NEXT_TICK) {
			this.nextSyncTime = Game.time + this.interval;
		}
		return data;
	}
	
}

class AllianceManager {
	
	constructor(options = {}) {
		this.interval = options.interval;
		this.localAllies = options.localAllies || {};
		this.allies = options.allies || {};
		this._alliesArray = undefined;
		
		this.segmentProvider = options.foreignSegmentProvider || new ForeignSegmentProvider();

		const syncOptions = options.sync || {};
		this.dataSync = syncOptions.enabled
			? new AllianceDataSync(
				this.segmentProvider,
				() => ({ allies: this.allies }),
				(u) => u in this.allies,
				() => this.saveMyData(),
				syncOptions
			)
			: undefined;

		if (syncOptions.isLeader) {
			Memory.allies = this.allies;
		} else {
			this.allies = Memory.allies || this.allies;
		}

		this.myData = Memory.myData || {};
		this.alliesData = Memory.alliesData || {};
		this.updateSyncDataAllies();
	}
	
	updateSyncDataAllies() {
		this.syncDataIndex = 0;
		this.syncDataAllies = Object.keys(this.allies)
			.filter( playerName => (
				this.hasPermissionPublishRequests(this.allies[playerName])
			));
		// clean allies data that have no permissions to publish:
		for (const playerName in this.alliesData) {
			if (!this.hasPermissionPublishRequests(this.allies[playerName])) {
				this.alliesData[playerName] = undefined;
			}
		}
	}
	
	saveMyData() {
		if (this.dataSync) {
			this.dataSync.writeMyData(this.myData);
		}
	}

	
	setActiveSegments(segments) {
		if (!this.dataSync) {
			RawMemory.setActiveSegments(segments);
			return;
		}
		this.dataSync.setActiveSegments(segments);
	}
	
	setPublicSegments(segments = []) {
		if (!this.dataSync) {
			RawMemory.setPublicSegments(segments);
			return;
		}
		this.dataSync.setPublicSegments(segments);
	}
	
	setLeaderRoom(leaderRoom) {
		if (this.dataSync) {
			this.dataSync.setLeaderRoom(leaderRoom);
		}
	}
	
	isAlly(playerName) {
		return (
			playerName in this.allies ||
			playerName in this.localAllies
		);
	}
	
	setLocalAllies(localAllies) {
		this.localAllies = localAllies;
		this._alliesArray = undefined;
	}
	
	getAlliesArray() {
		if (!this._alliesArray) {
			this._alliesArray = [...Object.keys(this.allies), ...Object.keys(this.localAllies)];
		}
		return this._alliesArray;
	}
	
	getAllyStatus(playerName) {
		return this.allies[playerName];
	}
	
	getAllyData(playerName) {
		return this.alliesData[playerName] || {};
	}
	
	getAlliesRequests(type) {
		if (type === 'econ') {
			console.log(`AllianceManager "econ" requests should be requested via "getAllyRequests(playerName, 'econ')"`);
			return;
		}
		const requests = [];
		for (const playerName in this.alliesData) {
			const data = this.alliesData[playerName];
			if (!data || !data[type]) {
				continue;
			}
			requests.push(...data[type]);
		}
		return requests;
	}
	
	getAllyRequests(playerName, type) {
		const data = this.alliesData[playerName] || {};
		if (type === 'econ') {
			return data[type];
		}
		return data[type] || [];
	}

	
	hasPermissionPublishRequests(allyStatus) {
		return allyStatus === COUNCIL || allyStatus === MEMBER;
	}
	
	applyPermissions(data, allyStatus) {
		if (!data) {
			return;
		}
		if (allyStatus === MEMBER) {
			data.attack = undefined;
			data.player = undefined;
		}
		return data;
	}

	
	syncAllies() {
		const data = this.dataSync.sync();
		if (data === NEXT_TICK) {
			return false;
		}
		if (data && data.allies) {
			Memory.allies = this.allies = data.allies;
			this._alliesArray = undefined;
			this.updateSyncDataAllies();
		}
		return true;
	}
	
	syncAlliesData() {
		if (Game.time < this.nextDataSync) {
			return;
		}
		
		const playerName = this.syncDataAllies[this.syncDataIndex];
		let data = this.dataSync.readAllyData(playerName);
		if (data === NEXT_TICK) {
			return;
		}
		
		if (data === ERR_DECRYPTION_FAILED) {
			console.log(`AllianceDataSync foreign segment decryption failed player='${playerName}', segmentId=${this.dataSync.dataSegmentId}`);
		} else if (data !== ERR_JSON_PARSE_FAILED) {
			this.alliesData[playerName] = this.applyPermissions(data, this.getAllyStatus(playerName));
		}

		this.syncDataIndex++;
		if (this.syncDataIndex >= this.syncDataAllies.length) {
			this.syncDataIndex = 0;
		}
		if (data !== undefined || this.syncDataIndex === 0) {
			this.nextDataSync = Game.time + this.interval;
		}
	}
	
	sync() {
		if (!this.dataSync || !this.dataSync.isEnabled) {
			return;
		}
		
		if (!this.syncAllies()) {
			return;
		}
		
		this.syncAlliesData();
	}
	
	
	// Request methods
	addRequest(type, request) {
		requests = this.myData[type] || (this.myData[type] = []);
		requests.push(request);
		this.saveMyData();
	}
	
	setMyData(data) {
		Memory.myData = this.myData = data;
		this.saveMyData();
	}
	
	/**
	 * Request resource
	 * @param {Object} args - a request object
	 * @param {number} args.priority - 0-1 where 1 is highest consideration
	 * @param {string} args.roomName
	 * @param {ResourceConstant} args.resourceType
	 * @param {number} args.amount - How much they want of the resource. If the responder sends only a portion of what you ask for, that's fine
	 * @param {boolean} [args.terminal] - If the bot has no terminal, allies should instead haul the resources to us
	 */
	requestResource(args) {
		this.addRequest('resource', args);
	}
	
	/**
	 * Request help in defending a room
	 * @param {Object} args - a request object
	 * @param {number} args.priority - 0-1 where 1 is highest consideration
	 * @param {string} args.roomName
	 */
	requestDefense(args) {
		this.addRequest('defense', args);
	}
	
	/**
	 * Request an attack on a specific room
	 * @param {Object} args - a request object
	 * @param {number} args.priority - 0-1 where 1 is highest consideration
	 * @param {string} args.roomName
	 */
	requestAttack(args) {
		this.addRequest('attack', args);
	}
	
	/**
	 * Influence allies aggression score towards a player
	 * @param {Object} args - a request object
	 * @param {number} args.playerName - name of a player
	 * @param {number} args.hate - 0-1 where 1 is highest consideration. How much you think your team should hate the player. Should probably affect combat aggression and targetting
	 * @param {number} args.lastAttackedBy - The last time this player has attacked you
	 */
	sharePlayer(args) {
		this.addRequest('player', args);
	}
	
	/**
	 * Request help in building/fortifying a room
	 * @param {Object} args - a request object
	 * @param {string} args.roomName
	 * @param {number} args.priority - 0-1 where 1 is highest consideration
	 * @param {'build' | 'repair'} args.workType
	 */
	requestWork(args) {
		this.addRequest('work', args);
	}
	
	/**
	 * Request energy to a room for a purpose of making upgrading faster.
	 * @param {Object} args - a request object
	 * @param {number} args.maxAmount - Amount of energy needed. Should be equal to energy that needs to be put into controller for achieving goal.
	 * @param {EFunnelGoalType.GCL | EFunnelGoalType.RCL7 | EFunnelGoalType.RCL8} args.goalType - What energy will be spent on. Room receiving energy should focus solely on achieving the goal.
	 * @param {string} [args.roomName] - Room to which energy should be sent. If undefined resources can be sent to any of requesting player's rooms.
	 */
	requestFunnel(args) {
		this.addRequest('funnel', args);
	}
	
	/**
	 * Share how your bot is doing economically
	 * @param {Object} args - a request object
	 * @param {number} args.credits - total credits the bot has. Should be 0 if there is no market on the server
	 * @param {number} args.sharableEnergy - the maximum amount of energy the bot is willing to share with allies. Should never be more than the amount of energy the bot has in storing structures
	 * @param {number} [args.energyIncome] - The average energy income the bot has calculated over the last 100 ticks. Optional, as some bots might not be able to calculate this easily.
	 * @param {Object.<MineralConstant, number>} [args.mineralNodes] - The number of mineral nodes the bot has access to, probably used to inform expansion
	 */
	shareEcon(args) {
		this.myData.econ = args;
	}
	
	/**
	 * Share scouting data about hostile owned rooms
	 * @param {Object} args - a request object
	 * @param {string} args.roomName
	 * @param {string} args.playerName - The player who owns this room. If there is no owner, the room probably isn't worth making a request about
	 * @param {number} args.lastScout - The last tick your scouted this room to acquire the data you are now sharing
	 * @param {number} args.rcl
	 * @param {number} args.energy - The amount of stored energy the room has. storage + terminal + factory should be sufficient
	 * @param {number} args.towers
	 * @param {number} args.avgRamprtHits
	 * @param {boolean} args.terminal - does scouted room have terminal built
	 */
	shareRoom(args) {
		this.addRequest('room', args);
	}
	
}
module.exports = new AllianceManager(ALLIANCE_OPTIONS);

if (!StructureTerminal.prototype.sendOriginal) {
	StructureTerminal.prototype.sendOriginal = StructureTerminal.prototype.send;
	StructureTerminal.prototype.send = function(resourceType, amount, destination, description = undefined) {
		if (this.isUsed) {
			return ERR_TIRED;
		}
		const res = this.sendOriginal(resourceType, amount, destination, description);
		if (res === OK) {
			this.isUsed = true;
		}
		return res;
	};
}

