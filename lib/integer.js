'use strict'
const assert = require('@spazmodius/assert')
const { MIN_SAFE_INTEGER, MAX_SAFE_INTEGER } = require('./const')
const { lte } = require('./comp')
const { fromNumber } = require('./number')

function isSafe(hr, unsafe) {
	return unsafe || lte(MIN_SAFE_INTEGER, hr) && lte(hr, MAX_SAFE_INTEGER)
}

function fromInteger(int) {
	return fromNumber(int / 1e9)
}

function toInteger(hr, unsafe) {
	assert.that(isSafe, hr, unsafe).ok('outside safe range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]', hr)
	return hr[0] * 1e9 + hr[1]
}

module.exports = {
	fromInteger,
	toInteger,
}