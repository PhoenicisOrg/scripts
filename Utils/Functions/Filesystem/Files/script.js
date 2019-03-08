var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/**
* lists files and directories
* @param {string} directoryPath directory path
* @returns {string[]} list of files and directories
*/
function ls(directoryPath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return fileUtilities.ls(new FileClass(directoryPath));
}

/**
* creates directory
* @param {string} directoryPath directory path
* @returns {void}
*/
function mkdir(directoryPath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    fileUtilities.mkdir(new FileClass(directoryPath));
}

/**
* check if file exists
* @param {string} filePath file path
* @returns {boolean} true if file exists
*/
function fileExists(filePath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return new FileClass(filePath).exists();
}

/**
* returns file content
* @param {string} filePath file path
* @returns {string} content
*/
function cat(filePath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return Bean("fileUtilities").getFileContent(new FileClass(filePath));
}

/**
* copies file
* @param {string} source source
* @param {string} target target
* @returns {void}
*/
function cp(source, target) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return Bean("fileUtilities").copy(new FileClass(source), new FileClass(target));
}

/**
* returns file size
* @param {string} filePath file path
* @returns {number} file size
*/
function getFileSize(filePath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return Bean("fileUtilities").getSize(new FileClass(filePath));
}

/**
* returns file name
* @param {string} filePath file path
* @returns {string} file name
*/
function fileName(filePath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return new FileClass(filePath).getName();
}

/**
* creates link
* @param {string} target target
* @param {string} destination destination
* @returns {void}
*/
function lns(target, destination) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return Bean("fileUtilities").createSymbolicLink(new FileClass(destination), new FileClass(target));
}

/**
* removes file
* @param {string} filePath file path
* @returns {void}
*/
function remove(filePath) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    return Bean("fileUtilities").remove(new FileClass(filePath));
}

/**
* creates empty file
* @param {string} filePath file path
* @returns {void}
*/
function touch(filePath) { // eslint-disable-line no-unused-vars
    if (!fileExists(filePath)) {
        var FileClass = Java.type('java.io.File');
        Bean("fileUtilities").writeToFile(new FileClass(filePath), "");
    }
}

/**
* writes content into file
* @param {string} filePath file path
* @param {string} content content which shall be written
* @returns {void}
*/
function writeToFile(filePath, content) { // eslint-disable-line no-unused-vars
    var FileClass = Java.type('java.io.File');
    Bean("fileUtilities").writeToFile(new FileClass(filePath), content);
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

/**
 * creates temporary directory
 * @returns {string} file path of created temporary directory
 */
function createTempDir() { // eslint-disable-line no-unused-vars
    var tmpFile = Bean("fileUtilities").createTmpDir();
    return tmpFile.getAbsolutePath();
}

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
    if (this._wizard) {
        var progressBar = this._wizard.progressBar(tr("Checking file consistency..."));
    }

    return this._checksumCalculator.calculate(this._file, this._method, function (progressEntity) {
        if (progressBar) {
            progressBar.accept(progressEntity);
        }
    });
}

/**
* sets file permissions
* @param {string} filePath file path
* @param {string} permissions file permissions (e.g. "r--r--r--")
* @returns {void}
*/
function chmod(filePath, permissions) { // eslint-disable-line no-unused-vars
    var permissionsObj = java.nio.file.attribute.PosixFilePermissions.fromString(permissions);
    var filePathObj = java.nio.file.Paths.get(filePath);
    java.nio.file.Files.setPosixFilePermissions(filePathObj, permissionsObj);
}
