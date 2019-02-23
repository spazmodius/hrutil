'use strict'
const { when } = require('@spazmodius/gwt')
const { fromMs, toMs } = require('../lib/ms')
const comp = require('../lib/comp')

function is({returned}, _, value) {
	return Object.is(returned, value) || returned
}

function eq({returned}, _, hr) {
	return comp.eq(returned, hr) || returned
}

function to_from(hr, ms) {
	when(toMs, hr).then(is, ms)
	when(fromMs, ms).then(eq, hr)
}

to_from([0,0], 0)
to_from([0,1e6], 1)
to_from([1,0], 1000)

to_from([1,1], 1000.000001)
to_from([999,0], 999000)
to_from([999,1e6], 999001)
to_from([999,999e6], 999999)
to_from([999,999.9e6], 999999.9)

to_from([99999,1e5], 99999000.1)
to_from([99999,1e4], 99999000.01)
to_from([99999,1e3], 99999000.001)
to_from([99999,1e2], 99999000.0001)
to_from([99999,10], 99999000.00001)
to_from([99999,2], 99999000.000002)
to_from([999999,2], 999999000.000002)
to_from([9999999,2], 9999999000.000002)
