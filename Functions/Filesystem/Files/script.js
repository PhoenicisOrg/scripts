var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

var mkdir = function(directoryPath) {
	fileUtilities.mkdir(new java.io.File(directoryPath))
}

var fileExists = function(filePath) {
	return new java.io.File(filePath).exists();
}

var createTempFile = function(extension) {
	return java.io.File.createTempFile("playonlinux", "." + extension).getAbsolutePath();
}

var Checksum = function() {	
	var algorithm = "SHA";
	var checksumCalculator = Bean("checksumCalculator");
	
	return {
		"wizard" : function(wizard) {
			this.wizard = wizard;
			return this;
		},
		"method" : function(algorithm) {
			algorithm = algorithm;
			return this;
		},
		"of" : function(file) {
			this.file = file;
			return this;
		},
		"get" : function() {
			var progressBar = this.wizard.progressBar("Checking file consistency...")
			
			return checksumCalculator.calculate(this.file, algorithm, function(progressEntity) { 
				progressBar.accept(progressEntity);
			});
		}
	}
}