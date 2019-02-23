'use strict'
const { when } = require('@spazmodius/gwt')
const { eq, lt, lte, gt, gte } = require('../lib/comp')

function is({returned}, _, value) {
	return Object.is(returned, value)
}

const equal = { eq: true, lt: false, lte: true, gt: false, gte: true }
const greater = { eq: false, lt: false, lte: false, gt: true, gte: true }
const lesser = { eq: false, lt: true, lte: true, gt: false, gte: false }

const cases = [
	[ [0,0], [0,0], equal ],
	[ [10,0], [10,0], equal ],
	[ [-10,0], [-10,0], equal ],
	[ [0,9], [0,9], equal ],
	[ [10,9], [10,9], equal ],
	[ [-10,9], [-10,9], equal ],

	[ [0,1], [0,0], greater ],
	[ [0,0], [0,1], lesser ],
	[ [10,0], [9,0], greater ],
	[ [10,0], [11,0], lesser ],
	[ [-1,1e9-1], [0,0], lesser ],
	[ [0,0], [-1,1e9-1], greater ],
	[ [-10,0], [-9,0], lesser ],
	[ [-10,0], [-11,0], greater ],
]

cases.forEach(
	([a, b, expected]) => {
		when(eq, a, b).then(is, expected.eq)
		when(lt, a, b).then(is, expected.lt)
		when(lte, a, b).then(is, expected.lte)
		when(gt, a, b).then(is, expected.gt)
		when(gte, a, b).then(is, expected.gte)
	}
)
