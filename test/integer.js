'use strict'
const { when } = require('@spazmodius/gwt')
const { fromInteger, toInteger } = require('../lib/integer')
const comp = require('../lib/comp')

function is({returned}, _, value) {
	return Object.is(returned, value) || returned
}

function eq({returned}, _, hr) {
	return comp.eq(returned, hr) || returned
}

function to_from(hr, n) {
	when(toInteger, hr).then(is, n)
	when(fromInteger, n).then(eq, hr)
}

to_from([-1,0], -1e9)
to_from([1,1], 1000000001)

to_from([0,0], 0)
to_from([0,1], 1)
to_from([0,10], 10)
to_from([0,100], 1e2)
to_from([0,1000], 1e3)
to_from([0,10000], 1e4)
to_from([0,100000], 1e5)
to_from([0,1000000], 1e6)
to_from([0,10000000], 1e7)
to_from([0,100000000], 1e8)
to_from([1,0], 1e9)

to_from([-1,1], -999999999)
to_from([-1,10], -999999990)
to_from([-1,1e2], 1e2-1e9)
to_from([-1,1e3], 1e3-1e9)
to_from([-1,1e4], 1e4-1e9)
to_from([-1,1e5], 1e5-1e9)
to_from([-1,1e6], 1e6-1e9)
to_from([-1,1e7], 1e7-1e9)
to_from([-1,1e8], 1e8-1e9)
