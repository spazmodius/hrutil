'use strict'

function cache(obj, symbol, value) {
	Object.defineProperty(obj, symbol, { value })
	return value
}

function caching(calc) {
	const $ = Symbol(calc.name || calc.toString())
	return function(obj) {
		return obj[$] || cache(obj, $, calc(obj))
	}
}

module.exports = caching
