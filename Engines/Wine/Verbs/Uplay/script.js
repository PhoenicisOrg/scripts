const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install Uplay
 */
class Uplay {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("https://ubistatic3-a.akamaihd.net/orbit/launcher_installer/UplayInstaller.exe")
            .name("UplayInstaller.exe")
            .get();

        wizard.wait(
            tr(
                'Please follow the steps of the Uplay setup.\n\nUncheck "Run Uplay" or close Uplay completely after the setup so that the installation can continue.'
            )
        );

        this.wine.run(setupFile, [], null, false, true);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "uplay", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Uplay(wine).go();

        wizard.close();
    }
}

module.default = Uplay;
