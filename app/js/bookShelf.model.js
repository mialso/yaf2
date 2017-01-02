(function(app) {
	'use strict'
	let moduleName = "bookShelf"
	if (!app) {
		console.log("[ERROR]: <bookShelf>: app is not defined, exiting...");
		return;
	}

	let dataScheme = {
		shelves: "number",
		booksPerShelf: "number"
	}

	let ui = {
		showBookShelf: function(books) {
			return `
				<div>
					<p>Book Shelf</p>
					<div>${books}</div>
				</div>`
		}
	}

	function bookChangeHandler(event) {
		switch(event) {
			default:
				break
		}
	}

	var bookShelfModel = {
		name: "bookShelf",
		dataScheme: dataScheme,
		ui: ui,
		bookChangeHandler: bookChangeHandler
	}

	app.inform(app.event.newModel, bookShelfModel)

})(window.app);
