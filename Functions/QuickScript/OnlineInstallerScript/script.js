include(["Functions", "QuickScript", "InstallerScript"]);
include(["Functions", "Net", "Download"]);


function OnlineInstallerScript() {
    InstallerScript.call(this);
}

OnlineInstallerScript.prototype = Object.create(InstallerScript.prototype);

OnlineInstallerScript.prototype.constructor = OnlineInstallerScript;

OnlineInstallerScript.prototype.url = function(url) {
    this._url = url;
    return this;
};

OnlineInstallerScript.prototype.checksum = function(checksum) {
    this._checksum = checksum;
    return this;
};

OnlineInstallerScript.prototype._installationCommand = function(wizard) {
    var installationFile = createTempFile("exe");

    // if no URL given, ask user
    if (!this._url) {
        this._url = wizard.textbox("Please select the download URL.");
    }

    new Downloader()
        .wizard(wizard)
        .url(this._url)
        .checksum(this._checksum)
        .to(installationFile)
        .get();

    return {command: installationFile, args: []};
};
