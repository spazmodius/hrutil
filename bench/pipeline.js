'use strict'
const Bench = require('@spazmodius/hrbench')

const identity = _ => _

const fns = [
	identity,
	identity,
	identity,
	identity,
	identity,
	identity,
]

function reduce(value, ...fns) {
	return fns.reduce((value, fn) => fn(value), value)
}

const apply = (value, fn) => fn(value)
function reduce2(value, ...fns) {
	return fns.reduce(apply, value)
}

function forloop(value, ...fns) {
	for (let i = 0; i < fns.length; ++i)
		value = fns[i](value)
	return value
}

Bench('Pipeline')
	.test(() => reduce(2, identity, identity, identity, identity, identity, identity))
	.test(() => reduce2(2, identity, identity, identity, identity, identity, identity))
	.test(() => forloop(2, identity, identity, identity, identity, identity, identity))
