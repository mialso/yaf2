(function(app) {
	if (!app) {
		console.log("[ERROR]: user module: app is not defined");
		return;
	}

	let user = {
		inform: function(event) {
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
		},
		addModel: function(model) {
			user.dom[model.name] = {}
			// add ui
			model.ui.forEach((function(user) {
				return function(model_ui) {
					// create ui element
					let domEl = glob.document.createElement(model_ui.type)
					
					if (model_ui.event) {
						domEl.addEventListener(model_ui.event.type, model_ui.event.listener)
					}

					if (model_ui.action) {
						domEl.addEventListener(model_ui.action.prop, model_ui.action.func)
					}

					// set data
					domEl[model_ui.dataProp] = model.data

					/*
					 * get parent
					 * add element to DOM
					 */
					let parent = glob.document.getElementById(model_ui.parent)
					parent.append(domEl)

					// register element to user dom
					let modelOperation = model_ui.event.type.split("_")[2]
					if (!user.dom[model.name][modelOperation]) {
						user.dom[model.name][modelOperation] = {}
					}
					user.dom[model.name][modelOperation][model_ui.id] = {
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
			})(this))

			// register model to user
			this.model[model.name] = {
				name: model.name,
				inform: function(eventType, data) {
					console.log(`user.model.${this.name} event ${eventType} data=${data}`)
					app.model[model.name].data = data
				}
			}
		},
		dom: {
		},
		model: {
		}
	}

	app.user = user
})(window.app)
