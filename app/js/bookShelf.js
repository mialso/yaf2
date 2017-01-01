(function(app) {
	'use strict'
	let moduleName = "book"
	if (!app) {
		console.log("[ERROR]: <book>: app is not defined, exiting...");
		return;
	}
	if (!app.user) {
		app.moduleError(moduleName, "no user exists, exiting...")
		return;
	}
	let bookShelfModel = {
		name: "bookShelf"
	}


})(window.app);
