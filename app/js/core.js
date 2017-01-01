(function(glob) {
	'use strict'

	function logModuleError(moduleName, message) {
		console.log("[ERROR]: <"+moduleName+">: "+message)
	}

	function modelEventCreate(modelName, data, type) {
		return {
			type: modelName.toUpperCase()+"_MODEL_"+type.toUpperCase(),
			data: data
		}
	}

	glob.app = {
		model: {},
		moduleError: logModuleError,
		modelEventCreate: modelEventCreate
	}
})(window);
