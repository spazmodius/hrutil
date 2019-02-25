'use strict'
const Bench = require('@spazmodius/hrbench')

function test(n) {
	const bench = Bench(`Convert ${n} to string`)
		.test(() => String(n))
		.test(() => n + '')
		.test(() => '' + n)
	if (n != null)
		bench.test(() => n.toString())
}

// test(12)
// test(12.34)
// test(undefined)
// test(null)
// test('string')
// test(false)
test([1,2,3])
test({a:1})
