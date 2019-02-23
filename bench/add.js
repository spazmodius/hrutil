'use strict'
const Bench = require('@spazmodius/hrbench')
const { add, addTo } = require('..')
const { hrtime } = process

const b = [13, 5e8 - 7]
const noop = () => hrtime()

Bench('Addition')
	.test(() => add(hrtime(), b), noop)
	.test(() => addTo(hrtime(), b), noop)
