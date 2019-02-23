'use strict'
const given = require('@spazmodius/gwt')
const constants = require('../lib/const')
const { addTo } = require('../lib/mutate')
const { add, subtract } = require('../lib/arith')
const { fromNumber, toNumber } = require('../lib/number')
const { fromInteger, toInteger } = require('../lib/integer')
const { toMs } = require('../lib/ms')
const comp = require('../lib/comp')

function roundtrips({returned}, [hr]) {
	return comp.eq(returned, hr) || returned
}

function does_not_roundtrip({returned}, [hr]) {
	return !comp.eq(returned, hr) || returned
}

function returns({ returned }, _, value) {
	return Object.is(returned, value) || value
}

function throws({ threw }, _, type) {
	return threw instanceof type
}

Object.keys(constants).forEach(name => {
	given(name, constants[name])
	.when('attempt to mutate', addTo, [0,1])
	.then(({threw}) => threw instanceof TypeError)
})

function givenTestValue(name, inc) {
	let value = constants[name]
	if (inc === '--')
		value = subtract(value, constants.ONE_NANOSECOND)
	if (inc === '++')
		value = add(value, constants.ONE_NANOSECOND)
	return given(name + inc, value)
}

givenTestValue('MIN_SAFE_NUMBER')
.when(hr => fromNumber(toNumber(hr)))
.then(roundtrips)

givenTestValue('MIN_SAFE_NUMBER', '--')
.when(hr => fromNumber(toNumber(hr, true)))
.then(does_not_roundtrip)

givenTestValue('MAX_SAFE_NUMBER')
.when(hr => fromNumber(toNumber(hr)))
.then(roundtrips)

givenTestValue('MAX_SAFE_NUMBER', '++')
.when(hr => fromNumber(toNumber(hr, true)))
.then(does_not_roundtrip)

givenTestValue('MIN_SAFE_NUMBER', '--')
.when(toNumber)
.then(throws, Error)

givenTestValue('MAX_SAFE_NUMBER', '++')
.when(toNumber)
.then(throws, Error)


givenTestValue('MIN_SAFE_INTEGER')
.when(hr => fromInteger(toInteger(hr)))
.then(roundtrips)

givenTestValue('MIN_SAFE_INTEGER', '--')
.when(hr => fromInteger(toInteger(hr, true)))
.then(does_not_roundtrip)

givenTestValue('MAX_SAFE_INTEGER')
.when(hr => fromInteger(toInteger(hr)))
.then(roundtrips)

givenTestValue('MAX_SAFE_INTEGER', '++')
.when(hr => fromInteger(toInteger(hr, true)))
.then(does_not_roundtrip)

givenTestValue('MIN_SAFE_INTEGER', '--')
.when(toInteger)
.then(throws, Error)

givenTestValue('MAX_SAFE_INTEGER', '++')
.when(toInteger)
.then(throws, Error)

givenTestValue('ONE_SECOND')
.when(toNumber)
.then(returns, 1)

givenTestValue('ONE_MILLISECOND')
.when(toMs)
.then(returns, 1)

givenTestValue('ONE_NANOSECOND')
.when(toInteger)
.then(returns, 1)
