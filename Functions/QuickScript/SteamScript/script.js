include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Shortcuts", "Wine"]);
include(["Functions", "Verbs", "luna"]);


var SteamScript = function() {
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

    that.appId = function(appId) {
        that._appId = appId;
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
            .url("http://media.steampowered.com/client/installer/SteamSetup.exe")
            .checksum("e930dbdb3bc638f772a8fcd92dbcd0919c924318")
            .to(tempFile)
            .get();

        var wine = new Wine()
            .wizard(setupWizard)
            .version(LATEST_STABLE_VERSION)
            .prefix(that._name)
            .luna()
            .run(tempFile)
            .wait()

        wine.runInsidePrefix(wine.getProgramFiles() + "/Steam/Steam.exe", "steam://install/" + that._appId)
            .wait();

        new WineShortcut()
            .name(that._name)
            .prefix(that._name)
            .search("Steam.exe")
            .arguments("steam://rungameid/" + that._appId)
            .miniature([that._category, that._name])
            .create();

        setupWizard.close();
    }
};
