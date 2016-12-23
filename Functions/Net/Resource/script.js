include(["Functions", "Net", "Download"]);

var Resource = function () {
    var that = this;
    this._resourcesPath = Bean("propertyReader").getProperty("application.user.resources");

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

    that.get = function () {
        if (!that._message) {
            that._message = "Please wait while {0} is downloaded...".format(that._name);
        }

        var resourcePath = that._resourcesPath + "/" + that._name;

        if (fileExists(resourcePath)) {
            var fileChecksum = new Checksum()
                .wizard(that._wizard)
                .of(resourcePath)
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
            .to(resourcePath)
            .get();

        return resourcePath;
    }
};