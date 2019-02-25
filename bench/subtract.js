'use strict'
const Bench = require('@spazmodius/hrbench')
const { subtract, subtractFrom } = require('..')
const { hrtime } = process

const hr0 = hrtime()
const noop = () => hrtime()

Bench('Subtraction')
	.test(() => hrtime(hr0), noop)
	.test(() => subtract(hrtime(), hr0), noop)
	.test(() => subtractFrom(hrtime(), hr0), noop)
