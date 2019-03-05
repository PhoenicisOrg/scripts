include("engines.wine.quick_script.installer_script");
include("utils.functions.net.download");


function OnlineInstallerScript() {
    InstallerScript.call(this);
    this._installationArgs = [];
}

OnlineInstallerScript.prototype = Object.create(InstallerScript.prototype);

OnlineInstallerScript.prototype.constructor = OnlineInstallerScript;

OnlineInstallerScript.prototype.url = function (url) {
    this._url = url;
    return this;
};

OnlineInstallerScript.prototype.checksum = function (checksum) {
    this._checksum = checksum;
    return this;
};

OnlineInstallerScript.prototype.installationArgs = function (installationArgs) {
    if (typeof installationArgs === 'string' || installationArgs instanceof String) {
        this._installationArgs = [installationArgs];
    } else {
        this._installationArgs = installationArgs;
    }
    return this;
};

OnlineInstallerScript.prototype._installationCommand = function (wizard) {
    // if no URL given, ask user
    if (!this._url) {
        this._url = wizard.textbox(tr("Please select the download URL."));
    }

    // get correct extension depending on URL
    var extension = this._url.split('.').pop();
    var installationFile = createTempFile(extension);

    new Downloader()
        .wizard(wizard)
        .url(this._url)
        .checksum(this._checksum)
        .to(installationFile)
        .get();

    return {command: installationFile, args: this._installationArgs};
};
