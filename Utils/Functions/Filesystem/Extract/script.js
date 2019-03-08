include("utils.functions.filesystem.files");

/**
* CabExtract prototype
* @constructor
*/
function CabExtract() {
}

/**
* sets wizard
* @param {SetupWizard} wizard setup wizard
* @returns {CabExtract} CabExtract object
*/
CabExtract.prototype.wizard = function (wizard) {
    this._wizard = wizard;
    return this;
}

/**
* sets archive
* @param {string} archive archive which shall be extracted
* @returns {CabExtract} CabExtract object
*/
CabExtract.prototype.archive = function (archive) {
    this._archive = archive;
    return this;
}

/**
* sets progress message text
* @param {string} progressMessage progress message
* @returns {CabExtract} CabExtract object
*/
CabExtract.prototype.message = function (progressMessage) {
    this._progressMessage = progressMessage;
    return this;
}

/**
* sets destination
* @param {string} destination place where the archive shall be extracted
* @returns {CabExtract} CabExtract object
*/
CabExtract.prototype.to = function (destination) {
    this._destination = destination;
    return this;
}

/**
* extracts archive
* @param {string} args arguments for the extraction
* @returns {void}
*/
CabExtract.prototype.extract = function (args) {
    if (!this._progressMessage) {
        this._progressMessage = tr("Please wait while {0} is extracted...", this._archive);
    }

    if (this._wizard) {
        var progressBar = this._wizard.progressBar(this._progressMessage);
    }

    var processArguments;
    if (args) {
        processArguments = ["cabextract"].concat(args).concat([this._archive]);
    } else {
        processArguments = ["cabextract", this._archive];
    }

    print("Extracting to: " + this._destination);
    mkdir(this._destination);
    var ProcessBuilderClass = Java.type('java.lang.ProcessBuilder');
    var processBuilder = new ProcessBuilderClass(Java.to(processArguments, "java.lang.String[]"));
    var FileClass = Java.type('java.io.File');
    processBuilder.directory(new FileClass(this._destination));
    processBuilder.inheritIO();
    processBuilder.start().waitFor();
}

/**
* Extractor prototype
* @constructor
*/
function Extractor() {
    this._extractor = Bean("extractor");
}

/**
* sets wizard
* @param {SetupWizard} wizard setup wizard
* @returns {Extractor} Extractor object
*/
Extractor.prototype.wizard = function (wizard) {
    this._wizard = wizard;
    return this;
}

/**
* sets archive
* @param {string} archive archive which shall be extracted
* @returns {Extractor} Extractor object
*/
Extractor.prototype.archive = function (archive) {
    this._archive = archive;
    return this;
}

/**
* sets progress message text
* @param {string} progressMessage progress message
* @returns {Extractor} Extractor object
*/
Extractor.prototype.message = function (progressMessage) {
    this._progressMessage = progressMessage;
    return this;
}

/**
* sets destination
* @param {string} destination place where the archive shall be extracted
* @returns {Extractor} Extractor object
*/
Extractor.prototype.to = function (destination) {
    this._destination = destination;
    return this;
}

/**
* extracts archive
* @returns {void}
*/
Extractor.prototype.extract = function () {
    if (!this._progressMessage) {
        this._progressMessage = tr("Please wait while {0} is extracted...", this._archive);
    }

    var progressBar = this._wizard.progressBar(this._progressMessage);

    mkdir(this._destination);
    this._extractor.uncompress(this._archive, this._destination, function (progress) {
        progressBar.accept(progress);
    });
}
