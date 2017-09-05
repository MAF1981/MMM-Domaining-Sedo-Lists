var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
  
	start: function() {
		console.log("Starting node helper: " + this.name);
	},
	
	/* socketNotificationReceived()
	 * Receives the socket notification sent by the JS file and evaluates
	 * the notification action
	 */
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if(notification === "ADD_LIST") {
			this.getContentFromSedo(payload.list, payload.config);
			return;
		}
	},
	
	/* getContentFromSedo()
	 * Return the content of the URL from Sedo by using "request" and broadcast the
	 * result.
	 */
	getContentFromSedo: function(sedoList, config) {
		var self = this;
		request(sedoList.url, function (error, response, data) {
			self.broadcastList(sedoList, data, error, response.statusCode);		  
		});
	},

	/* broadcastList()
	 * Creates an object with all items of the different registered lists from Sedo,
	 * and broadcasts these using sendSocketNotification. The result will be enhanced
	 * with some additional parameter from the request (like error 
	 * description - if any - or responseCode.
	 */
	broadcastList: function(sedoList, content, errorDescription, responseCode) {
		var result = {
			'error' : errorDescription,
			'responseCode' : responseCode,
			'list': sedoList,
			'content': content
		};
		this.sendSocketNotification("LIST_ITEMS", result);
	}
});