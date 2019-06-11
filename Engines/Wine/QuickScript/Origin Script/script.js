include("engines.wine.quick_script.quick_script");
include("utils.functions.net.download");
include("engines.wine.engine.object");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.luna");


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
        .to(tempFile)
        .get();

    var wine = new Wine()
        .wizard(setupWizard)
        .prefix(this._name, this._wineDistribution, this._wineArchitecture, this._wineVersion)
        .luna();

    //Origin does not have an install command
    setupWizard.message(tr("Download \"{0}\" in Origin and shut it down once \"{0}\" is installed", this._name));
    wine.run(tempFile, [], null, false, true);

    // wait until Origin and Wine are closed
    wine.wait();

    // Origin installation has finished
    setupWizard.wait(tr("Please wait..."));

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait(tr("Please wait..."));

    this._postInstall(wine, setupWizard);

    // create shortcut after installation (if executable is specified, it does not exist earlier)
    this._createShortcut(wine.prefix());

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait(tr("Please wait..."));

    setupWizard.close();
};
