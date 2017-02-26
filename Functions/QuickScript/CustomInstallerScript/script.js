include(["Functions", "QuickScript", "InstallerScript"]);

function CustomInstallerScript() {
    InstallerScript.call(this);
}

CustomInstallerScript.prototype = Object.create(InstallerScript.prototype);

CustomInstallerScript.prototype.constructor = CustomInstallerScript;

CustomInstallerScript.prototype.installationFile = function(installationFile) {
    this._installationFile = installationFile;
    return this;
};
