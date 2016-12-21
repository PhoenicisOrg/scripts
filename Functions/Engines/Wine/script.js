include(["Functions", "Filesystem", "Files"]) 
include(["Functions", "Filesystem", "Extract"]) 
include(["Functions", "Net", "Download"]) 

var Wine = function() {
	var that = this;
	var PropertyReader = Bean("propertyReader");
	var ArchitectureFetcher = Bean("architectureFetcher");
	var OperatingSystemFetcher = Bean("operatingSystemFetcher");

	var wineWebServiceUrl = PropertyReader.getProperty("webservice.wine.url");
	var wineEnginesDirectory = PropertyReader.getProperty("application.user.engines.wine");
	var winePrefixesDirectory = PropertyReader.getProperty("application.user.wineprefix");

	that.architecture = ArchitectureFetcher.fetchCurrentArchitecture();
	that.distribution = "staging";
	that.version = null;
	
	var fetchLocalDirectory = function() {
		return wineEnginesDirectory + "/" + fetchFullDistributionName() + "/" + that.version;
	};
	
	var fetchFullDistributionName = function() {
		var operatingSystem = OperatingSystemFetcher.fetchCurrentOperationSystem().getWinePackage();
		return that.distribution + "-" + operatingSystem + "-" + that.architecture.getNameForWinePackages();
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
			that.wizard = wizard;
			return this;
		},
		"architecture" : function(architecture) {
			that.architecture = architecture;
			return this;
		},		
		
		"distribution" : function(distribution) {
			that.distribution = distribution
			return this;
		},		
		
		"prefix" : function(prefix) {
			that.prefix = prefix;
			return this;
		},
		
		"workingDirectory": function(directory) {
			that.directory = directory;
			return this;
		},
		
		"run" : function(executable, args) {
			that.wizard.wait("Please wait...");
			
			var prefixDirectory = winePrefixesDirectory + "/" + prefix;
			var wineBinary = fetchLocalDirectory() + "/bin/wine";
			var processBuilder = new java.lang.ProcessBuilder(Java.to([wineBinary, executable].concat(args), "java.lang.String[]"));
			
			if(that.directory) {
				processBuilder.directory(directory);
			}
			
			processBuilder.environment().put("WINEPREFIX", prefixDirectory);
			processBuilder.start().waitFor();
			
			return this;
		},
		
		"version" : function(version) {
			that.version = version;
			var fullDistributionName = fetchFullDistributionName();

			var localDirectory = fetchLocalDirectory();
			
			if(!fileExists(localDirectory)) {
				var wineJson = JSON.parse(Downloader()
					.wizard(that.wizard)
					.url(wineWebServiceUrl)
					.get()) 
				
				wineJson.forEach(function(distribution) {
					if(distribution.name == fullDistributionName) {
						distribution.packages.forEach(function(winePackage) {
							if(winePackage.version == version) {
								installWinePackage(that.wizard, winePackage, localDirectory)
							}
						});
					}
				});
			
			}
			
			
			return this;
		}
	}
}