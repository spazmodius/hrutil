'use strict'
const Bench = require('@spazmodius/hrbench')

function test(n) {
	Bench(`Convert ${n} to string`)
		.test(() => n.toString())
		.test(() => n + '')
		.test(() => '' + n)
		.test(() => String(n))
		.go()
}

test(Number.EPSILON)
// test(Number.MAX_SAFE_INTEGER)
// test(Number.MIN_SAFE_INTEGER)
// test(Number.MAX_VALUE)
// test(Number.MIN_VALUE)
// test(Infinity)
// test(-Infinity)
// test(0)
// test(1.1)
// test(-2.1)
// test(3000000000.1)
// test(-3000000000.1)
