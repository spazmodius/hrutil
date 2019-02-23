'use strict'
const assert = require('@spazmodius/assert')
const { MIN_SAFE_NUMBER, MAX_SAFE_NUMBER } = require('./const')
const { lte } = require('./comp')
const { isInteger } = Number
const { floor } = Math

function isSafe(hr, unsafe) {
	return unsafe || lte(MIN_SAFE_NUMBER, hr) && lte(hr, MAX_SAFE_NUMBER)
}

function fromNumber(n) {
	if (isInteger(n)) return [n, 0]
	let s = floor(n), ns = floor((n - s + 0.5e-9) * 1e9) |0
	return [s, ns]
}

function toNumber(hr, unsafe) {
	assert.that(isSafe, hr, unsafe).ok('outside safe range [MIN_SAFE_NUMBER, MAX_SAFE_NUMBER]', hr)
	return hr[0] + hr[1] / 1e9
}

module.exports = {
	fromNumber,
	toNumber,
}
