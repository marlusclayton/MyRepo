if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

var app = {
	initialize : function() {
		this.bindEvents();
	},

	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, false);
	},

	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},

	receivedEvent : function(id) {
		console.log('Received Event: ' + id);

		var scroller = "appEl";

		// myScroll = new iScroll(scroller, { hScroll: true, vScroll: false});

		navigator.globalization.getLocaleName(function(locale) {
			console.log(JSON.stringify(locale));
			var language = locale.value.replace(/(\w{2})_(.{2})/, "$1");

			var strings = "res/strings/{0}.json".format(language);
			console.log("reading: {0}".format(strings));

			$.ajax({
				url : strings,
				dataType : "json"
			}).done(function(json) {
				console.log(JSON.stringify(json));

				$("h1").text(json.title);
				$(receivedElement).text(json.ready);
			}).error(function(e) {
				console.log(JSON.stringify(e));
			});

			// $(parentElement).slideDown(2000);
		}, function(e) {
			console.log(JSON.stringify(e));
			alert('Error getting language\n');
		});
	}
};
