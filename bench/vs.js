'use strict'
const Bench = require('@spazmodius/hrbench')
const { hrtime } = process
const bigtime = hrtime.bigint
const { now } = Date

const hr0 = hrtime()
const big0 = bigtime()
const now0 = now()

Bench('get current time')
	.test(() => hrtime())
	.test(() => bigtime())
	.test(() => now())

Bench('get elapsed time')
	.test(() => hrtime(hr0))
	.test(() => bigtime() - big0)
	.test(() => now() - now0)
