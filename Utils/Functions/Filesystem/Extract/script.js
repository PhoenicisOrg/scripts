include(["Utils", "Functions", "filesystem", "files"]);

/* exported CabExtract */
var CabExtract = function() {
    var that = this;

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

    that.extract = function(args) {
        if (!that._progressMessage) {
            that._progressMessage = tr("Please wait while {0} is extracted ...", that._archive);
        }

        if (that._wizard) {
            var progressBar = that._wizard.progressBar(that._progressMessage);
        }

        var processArguments;
        if (args) {
            processArguments = ["cabextract"].concat(args).concat([that._archive]);
        } else {
            processArguments = ["cabextract", that._archive];
        }

        print("Extracting to: " + that._destination);
        mkdir(that._destination);
        var processBuilder = new java.lang.ProcessBuilder(Java.to(processArguments, "java.lang.String[]"));
        processBuilder.directory(new java.io.File(that._destination));
        processBuilder.inheritIO();
        processBuilder.start().waitFor();
    }

};

/* exported Extractor */
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
            that._progressMessage = tr("Please wait while {0} is extracted ...", that._archive);
        }

        var progressBar = that._wizard.progressBar(that._progressMessage);

        mkdir(that._destination);
        that._extractor.uncompress(that._archive, that._destination, function (progress) {
            progressBar.accept(progress);
        });
    }
};
