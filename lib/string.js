'use strict'

const { negative } = require('./arith')

function toString(hr) {
	if (hr[1] === 0)
		return hr[0] + ''
	if (hr[0] < 0)
		return '-' + __toString(...negative(hr))
	return __toString(hr[0], hr[1])
}

function __toString(s, ns) {
	let dec = ns = '00000000' + ns, i = ns.length
	while (dec.charAt(i - 1) === '0')
		--i;
	return s + '.' + dec.slice(-9, i)
}

module.exports = {
	toString,
}
