include("engines.wine.engine.object");
include("utils.functions.net.resource");

/**
 * Verb to install Uplay
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.uplay = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
        .name("UplayInstaller.exe")
        .get();

    this.wizard().wait(tr("Please follow the steps of the Uplay setup.\n\nUncheck \"Run Uplay\" or close Uplay completely after the setup so that the installation can continue."));
    this.run(setupFile, [], null, false, true);

    return this;
};

/**
 * Verb to install Uplay
 */
// eslint-disable-next-line no-unused-vars
class UplayVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "uplay", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.uplay();
        wizard.close();
    }
}
