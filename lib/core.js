'use strict'

function _addTo(hr, s, ns) {
	hr[0] += s
	hr[1] += ns
	if (hr[1] >= 1e9) {
		hr[0] += 1
		hr[1] -= 1e9
	}
	return hr
}

function _subtractFrom(hr, s, ns) {
	hr[0] -= s
	hr[1] -= ns
	if (hr[1] < 0) {
		hr[0] -= 1
		hr[1] += 1e9
	}
	return hr
}

module.exports = {
	_addTo,
	_subtractFrom,
}
