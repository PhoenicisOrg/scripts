var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/**
* creates directory
* @param {string} directoryPath directory path
* @returns {void}
*/
function mkdir(directoryPath) { // eslint-disable-line no-unused-vars
    fileUtilities.mkdir(new java.io.File(directoryPath))
}

/**
* check if file exists
* @param {string} filePath file path
* @returns {boolean} true if file exists
*/
function fileExists(filePath) { // eslint-disable-line no-unused-vars
    return new java.io.File(filePath).exists();
}

/**
* returns file content
* @param {string} filePath file path
* @returns {string} content
*/
function cat(filePath) { // eslint-disable-line no-unused-vars
    return Bean("fileUtilities").getFileContent(new java.io.File(filePath));
}

/**
* copies file
* @param {string} source source
* @param {string} target target
* @returns {void}
*/
function cp(source, target) { // eslint-disable-line no-unused-vars
    return Bean("fileUtilities").copy(new java.io.File(source), new java.io.File(target));
}

/**
* returns file size
* @param {string} filePath file path
* @returns {number} file size
*/
function getFileSize(filePath) { // eslint-disable-line no-unused-vars
    return Bean("fileUtilities").getSize(new java.io.File(filePath));
}

/**
* returns file name
* @param {string} filePath file path
* @returns {string} file name
*/
function fileName(filePath) { // eslint-disable-line no-unused-vars
    return new java.io.File(filePath).getName();
}

/**
* creates link
* @param {string} target target
* @param {string} destination destination
* @returns {void}
*/
function lns(target, destination) { // eslint-disable-line no-unused-vars
    return Bean("fileUtilities").createSymbolicLink(new java.io.File(destination), new java.io.File(target));
}

/**
* removes file
* @param {string} filePath file path
* @returns {void}
*/
function remove(filePath) { // eslint-disable-line no-unused-vars
    return Bean("fileUtilities").remove(new java.io.File(filePath));
}

/**
* creates empty file
* @param {string} filePath file path
* @returns {void}
*/
function touch(filePath) { // eslint-disable-line no-unused-vars
    if (!fileExists(filePath)) {
        Bean("fileUtilities").writeToFile(new java.io.File(filePath), "");
    }
}

/**
* writes content into file
* @param {string} filePath file path
* @param {string} content content which shall be written
* @returns {void}
*/
function writeToFile(filePath, content) { // eslint-disable-line no-unused-vars
    Bean("fileUtilities").writeToFile(new java.io.File(filePath), content);
}

/**
* creates temporary file
* @param {string} extension file extension
* @returns {string} file path of created temporary file
*/
function createTempFile(extension) { // eslint-disable-line no-unused-vars
    var tmpFile = Bean("fileUtilities").createTmpFile(extension);
    return tmpFile.getAbsolutePath();
}

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
            var progressBar = that._wizard.progressBar(tr("Checking file consistency ..."));
        }

        return that._checksumCalculator.calculate(that._file, that._method, function (progressEntity) {
            if(progressBar) {
                progressBar.accept(progressEntity);
            }
        });
    }
};
