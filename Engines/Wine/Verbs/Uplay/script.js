include(["engines", "wine", "engine", "object"]);

Wine.prototype.uplay = function() {
    var setupFile = new Resource()
        .wizard(this._wizard)
        .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
        .name("UplayInstaller.exe")
        .get();

    this.run(setupFile)
        .wait(tr("Please follow the steps of the Uplay setup.\n\nUncheck \"Run Uplay\" or close Uplay completely after the setup so that the installation can continue."));

    return this;
};
