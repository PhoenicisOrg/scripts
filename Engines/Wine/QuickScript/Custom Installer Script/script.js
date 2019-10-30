const InstallerScript = include("engines.wine.quick_script.installer_script");

module.default = class CustomInstallerScript extends InstallerScript {
    constructor() {
        super();
    }

    installationCommand(installationCommand) {
        this._installationCommand = installationCommand;
        return this;
    }
}
