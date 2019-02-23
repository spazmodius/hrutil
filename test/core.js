'use strict'
const { when } = require('@spazmodius/gwt')
const { _addTo, _subtractFrom } = require('../lib/core')

when('adding any values', _addTo, [1, 2], 3, 4)
.then('returns augend', ({returned}, [hr]) => Object.is(returned, hr))
.then('mutates augend', (_, [hr]) => hr[0] !== 1 || hr[1] !== 2)

when('adding small values', _addTo, [3, 5], 7, 11)
.then('seconds are summed', ({ returned: [s, ns] }) => s === 3+7)
.then('nanoseconds are summed', ({ returned: [s, ns] }) => ns === 5+11)

when('adding half-seconds', _addTo, [0, .5e9], 0, .5e9)
.then('nanoseconds overflow', ({ returned: [s, ns] }) => ns === 0)
.then('seconds are carried', ({ returned: [s, ns] }) => s === 0 + 1)

when('adding more than half-seconds', _addTo, [1, .5e9+1], 1, .5e9+1)
.then('nanoseconds overflow', ({ returned: [s, ns] }) => ns === 2)
.then('seconds are carried', ({ returned: [s, ns] }) => s === 1+1 + 1)

when('adding positive and negative values', _addTo, [1, 2], -3, 4)
.then('nanoseconds are summed', ({ returned: [s, ns] }) => ns === 2+4)
.then('seconds are summed', ({ returned: [s, ns] }) => s === 1-3)

when('adding negative and positive values', _addTo, [-1, 2], 3, 4)
.then('nanoseconds are summed', ({ returned: [s, ns] }) => ns === 2+4)
.then('seconds are summed', ({ returned: [s, ns] }) => s === -1+3)

when('adding negative values', _addTo, [-1, 2], -3, 4)
.then('nanoseconds are summed', ({ returned: [s, ns] }) => ns === 2+4)
.then('seconds are summed', ({ returned: [s, ns] }) => s === -1-3)

when('subtracting any values', _subtractFrom, [1, 2], 3, 4)
.then('returns minuend', ({returned}, [hr]) => Object.is(returned, hr))
.then('mutates minuend', (_, [hr]) => hr[0] !== 1 || hr[1] !== 2)

when('subtracting lesser values', _subtractFrom, [13, 15], 7, 11)
.then('seconds are differenced', ({ returned: [s, ns] }) => s === 13-7)
.then('nanoseconds are differenced', ({ returned: [s, ns] }) => ns === 15-11)

when('subtracting greater values', _subtractFrom, [3, 5], 7, 11)
.then('nanoseconds underflow', ({ returned: [s, ns] }) => ns === 5-11 + 1e9)
.then('seconds are borrowed', ({ returned: [s, ns] }) => s === 3-7 - 1)
