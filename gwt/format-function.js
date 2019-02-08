'use strict'
const caching = require('./caching')
const codeOf = require('./codeOf')

function formatFunction(fn) {
	return fn.name || codeOf(fn)
}

module.exports = caching(formatFunction)
