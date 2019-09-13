const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install Nvidia PhysX
 */
class PhysX {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("http://uk.download.nvidia.com/Windows/9.14.0702/PhysX-9.14.0702-SystemSoftware.msi")
            .checksum("81e2d38e2356e807ad80cdf150ed5acfff839c8b")
            .name("PhysX-9.14.0702-SystemSoftware.msi")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "PhysX"));

        this.wine.run("msiexec", ["/i", setupFile, "/q"], null, false, true);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "physx", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new PhysX(wine).go();

        wizard.close();
    }
}

module.default = PhysX;
