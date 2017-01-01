(function(app) {
	'use strict'
	let moduleName = "ui"
	if (!app) {
		console.log("[ERROR]: <ui>: app is not defined, exiting...");
		return;
	}
	if (!document) {
		app.moduleError(moduleName, "no global document provided, exiting...")
		return;
	}

	function initUI(modelConfig, modelData) {
		let domEl = document.createElement(modelConfig.type)
		
		if (modelConfig.event) {
			domEl.addEventListener(modelConfig.event.type, modelConfig.event.listener, true)
		}

		if (modelConfig.action) {
			domEl.addEventListener(modelConfig.action.prop, modelConfig.action.func)
		}

		// set data
		domEl[modelConfig.dataProp] = modelData

		/*
		 * get parent
		 * add element to DOM
		 */
		let parent = document.getElementById(modelConfig.parent)
		parent.append(domEl)

		return domEl
	}

	app.ui = {
		initModelUI: initUI
	}
})(window.app);
