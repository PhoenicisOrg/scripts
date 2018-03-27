include(["Utils", "Functions", "Net", "Download"]);
include(["Utils", "Functions", "Filesystem", "Files"]);

/* exported Resource */
var Resource = function () {
    var that = this;
    this._algorithm = "SHA";
    this._resourcesPath = Bean("propertyReader").getProperty("application.user.resources");
    this._directory = "";

    that.wizard = function(wizard) {
        that._wizard = wizard;
        return that;
    };

    that.algorithm = function(algorithm) {
        that._algorithm = algorithm;
        return that;
    };

    that.name = function (name) {
        that._name = name;
        return that;
    };

    that.checksum = function (checksum) {
        that._checksum = checksum;
        return that;
    };

    that.url = function(url) {
        that._url = url;
        return that;
    };

    /**
     * directory inside the resource directory where the Resource is stored
     * @param {string} directory
     * @returns {Resource}
     */
    that.directory = function(directory) {
        that._directory = directory;
        return that;
    };

    that.get = function () {
        if (!that._message) {
            that._message = tr("Please wait while {0} is downloaded ...", that._name);
        }

        var resourcesPath = that._resourcesPath + "/" + that._directory;
        mkdir(resourcesPath);

        var resourcePath = resourcesPath + "/" + that._name;

        if (fileExists(resourcePath)) {
            var fileChecksum = new Checksum()
                .wizard(that._wizard)
                .of(resourcePath)
                .method(that._algorithm)
                .get();

            if(fileChecksum == that._checksum) {
                return resourcePath;
            }
        }

        new Downloader()
            .url(that._url)
            .wizard(that._wizard)
            .message(that._message)
            .checksum(that._checksum)
            .algorithm(that._algorithm)
            .to(resourcePath)
            .get();

        return resourcePath;
    }
};
