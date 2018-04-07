var fileAnalyser = Bean("fileAnalyser");
var fileUtilities = Bean("fileUtilities");

/**
* creates directory
* @param {string} directoryPath directory path
*
* exported mkdir */
var mkdir = function (directoryPath) {
    fileUtilities.mkdir(new java.io.File(directoryPath))
};

/**
* check if file exists
* @param {string} filePath file path
* @returns {boolean} true if file exists
*
* exported fileExists */
var fileExists = function (filePath) {
    return new java.io.File(filePath).exists();
};

/**
* returns file content
* @param {string} filePath file path
* @returns {string} content
/* exported cat */
var cat = function(filePath) {
    return Bean("fileUtilities").getFileContent(new java.io.File(filePath));
};

/**
* copies file
* @param {string} source source
* @param {string} target target
*
* exported cp */
var cp = function(source, target) {
    return Bean("fileUtilities").copy(new java.io.File(source), new java.io.File(target));
};

/**
* returns file size
* @param {string} filePath file path
* @returns {number} file size
*
* exported getFileSize */
var getFileSize = function(filePath) {
    return Bean("fileUtilities").getSize(new java.io.File(filePath));
};

/**
* returns file name
* @param {string} filePath file path
* @returns {string} file name
*
* exported fileName */
var fileName = function(filePath) {
    return new java.io.File(filePath).getName();
};

/**
* creates link
* @param {string} target target
* @param {string} destination destination
*
* exported lns */
var lns = function(target, destination) {
    return Bean("fileUtilities").createSymbolicLink(new java.io.File(destination), new java.io.File(target));
};

/**
* removes file
* @param {string} filePath file path
*
* exported remove */
var remove = function(filePath) {
    return Bean("fileUtilities").remove(new java.io.File(filePath));
};

/**
* creates empty file
* @param {string} filePath file path
*
* exported touch */
var touch = function(filePath) {
    if (!fileExists(filePath)) {
        Bean("fileUtilities").writeToFile(new java.io.File(filePath), "");
    }
};

/**
* writes content into file
* @param {string} filePath file path
* @param {string} content content which shall be written
*
* exported writeToFile */
var writeToFile = function(filePath, content) {
    Bean("fileUtilities").writeToFile(new java.io.File(filePath), content);
};

/**
* creates temporary file
* @param {string} extension file extension
* @returns {string} file path of created temporary file
*
* exported createTempFile */
var createTempFile = function (extension) {
    var tmpFile = Bean("fileUtilities").createTmpFile(extension);
    return tmpFile.getAbsolutePath();
};

/**
* checksum utilities
*
* exported Checksum */
var Checksum = function () {
    var that = this;
    that._method = "SHA";
    that._checksumCalculator = Bean("checksumCalculator");

    /**
    * sets wizard
    * @param {SetupWizard} wizard
    * @returns {Checksum}
    */
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };

    /**
    * sets algorithm
    * @param {string} algorithm (e.g. "SHA")
    * @returns {Checksum}
    */
    that.method = function (algorithm) {
        that._method = algorithm;
        return that;
    };

    /**
    * sets file for which the checksum shall be computed
    * @param {string} file path
    * @returns {Checksum}
    */
    that.of = function (file) {
        that._file = file;
        return that;
    };

    /**
    * returns checksum
    * @returns {number} checksum
    */
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
