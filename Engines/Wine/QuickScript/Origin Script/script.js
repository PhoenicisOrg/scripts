include(["engines", "wine", "quick_script", "quick_script"]);
include(["utils", "functions", "net", "download"]);
include(["engines", "wine", "engine", "object"]);
include(["engines", "wine", "plugins", "override_dll"]);
include(["utils", "functions", "filesystem", "extract"]);
include(["utils", "functions", "filesystem", "files"]);
include(["engines", "wine", "verbs", "luna"]);


function OriginScript() {
    QuickScript.call(this);

    this._executable = "Origin.exe";
    this._category = "Games";
}

OriginScript.prototype = Object.create(QuickScript.prototype);

OriginScript.prototype.constructor = OriginScript;

OriginScript.prototype.appId = function (appId) {
    this._appId = appId;
    return this;
};

OriginScript.prototype.go = function () {

    // default executable args if not specified
    if (!this._executableArgs) {
        this._executableArgs = ["origin://launchgame/" + this._appId];
    }

    var setupWizard = SetupWizard(InstallationType.APPS, this._name, this.miniature());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var tempFile = createTempFile("exe");

    new Downloader()
        .wizard(setupWizard)
        .url("https://origin-a.akamaihd.net/Origin-Client-Download/origin/live/OriginThinSetup.exe")
        .checksum("801d15504ac8bcac460c1658b5d22a13e51a51cf")
        .to(tempFile)
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
        .luna();

    wine.run(tempFile, [], null, false, true);

    // wait until Origin and Wine are closed
    wine.wait();

    // Origin installation has finished
    setupWizard.wait(tr("Please wait ..."));

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait(tr("Please wait ..."));

    wine.runInsidePrefix(wine.programFiles() + "/Origin/Origin.exe", ["origin://install/" + this._appId], false);

    setupWizard.wait(tr("Please wait until Origin has finished the download ..."));

    // close Origin
    wine.runInsidePrefix(wine.programFiles() + "/Origin/Origin.exe", "-shutdown", true);

    // back to generic wait
    setupWizard.wait(tr("Please wait ..."));

    // create shortcut after installation (if executable is specified, it does not exist earlier)
    this._createShortcut(wine.prefix());

    this._postInstall(wine, setupWizard);

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait(tr("Please wait ..."));

    setupWizard.close();
};
