'use strict'

const constants = {
	MIN_SAFE_INTEGER: [ -9007200, 745259009 ],
	MAX_SAFE_INTEGER: [ 9007199, 254740991 ],

	MIN_SAFE_NUMBER: [-8388608, 0],
	MAX_SAFE_NUMBER: [8388608, 0],

	ONE_SECOND: [1, 0],
	ONE_MILLISECOND: [0, 1000000],
	ONE_NANOSECOND: [0, 1],
}

Object.values(constants).forEach(Object.freeze)

module.exports = constants
