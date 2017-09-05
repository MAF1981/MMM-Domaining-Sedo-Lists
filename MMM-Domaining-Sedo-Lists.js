Module.register("MMM-Domaining-Sedo-Lists",{
	
    // Default module config
    defaults: {
        lists: [ {
			title: "Top Domains (de)",
			url: "https://sedo.com/txt/topdomains_d.txt"
		}],
		//updateInterval:  5 * 60 * 1000, // every 5 minutes
		updateInterval:  1000,
		slideListInterval: 1000,
		animationSpeed: 2.5 * 1000,
		numberOfItemsPerList: 5,
		encoding: "UTF-8" //ISO-8859-1
    },
	
    // Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "domaining-sedo-box-outter";
		if (this.activeItem >= this.listItems.length) {
			this.activeItem = 0;
		}
		
		var x = "";		
		if (this.listItems.length > 0) {
			var content = "LOADING...";
			
			if(this.listItems[this.activeItem].error != null && this.listItems[this.activeItem].resonseCode != 200){
				content = this.listItems[this.activeItem].error;
			}else {
				content = this.listItems[this.activeItem].content;
			}
		
			var lines = content.split("\n");
			for(row=0; row<=this.config.numberOfItemsPerList; row++){
				wrapper.appendChild(this.processRow(lines[row]));
			}
		}
		return wrapper;
	},
	
	processRow: function(row) {
		var divRow = document.createElement("div");
		divRow.className = "domaining-sedo-row";
		var items = row.split("~");
		//check for ; to get auctioning stuff
		divRow.innerHTML = items[0] + " (" + items[1] + ")";
		return divRow;
	},
	
	/* getHeader()
	 * Set the header of the module based on the global parameter and the current
	 * list title (even specified in the list configuration as 'title')
	 */
	getHeader: function() {
		var titleAppendix = " ...Loading...";
		if (this.listItems.length > 0 
			&& this.listItems[this.activeItem] != null 
				&& this.listItems[this.activeItem].list != null 
					&& this.listItems[this.activeItem].list.title.length > 0)
		{
			titleAppendix = ": " + this.listItems[this.activeItem].list.title
		}
		return this.data.header + titleAppendix;
	}, 

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		moment.locale(config.language);
		this.listItems = [];
		this.loaded = false;
		this.activeItem = 0;
		this.listCount = 0;
		this.registerLists();		
	},
	
	registerLists: function() { 
		for (var l in this.config.lists) {
			var list = this.config.lists[l];
			this.sendSocketNotification("ADD_LIST", {
				list: list,
				config: this.config
			});
		}
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == "LIST_ITEMS") {
			this.listItems.push(payload);
			if (!this.loaded) {
				this.scheduleUpdateInterval();
			}
			this.loaded = true;
		}
	},

	/* scheduleUpdateInterval()
	 * Schedule visual update.
	 */
	scheduleUpdateInterval: function() {
		var self = this;
		self.updateDom(self.config.animationSpeed);
		setInterval(function() {
			self.activeItem++;
			self.updateDom(self.config.animationSpeed);
		}, this.config.updateInterval);
	},
	
	// Define required scripts.
	getStyles: function() {
		return ["MMM-Domaining-Sedo-Lists.css"];
	},
	
	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},
	
	// Define required translations.
	getTranslations: function() {
		return false;
	}
});