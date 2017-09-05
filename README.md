# MMM-Domaining-Sedo-TopDomains
Displays a list of current top top domains from Sedo 

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
 {
	module: 'MMM-Domaining-Sedo-Lists',
	position: 'top_right', // This can be any of the regions.
	header: "Sedo.com",
	config: {
		lists: [
			{
				title: "Top Domains (de)",
				url: "https://sedo.com/txt/topdomains_d.txt"
			},
			{
				title: "Verkaufte Domains (de)",
				url: "https://sedo.com/txt/recentlysold_d.txt"
			},
			{
				title: "Domain Auktionen (de)",
				url: "https://sedo.com/txt/auctions_de.txt"
			}
		],
		updateInterval:  1440 * 60 * 1000, // every 24 hours
		slideListInterval: 2000,
		numberOfItemsPerList: 5,
		encoding: "UTF-8" //ISO-8859-1
	}
   }
]
````
