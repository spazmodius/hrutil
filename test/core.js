'use strict'
const given = require('../gwt')

const { _addTo, _subtractFrom } = require('../lib/core')
const { eq } = require('../lib/comp')

function returns_first_argument({ returned, inputs: [ arg0 ]}) {
	return Object.is(returned, arg0)
}

given( [0, 0], 0, 0 )
.when(_addTo)
	.then(returns_first_argument)
	.then(({inputs: [hr]}) => eq(hr, [0, 0]))

given( [3, 5] )
.when(hr => _addTo(hr, 7, 11))
	.then(({returned}) => eq(returned, [10, 16]))

given( [3, .5e9] )
.when(hr => _addTo(hr, 1, .5e9))
	.then(({returned}) => eq(returned, [5, 0]))

given( [3, .5e9 + 1] )
.when(hr => _addTo(hr, 1, .5e9 + 1))
	.then(({returned}) => eq(returned, [5, 2]))

