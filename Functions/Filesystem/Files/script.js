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

var Checksum = {
    _method: "SHA",
    _checksumCalculator: Bean("checksumCalculator"),
    wizard: function (wizard) {
        this._wizard = wizard;
        return this;
    },
    method: function (algorithm) {
        this._method = algorithm;
        return this;
    },
    of: function (file) {
        this._file = file;
        return this;
    },
    get: function () {
        var progressBar = this._wizard.progressBar("Checking file consistency...");

        return this._checksumCalculator.calculate(this._file, this._method, function (progressEntity) {
            progressBar.accept(progressEntity);
        });
    }
};