var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/**
 * Lists all files and directories contained in the given path
 *
 * @param {string} directoryPath directory path
 * @returns {string[]} list of files and directories
 */
function ls(directoryPath) {
    return fileUtilities.ls(directoryPath);
}

/**
 * Creates the given directory
 *
 * @param {string} directoryPath directory path
 * @returns {void}
 */
function mkdir(directoryPath) {
    fileUtilities.mkdir(directoryPath);
}

/**
 * Checks if the given file exists
 *
 * @param {string} filePath file path
 * @returns {boolean} true if file exists
 */
function fileExists(filePath) {
    return fileUtilities.exists(filePath);
}

/**
 * Returns the file content of the given file
 *
 * @param {string} filePath file path
 * @returns {string} content
 */
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
function cp(source, target) {
    return fileUtilities.copy(source, target);
}

/**
 * Returns the file size of the given file
 *
 * @param {string} filePath file path
 * @returns {number} file size
 */
function getFileSize(filePath) {
    return fileUtilities.getSize(filePath);
}

/**
 * Returns the file name of the given file
 *
 * @param {string} filePath file path
 * @returns {string} file name
 */
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
function lns(target, link) {
    return fileUtilities.createSymbolicLink(link, target);
}

/**
 * Removes the given file
 *
 * @param {string} filePath file path
 * @returns {void}
 */
function remove(filePath) {
    return fileUtilities.remove(filePath);
}

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

/**
 * Creates a new temporary file with the given file extension
 *
 * @param {string} extension file extension
 * @returns {string} file path of created temporary file
 */
function createTempFile(extension) {
    return fileUtilities.createTmpFile(extension);
}

/**
 * Creates a new temporary temporary directory
 *
 * @returns {string} file path of created temporary directory
 */
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
function chmod(filePath, permissions) {
    fileUtilities.chmod(filePath, permissions);
}

/**
 * Checksum
 */
class Checksum {
    constructor() {
        this.checksumCalculator = Bean("checksumCalculator");
        this._method = "SHA";
    }

    /**
	 * sets wizard
	 * @param {SetupWizard} wizard setup wizard
	 * @returns {Checksum} Checksum object
	 */
    wizard(wizard) {
        this._wizard = wizard;

        return this;
    }

    /**
	 * sets checksum algorithm
	 * @param {string} algorithm algorithm (e.g. "SHA")
	 * @returns {Checksum} Checksum object
	 */
    method(algorithm) {
        this._method = algorithm;

        return this;
    }

    /**
	 * sets file for which the checksum shall be computed
	 * @param {string} file file for which the checksum shall be computed
	 * @returns {Checksum} Checksum object
	 */
    of(file) {
        this._file = file;

        return this;
    }

    /**
	 * returns calculated checksum
	 * @returns {string} calculated checksum
	 */
    get() {
        if (this._wizard) {
            var progressBar = this._wizard.progressBar(tr("Checking file consistency..."));
        }

        return this.checksumCalculator.calculate(this._file, this._method, function (progressEntity) {
            if (progressBar) {
                progressBar.accept(progressEntity);
            }
        });
    }
}
