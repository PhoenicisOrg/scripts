const InstallerScript = include("engines.wine.quick_script.installer_script");
const Downloader = include("utils.functions.net.download");
const { createTempFile } = include("utils.functions.filesystem.files");

module.default = class OnlineInstallerScript extends InstallerScript {
    constructor() {
        super();

        this._installationArgs = [];
    }

    url(url) {
        this._url = url;
        return this;
    }

    checksum(checksum) {
        this._checksum = checksum;
        return this;
    }

    installationArgs(installationArgs) {
        if (typeof installationArgs === 'string' || installationArgs instanceof String) {
            this._installationArgs = [installationArgs];
        } else {
            this._installationArgs = installationArgs;
        }
        return this;
    }

    _installationCommand(wizard) {
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

        return { command: installationFile, args: this._installationArgs };
    }
}
