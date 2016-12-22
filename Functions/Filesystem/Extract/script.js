include(["Functions", "Filesystem", "Files"]);

var Extractor = function () {
    var that = this;
    that._extractor = Bean("extractor");
    that.wizard = function (wizard) {
        that._wizard = wizard;
        return that;
    };
    that.archive = function (archive) {
        that._archive = archive;
        return that;
    };
    that.message = function (progressMessage) {
        that._progressMessage = progressMessage;
        return that;
    };
    that.to = function (destination) {
        that._destination = destination;
        return that;
    };
    that.extract = function () {
        if (!that._progressMessage) {
            that._progressMessage = "Please wait while {0} is extracted ...".format(that._archive);
        }

        var progressBar = that._wizard.progressBar(that._progressMessage);

        mkdir(that._destination);
        that._extractor.uncompress(that._archive, that._destination, function (progress) {
            progressBar.accept(progress);
        });
    }
};