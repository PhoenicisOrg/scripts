const InstallerScript = include("engines.wine.quick_script.installer_script");

module.default = class LocalInstallerScript extends InstallerScript {
    constructor() {
        super();

        this._installationArgs = [];
    }

    installationArgs(installationArgs) {
        if (typeof installationArgs === 'string' || installationArgs instanceof String) {
            this._installationArgs = [installationArgs];
        } else {
            this._installationArgs = installationArgs;
        }
        return this;
    }

    browseMessage(browseMessage) {
        this._browseMessage = browseMessage;
        return this;
    }

    _installationCommand(wizard) {
        const browseMessage = this._browseMessage || tr("Please select the installation file.");
        const installationFile = wizard.browse(browseMessage);

        return {
            command: installationFile,
            args: this._installationArgs
        };
    }
}
