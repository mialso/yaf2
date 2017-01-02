'use strict'
let fs = require('fs')
let path = require('path')
const vm = require('vm')

module.exports = function(mockContext, scriptPath) {

	const testModule = fs.readFileSync(path.resolve(scriptPath))
	const script = new vm.Script(testModule.toString())
	const context = new vm.createContext(mockContext)
	
	return { script: script, context: context }
}
