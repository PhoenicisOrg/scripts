var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

var mkdir = function (directoryPath) {
    fileUtilities.mkdir(new java.io.File(directoryPath))
};

var fileExists = function (filePath) {
    return new java.io.File(filePath).exists();
};

var createTempFile = function (extension) {
    return java.io.File.createTempFile("playonlinux", "." + extension).getAbsolutePath();
};

var Checksum = function () {
    var algorithm = "SHA";
    var checksumCalculator = Bean("checksumCalculator");
    var that = this;

    return {
        "wizard": function (wizard) {
            that.wizard = wizard;
            return this;
        },
        "method": function (algorithm) {
            that.algorithm = algorithm;
            return this;
        },
        "of": function (file) {
            that.file = file;
            return this;
        },
        "get": function () {
            var progressBar = that.wizard.progressBar("Checking file consistency...");

            return checksumCalculator.calculate(that.file, algorithm, function (progressEntity) {
                progressBar.accept(progressEntity);
            });
        }
    }
};