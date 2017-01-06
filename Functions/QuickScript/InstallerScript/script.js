include(["Functions", "QuickScript", "QuickScript"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Shortcuts", "Wine"]);
include(["Functions", "Verbs", "luna"]);


function InstallerScript() {
    QuickScript.call(this);
}

InstallerScript.prototype = Object.create(QuickScript.prototype);

InstallerScript.prototype.constructor = InstallerScript;

InstallerScript.prototype.go = function() {
    var setupWizard = SetupWizard(this._name);

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    // get installation file from concrete InstallerScript implementation
    var installationFile = this._installationFile(setupWizard);

    var wine = new Wine()
        .wizard(setupWizard)
        .architecture(this._wineArchitecture)
        .version(this._wineVersion)
        .prefix(this._name)
        .luna()
        .wait();

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait("Please wait...");

    wine.run(installationFile)
        .wait();

    new WineShortcut()
        .name(this._name)
        .prefix(this._name)
        .search(this._executable)
        .arguments(this._executableArgs)
        .miniature([this._category, this._name])
        .create();

    this._postInstall(wine, setupWizard);

    // back to generic wait (might have been changed in postInstall)
    setupWizard.wait("Please wait...");

    setupWizard.close();
};
