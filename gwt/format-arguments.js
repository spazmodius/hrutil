'use strict'
const caching = require('./caching')
const formatInputs = require('./format-inputs')
const getParameters = require('./getParameters')

function formatArguments({ inputs, action }) {
	return [..._formatArguments(formatInputs(inputs), getParameters(action))]
}

function* _formatArguments(args, params) {
	let i = 0
	while (i < params.length) {
		const input = args[i], parameter = params[i]
		const value = parameter.rest ? '[' + args.slice(i).join(', ') + ']'
			: input === undefined || input === 'undefined' && parameter.default ? parameter.default
			: input
		yield `${parameter.name} = ${value}`
		++i
	}
	while (i < args.length)
		yield args[i++]
}

module.exports = caching(formatArguments)
