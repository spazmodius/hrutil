'use strict'
const { _addTo, _subtractFrom } = require('./core')

function add(hr0, hr1) {
	return _addTo(clone(hr0), hr1[0], hr1[1])
}

function subtract(hr1, hr0) {
	return _subtractFrom(clone(hr1), hr0[0], hr0[1])
}

function negative(hr) {
	return _subtractFrom([0, 0], hr[0], hr[1])
}

module.exports = {
	add,
	subtract,
	negative,
}
