'use strict'
const Bench = require('@spazmodius/hrbench')
const { add, addTo } = require('..')
const { hrtime } = process

const b = [1234, 500000000]
const noop = () => hrtime()

Bench('Addition')
	.test(() => add(hrtime(), b), noop)
	.test(() => addTo(hrtime(), b), noop)
	.go()
