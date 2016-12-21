include(["Functions", "Filesystem", "Files"]) 
include(["Functions", "Filesystem", "Extract"]) 
include(["Functions", "Net", "Download"]) 

var Wine = function() {
	var PropertyReader = Bean("propertyReader");
	var ArchitectureFetcher = Bean("architectureFetcher");
	var OperatingSystemFetcher = Bean("operatingSystemFetcher");

	var wineWebServiceUrl = PropertyReader.getProperty("webservice.wine.url");
	var wineEnginesDirectory = PropertyReader.getProperty("application.user.engines.wine");
	var architecture = ArchitectureFetcher.fetchCurrentArchitecture();
	var distribution = "staging";
	
	var fetchFullDistributionName = function() {
		var operatingSystem = OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
		
		return distribution + "-" + operatingSystem + "-" + architecture.getNameForWinePackages();
	};
	
	var installWinePackage = function(setupWizard, winePackage, localDirectory) {
		var tmpFile = createTempFile("tar.gz"); 
		
		Downloader()
			.wizard(setupWizard)
			.url(winePackage.url)
			.checksum(winePackage.sha1sum)
			.to(tmpFile)
			.get();
			
		Extractor()
			.wizard(setupWizard)
			.archive(tmpFile)
			.to(localDirectory)
			.extract();
	};
	
	return {
		"wizard" : function(wizard) {
			this.wizard = wizard;
			return this;
		},
		"architecture" : function(architecture) {
			architecture = architecture;
			return this;
		},		
		
		"distribution" : function(distribution) {
			distribution = distribution
			return this;
		},		
		
		"prefix" : function(prefix) {
			this.prefix = prefix;
			return this;
		},
		
		"create" : function() {
			return this;
		},
		"run" : function() {
			return this;
		},
		"version" : function(version) {
			var fullDistributionName = fetchFullDistributionName();

			var localDirectory = wineEnginesDirectory + "/" + fullDistributionName + "/" + version;
			var wizard = this.wizard; 
			
			if(!fileExists(localDirectory)) {
				var wineJson = JSON.parse(Downloader()
					.wizard(this.wizard)
					.url(wineWebServiceUrl)
					.get()) 
				
				wineJson.forEach(function(distribution) {
					if(distribution.name == fullDistributionName) {
						distribution.packages.forEach(function(winePackage) {
							if(winePackage.version == version) {
								installWinePackage(wizard, winePackage, localDirectory)
							}
						});
					}
				});
			
			}
			
			
			return this;
		}
	}
}