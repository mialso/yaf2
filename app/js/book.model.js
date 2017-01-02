;(function(app) {
	'use strict'
	var moduleName = "book"
	if (!app) {
		console.log("[ERROR]: <book>: app.model is not defined, exiting...");
		return;
	}
	var dataScheme = {
		title: "string",
		pages: "number"
	}
	var ui = {
		showTitle: function(data) {
			return `<p>${data}</p>`
		},
		showPages: function(data) {
			return `<p>${data}</p>`
		}
	}

	function dataChangeHandler(event) {
		switch(event.data) {
			case dataScheme.title:
				break
			case dataScheme.pages:
				break
			default:
				break
		}
	}

	var bookModel = {
		name: "book",
		dataScheme: dataScheme,
		ui: ui,
		dataChangeHandler: dataChangeHandler
	}

	app.inform(app.event.newModel, bookModel)

})(window.app);
