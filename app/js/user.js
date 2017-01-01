(function(app) {
	'use strict'
	if (!app) {
		console.log("[ERROR]: user module: app is not defined");
		return;
	}

	function inform(event) {
		console.log(`${event.type} event received, data: ${event.data}`)
		let eventData = event.type.split("_")
		let modelName = eventData[0].toLowerCase();
		let eventSource = eventData[1]
		let operation = eventData[2]
		console.log(`model name ${modelName}`)

		switch (eventSource) {
			case "UI":
				console.log("UI case")
				this.model[modelName].inform(event.type, event.data)
				break
			case "MODEL":
				console.log("MODEL case:")
				//Object.keys(this.dom[modelName]).forEach(function(ui) {
				for(let ui in this.dom[modelName][operation]) {
					this.dom[modelName][operation][ui].inform(event.type, event.data)
				}
				break
			default:
				console.log("DEFAULT case")
				break
		}
	}
	function addModel(model) {
		app.model[model.name] = model
		this.dom[model.name] = {}
		// add ui
		model.ui.forEach((function(dom) {
			return function(model_ui) {
				// create ui element
				let domEl = app.ui.initModelUI(model_ui, model.data)
				// register element to user dom
				let modelOperation = model_ui.event.type.split("_")[2]
				if (!dom[model.name][modelOperation]) {
					dom[model.name][modelOperation] = {}
				}
				dom[model.name][modelOperation][model_ui.id] = {
					data: model.data,
					inform: (function(elem) {
						return function(eventType, data) {
							console.log(`dom ${model.name} inform: ${eventType}, ${data}`)
							console.log("%o", elem)
							elem.dispatchEvent(new CustomEvent(eventType, { 'detail': data }))
						}
					})(domEl)
				}

			}
		})(this.dom))

		// register model to user
		this.model[model.name] = {
			name: model.name,
			inform: function(eventType, data) {
				console.log(`user.model.${this.name} event ${eventType} data=${data}`)
				app.model[model.name].data = data
			}
		}
	}

	app.user = {
		inform: inform,
		addModel: addModel,
		dom: {},
		model: {}
	}
})(window.app);
