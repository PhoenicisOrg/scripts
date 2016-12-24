include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Shortcuts", "Wine"]);


var InstallerScript = function() {
    var that = this;

    that.name = function(name) {
        that._name = name;
        return that;
    };

    that.editor = function(editor) {
        that._editor = editor;
        return that;
    };

    that.editorUrl = function(editorUrl) {
        that._editorUrl = editorUrl;
        return that;
    };

    that.author = function(author) {
        that._author = author;
        return that;
    };

    that.url = function(url) {
        that._url = url;
        return that;
    };

    that.checksum = function(checksum) {
        that._checksum = checksum;
        return that;
    };

    that.executable = function(executable) {
        that._executable = executable;
        return that;
    };

    that.category = function(category) {
        that._category = category;
        return that;
    };

    that.go = function() {
        var setupWizard = SetupWizard(that._name);

        setupWizard.presentation(that._name, that._editor, that._editorUrl, that._author);

        var tempFile = createTempFile("exe");

        new Downloader()
            .wizard(setupWizard)
            .url(that._url)
            .checksum(that._checksum)
            .to(tempFile)
            .get();

        new Wine()
            .wizard(setupWizard)
            .version(LATEST_STABLE_VERSION)
            .prefix(that._name)
            .luna()
            .run(tempFile)
            .wait();

        new WineShortcut()
            .name(that._name)
            .prefix(that._name)
            .search(that._executable)
            .miniature([that._category, that._name])
            .create();

        setupWizard.close();
    }
};
