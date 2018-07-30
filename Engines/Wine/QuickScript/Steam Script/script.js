include(["engines", "wine", "quick_script", "quick_script"]);
include(["utils", "functions", "net", "download"]);
include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "verbs", "luna"]);


function SteamScript() {
    QuickScript.call(this);

    this._executable = "Steam.exe";
    this._category = "Games";
    this._gameOverlay = true;
}

SteamScript.prototype = Object.create(QuickScript.prototype);

SteamScript.prototype.constructor = SteamScript;

SteamScript.prototype.appId = function (appId) {
    this._appId = appId;
    return this;
};

SteamScript.prototype.gameOverlay = function (gameOverlay) {
    // get
    if (arguments.length == 0) {
        return this._gameOverlay;
    }

    // set
    this._gameOverlay = gameOverlay;
    return this;
};

SteamScript.prototype.manifest = function (wine) {
    if (!this._manifest) {
        // cache manifest path (will not change during the installation)
        this._manifest = wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Steam/steamapps/appmanifest_" + this._appId + ".acf";
    }
    return this._manifest;
};

SteamScript.prototype.downloadStarted = function (wine) {
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

SteamScript.prototype.downloadFinished = function (wine) {
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

SteamScript.prototype.go = function () {
    // default application homepage if not specified
    if (!this._applicationHomepage) {
        this._applicationHomepage = "http://store.steampowered.com/app/" + this._appId;
    }

    // default executable args if not specified
    if (!this._executableArgs) {
        this._executableArgs = ["-no-cef-sandbox", "-silent", "-applaunch", this._appId];
    }

    var setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("http://media.steampowered.com/client/installer/SteamSetup.exe")
        .checksum("4b1b85ec2499a4ce07c89609b256923a4fc479e5")
        .to(tempFile)
        .get();

    setupWizard.wait(tr("Please follow the steps of the Steam setup.\n\nUncheck \"Run Steam\" or close Steam completely after the setup so that the installation of \"{0}\" can continue.", this._name));

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
        .luna();

    wine.run(tempFile, [], null, false, true);

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
    this._createShortcut(wine.prefix());

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
