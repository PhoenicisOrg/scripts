const fileUtilities = Bean("fileUtilities");
const checksumCalculator = Bean("checksumCalculator");

/**
 * Lists all files and directories contained in the given path
 *
 * @param {string} directoryPath directory path
 * @returns {string[]} list of files and directories
 */
function ls(directoryPath) {
    return fileUtilities.ls(directoryPath);
}
module.ls = ls;

/**
 * Creates the given directory
 *
 * @param {string} directoryPath directory path
 * @returns {void}
 */
function mkdir(directoryPath) {
    fileUtilities.mkdir(directoryPath);
}
module.mkdir = mkdir;

/**
 * Checks if the given file exists
 *
 * @param {string} filePath file path
 * @returns {boolean} true if file exists
 */
function fileExists(filePath) {
    return fileUtilities.exists(filePath);
}
module.fileExists = fileExists;

/**
 * Returns the file content of the given file
 *
 * @param {string} filePath file path
 * @returns {string} content
 */
function cat(filePath) {
    return fileUtilities.getFileContent(filePath);
}
module.cat = cat;

/**
 * Copies the given source file to the target location
 *
 * @param {string} source Source file
 * @param {string} target Target location
 * @returns {void}
 */
function cp(source, target) {
    return fileUtilities.copy(source, target);
}
module.cp = cp;

/**
 * Returns the file size of the given file
 *
 * @param {string} filePath file path
 * @returns {number} file size
 */
function getFileSize(filePath) {
    return fileUtilities.getSize(filePath);
}
module.getFileSize = getFileSize;

/**
 * Returns the file name of the given file
 *
 * @param {string} filePath file path
 * @returns {string} file name
 */
function fileName(filePath) {
    return fileUtilities.getFileName(filePath);
}
module.fileName = fileName;

/**
 * Creates a symbolic link
 *
 * @param {string} target target
 * @param {string} link destination
 * @returns {void}
 */
function lns(target, link) {
    return fileUtilities.createSymbolicLink(link, target);
}
module.lns = lns;

/**
 * Removes the given file
 *
 * @param {string} filePath file path
 * @returns {void}
 */
function remove(filePath) {
    return fileUtilities.remove(filePath);
}
module.remove = remove;

/**
 * Creates the given file if it does not exist
 *
 * @param {string} filePath file path
 * @returns {void}
 */
function touch(filePath) {
    if (!fileExists(filePath)) {
        fileUtilities.writeToFile(filePath, "");
    }
}
module.touch = touch;

/**
 * Writes the given content to the given file
 *
 * @param {string} filePath file path
 * @param {string} content content which shall be written
 * @returns {void}
 */
function writeToFile(filePath, content) {
    fileUtilities.writeToFile(filePath, content);
}
module.writeToFile = writeToFile;

/**
 * Creates a new temporary file with the given file extension
 *
 * @param {string} extension file extension
 * @returns {string} file path of created temporary file
 */
function createTempFile(extension) {
    return fileUtilities.createTmpFile(extension);
}
module.createTempFile = createTempFile;

/**
 * Creates a new temporary temporary directory
 *
 * @returns {string} file path of created temporary directory
 */
function createTempDir() {
    return fileUtilities.createTmpDir();
}
module.createTempDir = createTempDir;

/**
 * Sets the given file permissions
 *
 * @param {string} filePath file path
 * @param {string} permissions file permissions (e.g. "r--r--r--")
 * @returns {void}
 */
function chmod(filePath, permissions) {
    fileUtilities.chmod(filePath, permissions);
}
module.chmod = chmod;

/**
 * Checksum
 */
module.Checksum = class Checksum {
    constructor() {
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
        let progressBar;
        if (this._wizard) {
            progressBar = this._wizard.progressBar(tr("Checking file consistency..."));
        }

        return checksumCalculator.calculate(this._file, this._method, progressEntity => {
            if (progressBar) {
                progressBar.accept(progressEntity);
            }
        });
    }
};
