'use strict'
const { when } = require('@spazmodius/gwt')
const { fromNumber, toNumber } = require('../lib/number')
const comp = require('../lib/comp')

function is({returned}, _, value) {
	return Object.is(returned, value) || returned
}

function eq({returned}, _, hr) {
	return comp.eq(returned, hr) || returned
}

function to_from(hr, n) {
	when(toNumber, hr).then(is, n)
	when(fromNumber, n).then(eq, hr)
}

to_from([0,0], 0)
to_from([1,0], 1)
to_from([-1,0], -1)
to_from([1,1], 1.000000001)

to_from([0,1], 0.000000001)
to_from([0,10], 0.00000001)
to_from([0,100], 0.0000001)
to_from([0,1000], 0.000001)
to_from([0,10000], 0.00001)
to_from([0,100000], 0.0001)
to_from([0,1000000], 0.001)
to_from([0,10000000], 0.01)
to_from([0,100000000], 0.1)

to_from([-1,1], -0.999999999)
to_from([-1,10], -0.99999999)
to_from([-1,100], -0.9999999)
to_from([-1,1000], -0.999999)
to_from([-1,10000], -0.99999)
to_from([-1,100000], -0.9999)
to_from([-1,1000000], -0.999)
to_from([-1,10000000], -0.99)
to_from([-1,100000000], -0.9)

to_from([7654321,123456786], 7654321.123456786)
to_from([7654321,123456787], 7654321.123456787)
to_from([7654321,123456788], 7654321.123456788)
to_from([7654321,123456789], 7654321.123456789)
to_from([7654321,123456790], 7654321.123456790)
