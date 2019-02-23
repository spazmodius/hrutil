'use strict'
const { floor } = Math

function toMs(hr) {
	return hr[0] * 1e3 + hr[1] / 1e6
}

function fromMs(ms) {
	const s = floor(ms / 1000), ns = floor((ms - s*1000 + 0.5e-6) * 1e6) |0
	return [s, ns]
}

module.exports = {
	fromMs,
	toMs,
}
