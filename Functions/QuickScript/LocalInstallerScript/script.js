include(["Functions", "QuickScript", "InstallerScript"]);

function LocalInstallerScript() {
    InstallerScript.call(this);
}

LocalInstallerScript.prototype = Object.create(InstallerScript.prototype);

LocalInstallerScript.prototype.constructor = LocalInstallerScript;

LocalInstallerScript.prototype.browseMessage = function(browseMessage) {
    this._browseMessage = browseMessage;
    return this;
};

LocalInstallerScript.prototype._installationFile = function(wizard) {
    var browseMessage = this._browseMessage || "Please select the installation file.";
    var installationFile = wizard.browse(browseMessage);
    return installationFile;
};
