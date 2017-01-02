(function(glob) {
	'use strict'
	if (!glob || !glob.document) {
		return
	}

	var event = {
		newModel: "NEW_MODEL"
	}

	function inform(eventName, data) {
		switch(eventName) {
			case event.newModel:
				this.model[data.name] = data
				break
			default:
				this.log("core", "uknown event: "+eventName);
				break
		}
	}

	function log(moduleName, message) {
		console.log("[ERROR]: <"+moduleName+">: "+message)
	}

	let app = {
		log: log,
		inform: inform,
		event: event,
		model: {},
		storage: {}
	}

	let process = "start up"
	Object.defineProperty(app, "process", {
		get: function() {
			console.log("process getter")
			return process
		},
		set: function(name) {
			console.log("process setter")
			process = name
		}
	})

	glob.app = app
	app.process = "start up"

	glob.document.addEventListener("DOMContentLoaded", function() {
		glob.app.process = "create ui"
	})
})(window);
