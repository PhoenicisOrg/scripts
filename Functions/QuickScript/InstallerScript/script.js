include(["Functions", "QuickScript", "QuickScript"]);
include(["Functions", "Engines", "Wine"]);
include(["Functions", "Filesystem", "Extract"]);
include(["Functions", "Filesystem", "Files"]);
include(["Functions", "Shortcuts", "Wine"]);
include(["Functions", "Verbs", "luna"]);


function InstallerScript() {
    QuickScript.call(this);
}

InstallerScript.prototype = Object.create(QuickScript.prototype);

InstallerScript.prototype.constructor = InstallerScript;

InstallerScript.prototype.go = function() {
    this._name = this._name || "Custom Installer";
    var setupWizard = SetupWizard(this._name);

    // if no name given, ask user
    if (this._name == "Custom Installer") {
        this._name = setupWizard.textbox("Please enter the name of your application.");
    }

    setupWizard.presentation(this._name, this._editor, this._applicationHomepage, this._author);

    // get installation file from concrete InstallerScript implementation
    var installationFile = this._installationFile(setupWizard);

    var wine = new Wine()
        .wizard(setupWizard);

    // let user select wine settings if desired
    if (this._wineUserSettings) {
        this._wineArchitecture = setupWizard.menu("Please select the wine architecture.", ["x86", "amd64"]);
        wine.architecture(this._wineArchitecture); // do this here to show correct values for distribution
        this._wineDistribution = setupWizard.menu("Please select the wine distribution.", wine.availableDistributions());
        wine.distribution(this._wineDistribution); // do this here to show correct values for version
        this._wineVersion = setupWizard.menu("Please select the wine version.", wine.availableVersions());
        this._wineWindowsVersion = setupWizard.menu("Please select the wine windows version.", ["win7", "vista", "win2003", "winxp", "win2k", "winnt", "winme", "win98", "win95", "win31"]);
    }

    // setup the prefix
    wine.architecture(this._wineArchitecture)
        .distribution(this._wineDistribution)
        .version(this._wineVersion)
        .prefix(this._name) // important that architecture, distribution and version are before this!
        .windowsVersion(this._wineWindowsVersion) // must be done after prefix()
        .luna()
        .wait();

    this._preInstall(wine, setupWizard);

    // back to generic wait (might have been changed in preInstall)
    setupWizard.wait("Please wait...");

    wine.run(installationFile)
        .wait();

    // if no executable given, ask user
    if (!this._executable) {
        this._executable = fileName(setupWizard.browse("Please select the executable.", wine.prefixDirectory, ["exe"]));
    }

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
