const Wine = include("engines.wine.engine.object");
const { remove, lns } = include("utils.functions.filesystem.files");

const propertyReader = Bean("propertyReader");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install a sandbox
 */
class Sandbox {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const prefixDirectory = this.wine.prefixDirectory();

        const tmp = propertyReader.getProperty("application.user.tmp");
        const resources = propertyReader.getProperty("application.user.resources");

        remove(`${prefixDirectory}/dosdevices/z:`);
        remove(`${prefixDirectory}/dosdevices/y:`);

        lns(tmp, `${prefixDirectory}/dosdevices/z:`);
        lns(resources, `${prefixDirectory}/dosdevices/y:`);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "sandbox", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Sandbox(wine).go();

        wizard.close();
    }
}

module.default = Sandbox;
