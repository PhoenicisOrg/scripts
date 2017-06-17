include(["Functions", "QuickScript", "InstallerScript"]);

function LocalInstallerScript() {
    InstallerScript.call(this);
    this._installationArgs = [];
}

LocalInstallerScript.prototype = Object.create(InstallerScript.prototype);

LocalInstallerScript.prototype.constructor = LocalInstallerScript;

LocalInstallerScript.prototype.installationArgs = function(installationArgs) {
    this._installationArgs = installationArgs;
    return this;
};

LocalInstallerScript.prototype.browseMessage = function(browseMessage) {
    this._browseMessage = browseMessage;
    return this;
};

LocalInstallerScript.prototype._installationCommand = function(wizard) {
    var browseMessage = this._browseMessage || tr("Please select the installation file.");
    var installationFile = wizard.browse(browseMessage);

    return {command: installationFile, args: this._installationArgs};
};
