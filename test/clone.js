'use strict'
const given = require('@spazmodius/gwt')
const clone = require('../lib/clone')

given([99, 101])
.when(clone)
.then(({returned: output}, [input]) => output !== input)
.then(({returned: output}, [input]) => output.length === 2)
.then(({returned: output}, [input]) => output[0] === input[0])
.then(({returned: output}, [input]) => output[1] === input[1])