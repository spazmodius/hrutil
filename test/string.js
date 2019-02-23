'use strict'
const { when } = require('@spazmodius/gwt')
const { toString } = require('../lib/string')

function returned({returned}, _, value) {
	return Object.is(returned, value) || returned
}

when(toString, [0,0]).then(returned, "0")
when(toString, [1,0]).then(returned, "1")
when(toString, [-1,0]).then(returned, "-1")
when(toString, [1,1]).then(returned, "1.000000001")
when(toString, [123456789,123456789]).then(returned, "123456789.123456789")

when(toString, [0,1]).then(returned, "0.000000001")
when(toString, [0,10]).then(returned, "0.00000001")
when(toString, [0,100]).then(returned, "0.0000001")
when(toString, [0,1000]).then(returned, "0.000001")
when(toString, [0,10000]).then(returned, "0.00001")
when(toString, [0,100000]).then(returned, "0.0001")
when(toString, [0,1000000]).then(returned, "0.001")
when(toString, [0,10000000]).then(returned, "0.01")
when(toString, [0,100000000]).then(returned, "0.1")

when(toString, [-1,1]).then(returned, "-0.999999999")
when(toString, [-1,10]).then(returned, "-0.99999999")
when(toString, [-1,100]).then(returned, "-0.9999999")
when(toString, [-1,1000]).then(returned, "-0.999999")
when(toString, [-1,10000]).then(returned, "-0.99999")
when(toString, [-1,100000]).then(returned, "-0.9999")
when(toString, [-1,1000000]).then(returned, "-0.999")
when(toString, [-1,10000000]).then(returned, "-0.99")
when(toString, [-1,100000000]).then(returned, "-0.9")
