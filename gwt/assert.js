'use strict'
const assert = require('@spazmodius/assert')

function isString(value) { 
	return typeof value === 'string' 
}

assert.register(isString, value => `${inspect(value)} is a String`)

function isArray(value) { 
	return Array.isArray(value) 
}

assert.register(isArray, value => `${inspect(value)} is an Array`)

module.exports = assert
