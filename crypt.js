const DELTA = 0x9E3779B9;

function mx(sum, y, z, p, e, k) {
	return ((z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)) ^ ((sum ^ y) + (k[p & 3 ^ e] ^ z));
}

function encryptUint32Array(v, k) {
	const length = v.length;
	const n = length - 1;
	let z = v[n];
	let sum = 0;
	for (let q = Math.floor(16 + 52 / length) | 0; q > 0; q--) {
		sum = (sum + DELTA) & 0xffffffff;
		const e = sum >>> 2 & 3;
		for (let p = 0; p < n; p++) {
			const y = v[p + 1];
			z = v[p] = (v[p] + mx(sum, y, z, p, e, k)) & 0xffffffff;
		}
		const y = v[0];
		z = v[n] = (v[n] + mx(sum, y, z, n, e, k)) & 0xffffffff;
	}
	return v;
}

function decryptUint32Array(v, k) {
	const length = v.length;
	const n = length - 1;
	let y = v[0];
	let q = Math.floor(16 + 52 / length);
	for (let sum = (q * DELTA) & 0xffffffff; sum !== 0; sum = (sum - DELTA) & 0xffffffff) {
		const e = sum >>> 2 & 3;
		for (let p = n; p > 0; p--) {
			const z = v[p - 1];
			y = v[p] = (v[p] - mx(sum, y, z, p, e, k)) & 0xffffffff;
		}
		const z = v[n];
		y = v[0] = (v[0] - mx(sum, y, z, 0, e, k)) & 0xffffffff;
	}
	return v;
}

function hexStringToUint32Array(s) {
	return Uint32Array.from(
		{ length: s.length >> 3 },
		(_, i) => Number.parseInt(s.slice(i << 3, (i + 1) << 3), 16)
	);
}

function stringToUint32Array(s) {
	if (s.length % 2 > 0) {
		s += ' ';
	}
	return Uint32Array.from(
		{ length: s.length >> 1 },
		(_, i) => s.charCodeAt(i * 2 + 1) | (s.charCodeAt(i * 2) << 16)
	);
}

function uint32ArrayToString(data) {
	const length = data.length - 1;
	if (length < 0) {
		return '';
	}
	let result = '';
	for (let i = 0; i < length; i++) {
		result += (
			String.fromCharCode(data[i] >>> 16 & 0xffff) +
			String.fromCharCode(data[i] & 0xffff)
		);
	}
	result += String.fromCharCode(data[length] >>> 16 & 0xffff);
	const q = String.fromCharCode(data[length] & 0xffff);
	if (q !== ' ') {
		result += q;
	}
	return result;
}

function sign(s, k) {
	const v = new Uint32Array(s.length + 4);
	v.set(k);
	v.set(s, 4);
	return v;
}

function checkSign(s, k) {
	if (k.some((x, i) => x !== s[i])) {
		return [];
	}
	return s.subarray(4);
}

function encrypt(s, k) {
	const k2 = hexStringToUint32Array(k);
	const v = sign(stringToUint32Array(s), k2.subarray(4));
	const d = encryptUint32Array(v, k2);
	return uint32ArrayToString(d);
}

function decrypt(s, k) {
	const k2 = hexStringToUint32Array(k);
	const v = decryptUint32Array(stringToUint32Array(s), k2);
	const d = checkSign(v, k2.subarray(4));
	return uint32ArrayToString(d);
}

module.exports = {encrypt, decrypt};
