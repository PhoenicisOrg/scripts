include("engines.wine.quick_script.quick_script");
include("utils.functions.net.download");
include("engines.wine.engine.object");
include("utils.functions.filesystem.extract");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.luna");
include("engines.wine.verbs.corefonts");
include("engines.wine.plugins.windows_version");

function UplayScript() {
    QuickScript.call(this);

    this._executable = "Uplay.exe";
    this._category = "Games";
    this._gameOverlay = true;
}

UplayScript.prototype = Object.create(QuickScript.prototype);

UplayScript.prototype.constructor = UplayScript;

UplayScript.prototype.appId = function (appId) {
    this._appId = appId;
    return this;
};

UplayScript.prototype.downloadStarted = function (wine) {
    return fileExists(wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Ubisoft/Ubisoft Game Launcher/data/" + this._appId + "/manifests");
};

UplayScript.prototype.downloadFinished = function (wine) {
    return !fileExists(wine.prefixDirectory() + "/drive_c/" + wine.programFiles() + "/Ubisoft/Ubisoft Game Launcher/data/" + this._appId + "/manifests");
};

UplayScript.prototype.go = function () {
    // default executable args if not specified
    if (!this._executableArgs) {
        this._executableArgs = ["uplay://launch/" + this._appId + "/0"];
    }

    var setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
        .to(tempFile)
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
        .luna();

    wine.corefonts();

    setupWizard.message(tr("Please ensure that winbind is installed before you continue."));
    setupWizard.wait(tr("Please follow the steps of the Uplay setup.\n\nUncheck \"Run Uplay\" or close Uplay completely after the setup so that the installation of \"{0}\" can continue.", this._name));
    wine.run(tempFile, [], null, false, true);

    wine.setOsForApplication().set("upc.exe", "winvista").do();
    wine.setOsForApplication().set("UbisoftGameLauncher.exe", "winvista").do();

    // Uplay installation has finished
    setupWizard.wait(tr("Please wait..."));

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait(tr("Please wait..."));

    this._createShortcut(wine.prefix());

    wine.runInsidePrefix(wine.programFiles() + "/Ubisoft/Ubisoft Game Launcher/Uplay.exe", ["uplay://launch/" + this._appId + "/0"], true);

    // wait until download is finished
    setupWizard.wait(tr("Please wait until Uplay has finished the download..."));
    while (!this.downloadStarted(wine)) {
        java.lang.Thread.sleep(100);
    }
    while (!this.downloadFinished(wine)) {
        java.lang.Thread.sleep(1000);
    }

    setupWizard.message(tr("Please close Uplay."));

    this._postInstall(wine, setupWizard);

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait(tr("Please wait..."));

    setupWizard.close();
};
