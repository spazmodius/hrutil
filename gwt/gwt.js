'use strict'
const Printer = require('./printer')
const formatInputs = require('./format-inputs')

process.on('exit', () => processResults(new Printer))

function processResults(visitor) {
	visitor.start && visitor.start()
	for (const scenario of scenarios) {
		visitor.startScenario && visitor.startScenario(scenario)
		for (const test of scenario.tests)
			visitor.visitTest && visitor.visitTest(test)
		visitor.endScenario && visitor.endScenario(scenario)
	}
	visitor.complete && visitor.complete()
}

const scenarios = []

function given(...inputs) {
	return { when: _when(inputs) }
}

function _when(inputs) {
	return function when(action) {
		const scenario = {
			inputs,
			action,
			tests: [],
		}
		// capture original state before the action can mutate it
		formatInputs(scenario.inputs)
		scenarios.push(scenario)

		try {
			scenario.returned = action(...inputs)
		}
		catch (error) {
			let unchecked = true
			Object.defineProperties(scenario, {
				returned: { 
					get: () => { 
						unchecked = false
						throw error 
					},
					enumerable: true, 
				},
				threw: { 
					get: () => {
						unchecked = false
						return error
					},
					enumerable: true, 
				},
				unchecked: { get() { return unchecked } },
				error: { get() { return error }},
			})
		}

		return { then: _then(scenario) }
	}
}

function _then(scenario) {
	return function then(expectation) {
		const test = {
			scenario,
			expectation,
		}
		scenario.tests.push(test)

		try {
			test.passed = expectation(scenario)
		}
		catch(error) {
			test.error = error
		}
		return { then: _then(scenario) }
	}
}

module.exports = given
