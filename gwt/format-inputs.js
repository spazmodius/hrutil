'use strict'
const caching = require('./caching')
const { inspect } = require('util')

function formatInputs(inputs) {
	return inputs.map(inspect)
}

module.exports = caching(formatInputs)
