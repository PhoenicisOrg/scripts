var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

var mkdir = function(directoryPath) {
	fileUtilities.mkdir(new java.io.File(directoryPath))
}

var fileExists = function(filePath) {
	return new java.io.File(filePath).exists();
}