var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

var mkdir = function (directoryPath) {
    fileUtilities.mkdir(new java.io.File(directoryPath))
};

var fileExists = function (filePath) {
    return new java.io.File(filePath).exists();
};

var cat = function(filePath) {
    return Bean("fileUtilities").getFileContent(new java.io.File(filePath));
};

var writeToFile = function(filePath, content) {
    Bean("fileUtilities").writeToFile(new java.io.File(filePath), content);
};

var createTempFile = function (extension) {
    var tmpFile = java.io.File.createTempFile("playonlinux", "." + extension);
    tmpFile.deleteOnExit();
    return tmpFile.getAbsolutePath();
};

var Checksum = function () {
    var that = this;
    that._method = "SHA";
    that._checksumCalculator = Bean("checksumCalculator");
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };
    that.method = function (algorithm) {
        that._method = algorithm;
        return that;
    };
    that.of = function (file) {
        that._file = file;
        return that;
    };
    that.get = function () {
        if(that._wizard) {
            var progressBar = that._wizard.progressBar("Checking file consistency...");
        }

        return that._checksumCalculator.calculate(that._file, that._method, function (progressEntity) {
            if(progressBar) {
                progressBar.accept(progressEntity);
            }
        });
    }
};