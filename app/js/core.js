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
		moduleError: logModuleError,
		modelEventCreate: modelEventCreate
	}
	glob.onload = function() {
		console.log("window on load")
	}
	glob.document.addEventListener("DOMContentLoaded", function() {
		console.log("document onDOMContentLoaded")
		for(let model in glob.app.model) {
			if (glob.app.model[model] instanceof Function) {
				return
			}
			console.log("passing model "+model)
			glob.app.user.addModel(glob.app.model[model])
		}
	})
})(window);
