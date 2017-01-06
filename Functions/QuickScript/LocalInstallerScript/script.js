include(["Functions", "QuickScript", "InstallerScript"]);

function LocalInstallerScript() {
    InstallerScript.call(this);
}

LocalInstallerScript.prototype = Object.create(InstallerScript.prototype);

LocalInstallerScript.prototype.constructor = LocalInstallerScript;

LocalInstallerScript.prototype._installationFile = function(wizard) {
    var installationFile = wizard.browse("Please select installation file.");
    return installationFile;
};
