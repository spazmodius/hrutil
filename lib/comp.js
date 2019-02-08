'use strict'

function eq(ha, hb) {
	return ha[1] === hb[1] && ha[0] === hb[0]
}

function lt(ha, hb) {
	return ha[0] < hb[0] || (ha[0] === hb[0] && ha[1] < hb[1])
}

function lte(ha, hb) {
	return ha[0] < hb[0] || (ha[0] === hb[0] && ha[1] <= hb[1])
}

function gt(ha, hb) {
	return ha[0] > hb[0] || (ha[0] === hb[0] && ha[1] > hb[1])
}

function gte(ha, hb) {
	return ha[0] > hb[0] || (ha[0] === hb[0] && ha[1] >= hb[1])
}

module.exports = {
	eq,
	lt,
	lte,
	gt,
	gte,
}
