'use strict'
const colors = require('./colors')
const caching = require('./caching')
const formatArguments = require('./format-arguments')
const formatFunction = require('./format-function')
const { singleRule, doubleRule } = require('./separator')
const { inspect } = require('util')

class Printer {
	constructor() {
		this.passedCount = 0
		this.failedCount = 0
		this.errorCount = 0
		this.warnCount = 0
	}

	startScenario(scenario) {
		if (scenario.tests.length === 0)
			++this.warnCount
		if (scenario.unchecked)
			++this.errorCount
	}

	visitTest(test) {
		if (test.error)
			++this.errorCount
		else if (test.passed)
			++this.passedCount
		else
			++this.failedCount
			
		// if (!test.passed)
			printTest(test)
	}

	endScenario(scenario) {
		if (scenario.tests.length === 0 || scenario.unchecked)
			printScenario(scenario)
	}

	complete() { 
		printSummary(this) 
	}
}

function printTest(test) {
	const description = describeTest(test)
	const outcome = describeOutcome(test)
	const sep = singleRule(description)
	console.log(sep)
	console.log(description)
	console.log(outcome)
}

function printScenario(scenario) {
	const description = describeScenario(scenario)
	const sep = singleRule(description)
	console.log(sep)
	console.log(description)
	if (scenario.tests.length === 0)
		console.log(colors.warning('Warning: scenario has no tests'))
	if (scenario.unchecked)
		console.log(colors.error('Unchecked Error!'), 'threw', inspect(scenario.error))
}

function printSummary(counts) {
	const summary = summarize(counts)
	const sep = doubleRule(summary)
	console.log(sep)
	console.log(summary)
}

const describeTest = caching(
	function describeTest(test) {
		const scenario = describeScenario(test.scenario)
		const expectation = formatFunction(test.expectation)
		return `${scenario}\n Then ${expectation}`
	}
)

const describeScenario = caching(
	function describeScenario(scenario) {
		const inputs = formatArguments(scenario)
		const action = formatFunction(scenario.action)
		return `Given ${inputs.join(' and ')}\n When ${action}`
	}
)

const describeOutcome = caching(
	function describeOutcome(test) {
		if (test.error) 
			return `${colors.error('Error!')} threw ${inspect(test.error)}`
		if (test.passed) 
			return `${colors.passed('Passed.')} returned ${inspect(test.passed)}`
		return `${colors.failed('Failed!')} returned ${inspect(test.passed)}`
	}
)

function summarize({ passedCount, failedCount, errorCount, warnCount }) {
	let summary = colors.bright('Test Summary: '),
		passed = `${passedCount} passed`,
		failed = `${failedCount} failed`,
		errors = `${errorCount} errors`
	
	if (failedCount + errorCount + warnCount === 0)
		passed = colors.passed(passed)
	if (failedCount > 0)
		failed = colors.failed(failed)
	if (errorCount > 0)
		errors = colors.error(errors)
	
	const strings = [summary + passed, failed, errors]

	if (warnCount > 0)
		strings.push(colors.warning(`${warnCount} warnings`))

	return strings.join(', ')
}

module.exports = Printer
