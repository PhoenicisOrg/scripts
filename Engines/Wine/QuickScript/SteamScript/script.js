include(["Engines", "Wine", "QuickScript", "QuickScript"]);
include(["Utils", "Functions", "Net", "Download"]);
include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Filesystem", "Extract"]);
include(["Utils", "Functions", "Filesystem", "Files"]);
include(["Engines", "Wine", "Shortcuts", "Wine"]);
include(["Engines", "Wine", "Verbs", "luna"]);


function SteamScript() {
    QuickScript.call(this);

    this._executable = "Steam.exe";
    this._category = "Games";
    this._gameOverlay = true;
}

SteamScript.prototype = Object.create(QuickScript.prototype);

SteamScript.prototype.constructor = SteamScript;

SteamScript.prototype.appId = function(appId) {
    this._appId = appId;
    return this;
};

SteamScript.prototype.gameOverlay = function(gameOverlay) {
    // get
    if (arguments.length == 0) {
        return this._gameOverlay;
    }

    // set
    this._gameOverlay = gameOverlay;
    return this;
};

SteamScript.prototype.manifest = function(wine) {
    if (!this._manifest) {
        // cache manifest path (will not change during the installation)
        this._manifest = wine.prefixDirectory + "/drive_c/" + wine.programFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf";
    }
    return this._manifest;
};

SteamScript.prototype.downloadStarted = function(wine) {
    if (fileExists(this.manifest(wine)))
    {
        var manifest = cat(this.manifest(wine));
        var state = Number(manifest.match(/\"StateFlags\"\s+\"(\d+)\"/)[1]);
        return state == 1026 || state == 1042 || state == 1062 || state == 1030;
    }
    else
    {
        return false;
    }
};

SteamScript.prototype.downloadFinished = function(wine) {
    // check if download already finished (download folder has been deleted)
    if (fileExists(this.manifest(wine)))
    {
        var manifest = cat(this.manifest(wine));
        var state = Number(manifest.match(/\"StateFlags\"\s+\"(\d+)\"/)[1]);
        return state != 1026 && state != 1042 && state != 1062 && state != 1030;
    }
    else
    {
        return false;
    }
};

SteamScript.prototype.go = function() {
    // default application homepage if not specified
    if (!this._applicationHomepage) {
        this._applicationHomepage = "http://store.steampowered.com/app/" + this._appId;
    }

    // default executable args if not specified
    if (!this._executableArgs) {
        this._executableArgs = ["-silent", "-applaunch", this._appId];
    }

    var appsManager = Bean("repositoryManager");
    var application = appsManager.getApplication([this._type, this._category, this._name]);
    var setupWizard = SetupWizardWithMiniature(this._name, application.getMainMiniature().get());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("http://media.steampowered.com/client/installer/SteamSetup.exe")
        .checksum("e930dbdb3bc638f772a8fcd92dbcd0919c924318")
        .to(tempFile)
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .architecture(this._wineArchitecture)
        .distribution(this._wineDistribution)
        .version(this._wineVersion)
        .prefix(this._name)
        .luna()
        .run(tempFile)
        .wait(tr("Please follow the steps of the Steam setup.\n\nUncheck \"Run Steam\" or close Steam completely after the setup so that the installation of \"{0}\" can continue.", this._name));

    // Steam installation has finished
    setupWizard.wait(tr("Please wait ..."));

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait(tr("Please wait ..."));

    wine.runInsidePrefix(wine.programFiles() + "/Steam/Steam.exe", ["steam://install/" + this._appId]);

    setupWizard.wait(tr("Please wait until Steam has finished the download ..."));

    // wait until download started
    while (!this.downloadStarted(wine)) {
        java.lang.Thread.sleep(100);
    }

    // make sure download is finished
    while (!this.downloadFinished(wine)) {
        java.lang.Thread.sleep(1000);
    }

    // close Steam
    wine.runInsidePrefix(wine.programFiles() + "/Steam/Steam.exe", "-shutdown");

    // back to generic wait
    setupWizard.wait(tr("Please wait ..."));

    // create shortcut after installation (if executable is specified, it does not exist earlier)
    new WineShortcut()
        .name(this._name)
        .type(this._type)
        .category(this._category)
        .prefix(wine.prefix())
        .search(this._executable)
        .arguments(this._executableArgs)
        .miniature([this._type, this._category, this._name])
        .create();

    this._postInstall(wine, setupWizard);

    // deactivate game overlay if desired
    if (!this._gameOverlay) {
        wine.overrideDLL()
            .set("", ["gameoverlayrenderer"])
            .do();
    }

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait(tr("Please wait ..."));

    setupWizard.close();
};
