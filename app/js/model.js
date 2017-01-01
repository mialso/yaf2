(function(app) {
	'use strict'
	if (!app) {
		console.log("[ERROR]: model module: app is not defined");
		return;
	}
	function initModel(modelData) {
		console.log("model.initModel: "+modelData.name)
		this.models[modelData.name] = modelData
		Object.defineProperty(this, modelData.name, {
			get: function() {
				return this.models[modelData.name]
			},
			set: function(configObject) {
				this.models[modelData.name]
			}
		})
	}

	app.model = {
		initModel: initModel,
		models: {}
	}
})(window.app);
