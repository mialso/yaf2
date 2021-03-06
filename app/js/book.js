(function(app) {
	'use strict'
	let moduleName = "book"
	if (!app || !app.model) {
		console.log("[ERROR]: <book>: app.model is not defined, exiting...");
		return;
	}

	let bookModel = {
		name: "book",
		set data(some_data) {
			this._data = some_data
			app.user.inform(app.modelEventCreate(this.name, some_data, "update"))
		},
		get data() {
			if (!this._data) {
				return this.initialData
			}
			return this._data
		},
		initialData: "initial data",
		ui: [
			{
				id: "model_el",
				type: "p",
				dataProp: "innerText",
				parent: "app",
				event: {
					type: "BOOK_MODEL_UPDATE",
					listener: function(event) {
						console.log("model.ui.p.eventListener run")
						this.innerText = event.detail
					}
				}
			},
			{
				id: "model_input",
				type: "input",
				dataProp: "placeholder",
				parent: "app",
				event: {
					type: "BOOK_MODEL_UPDATE",
					listener: function(event) {
						console.log("model.ui.input.eventListener run")
						this.placeholder = event.detail
						this.value = null
					}
				},
				action: {
					prop: "change",
					func: (function(user) {
						return function(event) {
							console.log("action: "+event.target.value)
							user.inform({type: "BOOK_UI_UPDATE", data: event.target.value})
						}
					})(app.user)
				}
			}
		]
	}
	app.model.initModel(bookModel)

	window.setTimeout(function() {
		bookModel.data = "new Data"
	}, 2000)
})(window.app);
