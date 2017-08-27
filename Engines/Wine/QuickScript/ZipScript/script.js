include(["Engines", "Wine", "QuickScript", "QuickScript"]);
include(["Utils", "Functions", "Net", "Download"]);
include(["Engines", "Wine", "Engine", "Object"]);
include(["Utils", "Functions", "Filesystem", "Extract"]);
include(["Engines", "Wine", "Shortcuts", "Wine"]);
include(["Engines", "Wine", "Verbs", "luna"]);


function ZipScript() {
    QuickScript.call(this);
}

ZipScript.prototype = Object.create(QuickScript.prototype);

ZipScript.prototype.constructor = ZipScript;   

ZipScript.prototype.url = function(url) {
    this._url = url;
    return this;
};

ZipScript.prototype.checksum = function(checksum) {
    this._checksum = checksum;
    return this;
};

ZipScript.prototype.go = function() {
    var appsManager = Bean("repositoryManager");
    var application = appsManager.getApplication([this._type, this._category, this._name]);
    var setupWizard = SetupWizard(InstallationType.APPS, this._name, application.getMainMiniature());

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    var wine = new Wine()
        .wizard(setupWizard)
        .architecture(this._wineArchitecture)
        .version(this._wineVersion)
        .prefix(this._name)
        .distribution("upstream")
        .create()
        .luna()
        .wait();

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait(tr("Please wait ..."));

    new Downloader()
        .wizard(setupWizard)
        .url(this._url)
        .checksum(this._checksum)
        .to(wine.prefixDirectory + "/drive_c/archive.zip")
        .get();

    new Extractor()
        .wizard(setupWizard)
        .archive(wine.prefixDirectory + "/drive_c/archive.zip")
        .to(wine.prefixDirectory + "/drive_c/" + this._name)
        .extract();

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

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait(tr("Please wait ..."));

    setupWizard.close();
};
