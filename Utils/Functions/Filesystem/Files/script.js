var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/* exported mkdir */
var mkdir = function (directoryPath) {
    fileUtilities.mkdir(new java.io.File(directoryPath))
};

/* exported fileExists */
var fileExists = function (filePath) {
    return new java.io.File(filePath).exists();
};

/* exported cat */
var cat = function(filePath) {
    return Bean("fileUtilities").getFileContent(new java.io.File(filePath));
};

/* exported cp */
var cp = function(source, target) {
    return Bean("fileUtilities").copy(new java.io.File(source), new java.io.File(target));
};

/* exported getFileSize */
var getFileSize = function(filePath) {
    return Bean("fileUtilities").getSize(new java.io.File(filePath));
};

/* exported fileName */
var fileName = function(filePath) {
    return new java.io.File(filePath).getName();
};

/* exported lns */
var lns = function(target, destination) {
    return Bean("fileUtilities").createSymbolicLink(new java.io.File(destination), new java.io.File(target));
};

/* exported remove */
var remove = function(filePath) {
    return Bean("fileUtilities").remove(new java.io.File(filePath));
};

/* exported touch */
var touch = function(filePath) {
    if (!fileExists(filePath)) {
        Bean("fileUtilities").writeToFile(new java.io.File(filePath), "");
    }
};

/* exported writeToFile */
var writeToFile = function(filePath, content) {
    Bean("fileUtilities").writeToFile(new java.io.File(filePath), content);
};

/* exported createTempFile */
var createTempFile = function (extension) {
    var tmpFile = Bean("fileUtilities").createTmpFile(extension);
    return tmpFile.getAbsolutePath();
};

/**
* Checksum prototype
* @constructor
*/
function Checksum() {
    this._method = "SHA";
    this._checksumCalculator = Bean("checksumCalculator");
}

/**
* sets wizard
* @param {SetupWizard} wizard setup wizard
* @returns {Checksum} Checksum object
*/
Checksum.prototype.wizard = function (wizard) {
    this._wizard = wizard;
    return this;
}

/**
* sets checksum algorithm
* @param {string} algorithm algorithm (e.g. "SHA")
* @returns {Checksum} Checksum object
*/
Checksum.prototype.method = function (algorithm) {
    this._method = algorithm;
    return this;
}

/**
* sets file for which the checksum shall be computed
* @param {string} file file for which the checksum shall be computed
* @returns {Checksum} Checksum object
*/
Checksum.prototype.of = function (file) {
    this._file = file;
    return this;
}

/**
* returns calculated checksum
* @returns {string} calculated checksum
*/
Checksum.prototype.get = function () {
    if(this._wizard) {
        var progressBar = this._wizard.progressBar(tr("Checking file consistency ..."));
    }

    return this._checksumCalculator.calculate(this._file, this._method, function (progressEntity) {
        if(progressBar) {
            progressBar.accept(progressEntity);
        }
    });
}