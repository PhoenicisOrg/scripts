include("utils.functions.net.download");
include("utils.functions.filesystem.files");

/**
* Resource prototype
* @constructor
*/
function Resource() {
    this._algorithm = "SHA";
    this._resourcesPath = Bean("propertyReader").getProperty("application.user.resources");
    this._directory = "";
}

/**
* sets wizard
* @param {SetupWizard} wizard setup wizard
* @returns {Resource} Resource object
*/
Resource.prototype.wizard = function (wizard) {
    this._wizard = wizard;
    return this;
}

/**
* sets algorithm
* @param {string} algorithm algorithm to verify the checksum (e.g. "SHA")
* @returns {Resource} Resource object
*/
Resource.prototype.algorithm = function (algorithm) {
    this._algorithm = algorithm;
    return this;
}

/**
* sets name
* @param {string} name name of the resource
* @returns {Resource} Resource object
*/
Resource.prototype.name = function (name) {
    this._name = name;
    return this;
}

/**
* sets checksum which shall be used to verify the resource
* @param {string} checksum checksum
* @returns {Resource} Resource object
*/
Resource.prototype.checksum = function (checksum) {
    this._checksum = checksum;
    return this;
}

/**
* sets URL
* @param {string} url URL
* @returns {Resource} Resource object
*/
Resource.prototype.url = function (url) {
    this._url = url;
    return this;
}

/**
* sets directory inside the resource directory where the Resource is stored
* @param {string} directory directory path
* @returns {Resource} Resource object
*/
Resource.prototype.directory = function (directory) {
    this._directory = directory;
    return this;
}

/**
* returns the Resource
* @returns {Resource} downloaded Resource object
*/
Resource.prototype.get = function () {
    if (!this._message) {
        this._message = tr("Please wait while {0} is downloaded...", this._name);
    }

    var resourcesPath = this._resourcesPath + "/" + this._directory;
    mkdir(resourcesPath);

    var resourcePath = resourcesPath + "/" + this._name;

    if (fileExists(resourcePath)) {
        var fileChecksum = new Checksum()
            .wizard(this._wizard)
            .of(resourcePath)
            .method(this._algorithm)
            .get();

        if (fileChecksum == this._checksum) {
            return resourcePath;
        }
    }

    new Downloader()
        .url(this._url)
        .wizard(this._wizard)
        .message(this._message)
        .checksum(this._checksum)
        .algorithm(this._algorithm)
        .to(resourcePath)
        .get();

    return resourcePath;
}
