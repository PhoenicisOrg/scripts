include(["Functions", "QuickScript", "QuickScript"]);
include(["Functions", "Net", "Download"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Shortcuts", "Wine"]);
include(["Functions", "Verbs", "luna"]);


function SteamScript() {
    QuickScript.call(this);
};

SteamScript.prototype = Object.create(QuickScript.prototype);

SteamScript.prototype.constructor = SteamScript;

SteamScript.prototype.appId = function(appId) {
    this._appId = appId;
    this._editorUrl = "http://store.steampowered.com/app/" + appId;
    return this;
};

SteamScript.prototype.go = function() {
    var setupWizard = SetupWizard(this._name);

    setupWizard.presentation(this._name, this._editor, this._editorUrl, this._author);

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
        .prefix(this._name)
        .luna()
        .run(tempFile)
        .wait();

    new WineShortcut()
        .name(this._name)
        .prefix(this._name)
        .search("Steam.exe")
        .arguments("steam://rungameid/" + this._appId)
        .miniature([this._category, this._name])
        .create();

    wine.runInsidePrefix(wine.getProgramFiles() + "/Steam/Steam.exe", "steam://install/" + this._appId);

    setupWizard.close();
};
