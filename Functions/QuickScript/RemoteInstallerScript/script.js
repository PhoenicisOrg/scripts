include(["Functions", "QuickScript", "InstallerScript"]);
include(["Functions", "Net", "Download"]);


function RemoteInstallerScript() {
    InstallerScript.call(this);
}

RemoteInstallerScript.prototype = Object.create(InstallerScript.prototype);

RemoteInstallerScript.prototype.constructor = RemoteInstallerScript;

RemoteInstallerScript.prototype.url = function(url) {
    this._url = url;
    return this;
};

RemoteInstallerScript.prototype.checksum = function(checksum) {
    this._checksum = checksum;
    return this;
};

RemoteInstallerScript.prototype._installationFile = function(wizard) {
    var installationFile = createTempFile("exe");

    new Downloader()
        .wizard(wizard)
        .url(this._url)
        .checksum(this._checksum)
        .to(installationFile)
        .get();

    return installationFile;
};
