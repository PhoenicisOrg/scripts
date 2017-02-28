include(["Functions", "Functions", "QuickScript", "InstallerScript"]);

function CustomInstallerScript() {
    InstallerScript.call(this);
}

CustomInstallerScript.prototype = Object.create(InstallerScript.prototype);

CustomInstallerScript.prototype.constructor = CustomInstallerScript;

CustomInstallerScript.prototype.installationCommand = function(installationCommand) {
    this._installationCommand = installationCommand;
    return this;
};
