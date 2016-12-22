include(["Functions", "Filesystem", "Files"]);

var Extractor = {
    _extractor: Bean("extractor"),
    wizard: function (wizard) {
        this._wizard = wizard;
        return this;
    },
    archive: function (archive) {
        this._archive = archive;
        return this;
    },
    message: function (progressMessage) {
        this._progressMessage = progressMessage;
        return this;
    },
    to: function (destination) {
        this._destination = destination;
        return this;
    },
    extract: function () {
        if (!this._progressMessage) {
            this._progressMessage = "Please wait while {0} is extracted ...".format(this._archive);
        }

        var progressBar = this._wizard.progressBar(this._progressMessage);

        mkdir(this._destination);
        this._extractor.uncompress(this._archive, this._destination, function (progress) {
            progressBar.accept(progress);
        });
    }
};