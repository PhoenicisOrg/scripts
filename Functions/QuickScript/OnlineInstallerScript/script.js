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

OnlineInstallerScript.prototype._installationFile = function(wizard) {
    var installationFile = createTempFile("exe");

    new Downloader()
        .wizard(wizard)
        .url(this._url)
        .checksum(this._checksum)
        .to(installationFile)
        .get();

    return installationFile;
};
