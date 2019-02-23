'use strict'
const { when } = require('@spazmodius/gwt')
const { add, subtract, negative } = require('../lib/arith')

when(add, [1, 3], [5, 7])
.then(({returned: output}, [input]) => output !== input)
.then(({returned: [s, ns]}) => s === 1+5)
.then(({returned: [s, ns]}) => ns === 3+7)

when(subtract, [5, 7], [1, 3])
.then(({returned: output}, [input]) => output !== input)
.then(({returned: [s, ns]}) => s === 5-1)
.then(({returned: [s, ns]}) => ns === 7-3)

when(negative, [5, 7])
.then(({returned: output}, [input]) => output !== input)
.then(({returned: [s, ns]}) => s === -5 - 1)
.then(({returned: [s, ns]}) => ns === -7 + 1e9)

when(negative, [5, 0])
.then(({returned: output}, [input]) => output !== input)
.then(({returned: [s, ns]}) => s === -5)
.then(({returned: [s, ns]}) => Object.is(ns, 0))

when(negative, [0, 0])
.then(({returned: output}, [input]) => output !== input)
.then(({returned: [s, ns]}) => Object.is(s, 0))
.then(({returned: [s, ns]}) => Object.is(ns, 0))
