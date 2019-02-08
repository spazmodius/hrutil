'use strict'
const assert = require('@spazmodius/assert')
assert.register(isSafe, hr => `isSafe([ ${hr} ])`)

const { floor, ceil } = Math
const { isInteger } = Number

function clone(hr) {
	return [ hr[0], hr[1] ]
}

function fromNumber(n) {
	if (isInteger(n)) return [n, 0]
	let s = floor(n), ns = floor((n - s + 0.5e-9) * 1e9) |0
	return [s, ns]
}

function toNumber(hr) {
	return hr[0] + hr[1] * 1e-9
}

function fromInteger(int) {
	return fromNumber(int * 1e-9)
}

function toInteger(hr) {
	assert.isSafe(hr)
	return hr[0] * 1e9 + hr[1]
}

function isSafe(hr) {
	return lte(MIN_SAFE_INTEGER, hr) && lte(hr, MAX_SAFE_INTEGER)
}

function toMs(hr) {
	return hr[0] * 1e3 + hr[1] * 1e-6
}

function fromMs(ms) {
	let s = floor(ms / 1000), ns = floor((ms - s*1000 + 0.5e-6) * 1e6) |0
	// let s = (ms * 1e-3) |0, ns = (ms * 1e6) % 1e9 |0
	// if (ns < 0) {
	// 	s -= 1
	// 	ns += 1e9
	// }
	return [s, ns]
}

module.exports = {
	MIN_SAFE_INTEGER,
	MAX_SAFE_INTEGER,
	MIN_SAFE_NUMBER,
	MAX_SAFE_NUMBER,	
	clone,
	add,
	addTo,
	subtract,
	subtractFrom,
	negate,
	toString,
	fromNumber,
	toNumber,
	fromInteger,
	toInteger,
	toMs,
	fromMs,
	lessThan: lt,
}
