include(["Functions", "Filesystem", "Files"]);

var Downloader = function () {
    var that = this;
    that._downloader = Bean("downloader");
    that._algorithm = "SHA";

    that._fetchFileNameFromUrl = function (url) {
        return url.substring(url.lastIndexOf('/') + 1);
    };
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };
    that.url = function (url) {
        that._url = url;
        return that;
    };
    that.algorithm = function(algorithm) {
        that._algorithm = algorithm;
        return that;
    };
    that.checksum = function (checksum) {
        that._checksum = checksum;
        return that;
    };
    that.message = function (message) {
        that._message = message;
        return that;
    };
    that.to = function (localFile) {
        that._localFile = localFile;
        return that;
    };
    that.get = function () {
        if (!that._message) {
            that._message = "Please wait while {0} is downloaded ...".format(that._fetchFileNameFromUrl(that._url));
        }

        if(that._wizard) {
            var progressBar = that._wizard.progressBar(that._message);
        }

        if (that._localFile) {
            that._downloader.get(that._url, that._localFile, function (progressEntity) {
                progressBar.accept(progressEntity);
            });

            if (that._checksum) {
                var fileChecksum = new Checksum()
                    .wizard(that._wizard)
                    .of(that._localFile)
                    .method(that._algorithm)
                    .get();

                if (fileChecksum != that._checksum) {
                    that._wizard.message(
                        "Error while calculating checksum. \n\nExpected = {0}\nActual = {1}"
                            .format(that._checksum, fileChecksum)
                    )
                }
            }
        } else {
            return that._downloader.get(that._url, function (progressEntity) {
                if(progressBar) {
                    progressBar.accept(progressEntity);
                }
            });
        }
    }
};