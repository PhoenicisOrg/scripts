include(["Functions", "Filesystem", "Files"]) 

var PropertyReader = Bean("propertyReader")
var wineWebServiceUrl = PropertyReader.getProperty("webservice.wine.url");
var wineEnginesDirectory = PropertyReader.getProperty("application.user.engines.wine");

var WineManager = function() {	
	return {
		"wizard" : function(wizard) {
			this.wizard = wizard;
			return this;
		},
		"install" : function(distribution, version) {
			var localDirectory = wineEnginesDirectory + "/" + distribution + "/" + version;
			
			if(!fileExists(localDirectory)) {
				this.wizard.message("I will install wine " + version)
				this.wizard.message(wineWebServiceUrl)
			}
		}
	}
}