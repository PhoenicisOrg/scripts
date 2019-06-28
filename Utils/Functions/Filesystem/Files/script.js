var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/**
 * Lists all files and directories contained in the given path
 *
 * @param {string} directoryPath directory path
 * @returns {string[]} list of files and directories
 */
// eslint-disable-next-line no-unused-vars
function ls(directoryPath) {
    return fileUtilities.ls(directoryPath);
}

/**
 * Creates the given directory
 *
 * @param {string} directoryPath directory path
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function mkdir(directoryPath) {
    fileUtilities.mkdir(directoryPath);
}

/**
 * Checks if the given file exists
 *
 * @param {string} filePath file path
 * @returns {boolean} true if file exists
 */
// eslint-disable-next-line no-unused-vars
function fileExists(filePath) {
    return fileUtilities.exists(filePath);
}

/**
 * Returns the file content of the given file
 *
 * @param {string} filePath file path
 * @returns {string} content
 */
// eslint-disable-next-line no-unused-vars
function cat(filePath) {
    return fileUtilities.getFileContent(filePath);
}

/**
 * Copies the given source file to the target location
 *
 * @param {string} source Source file
 * @param {string} target Target location
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function cp(source, target) {
    return fileUtilities.copy(source, target);
}

/**
 * Returns the file size of the given file
 *
 * @param {string} filePath file path
 * @returns {number} file size
 */
// eslint-disable-next-line no-unused-vars
function getFileSize(filePath) {
    return fileUtilities.getSize(filePath);
}

/**
 * Returns the file name of the given file
 *
 * @param {string} filePath file path
 * @returns {string} file name
 */
// eslint-disable-next-line no-unused-vars
function fileName(filePath) {
    return fileUtilities.getFileName(filePath);
}

/**
 * Creates a symbolic link
 *
 * @param {string} target target
 * @param {string} link destination
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function lns(target, link) {
    return fileUtilities.createSymbolicLink(link, target);
}

/**
 * Removes the given file
 *
 * @param {string} filePath file path
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function remove(filePath) {
    return fileUtilities.remove(filePath);
}

/**
 * Creates the given file if it does not exist
 *
 * @param {string} filePath file path
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function touch(filePath) {
    if (!fileExists(filePath)) {
        fileUtilities.writeToFile(filePath, "");
    }
}

/**
 * Writes the given content to the given file
 *
 * @param {string} filePath file path
 * @param {string} content content which shall be written
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function writeToFile(filePath, content) {
    fileUtilities.writeToFile(filePath, content);
}

/**
 * Creates a new temporary file with the given file extension
 *
 * @param {string} extension file extension
 * @returns {string} file path of created temporary file
 */
// eslint-disable-next-line no-unused-vars
function createTempFile(extension) {
    return fileUtilities.createTmpFile(extension);
}

/**
 * Creates a new temporary temporary directory
 *
 * @returns {string} file path of created temporary directory
 */
// eslint-disable-next-line no-unused-vars
function createTempDir() {
    return fileUtilities.createTmpDir();
}

/**
 * Sets the given file permissions
 *
 * @param {string} filePath file path
 * @param {string} permissions file permissions (e.g. "r--r--r--")
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
function chmod(filePath, permissions) {
    fileUtilities.chmod(filePath, permissions);
}

/**
 * Checksum
 */
// eslint-disable-next-line no-unused-vars
class Checksum {
    constructor() {
        this.checksumCalculator = Bean("checksumCalculator");
        this._method = "SHA";
    }

    /**
     * Sets the setup wizard
     *
     * @param {SetupWizard} wizard The setup wizard
     * @returns {Checksum} The Checksum object
     */
    wizard(wizard) {
        this._wizard = wizard;

        return this;
    }

    /**
     * Sets the used checksum algorithm
     *
     * @param {string} algorithm The used algorithm (e.g. "SHA")
     * @returns {Checksum} The Checksum object
     */
    method(algorithm) {
        this._method = algorithm;

        return this;
    }

    /**
     * Sets the file for which the checksum shall be computed
     *
     * @param {string} file The file for which the checksum shall be computed
     * @returns {Checksum} The Checksum object
     */
    of(file) {
        this._file = file;

        return this;
    }

    /**
     * Calculates and returns the checksum for the previously set file
     *
     * @returns {string} The calculated checksum
     */
    get() {
        if (this._wizard) {
            var progressBar = this._wizard.progressBar(tr("Checking file consistency..."));
        }

        return this.checksumCalculator.calculate(this._file, this._method, progressEntity => {
            if (progressBar) {
                progressBar.accept(progressEntity);
            }
        });
    }
}
