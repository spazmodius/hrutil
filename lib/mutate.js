'use strict'
const { _addTo, _subtractFrom } = require('./core')

function addTo(hr, hr1) {
	return _addTo(hr, hr1[0], hr1[1])
}

function subtractFrom(hr1, hr0) {
	return _subtractFrom(hr1, hr0[0], hr0[1])
}

function negate(hr) {
	return _subtractFrom([0, 0], hr[0], hr[1])
}

module.exports = {
	addTo,
	subtractFrom,
	negate,
}
