const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install atmlib
 */
class Atmlib {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://ftp.gnome.org/mirror/archive/ftp.sunet.se/pub/security/vendor/microsoft/win2000/Service_Packs/usa/W2KSP4_EN.EXE"
            )
            .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
            .name("W2ksp4_EN.exe")
            .get();

        new CabExtract()
            .archive(setupFile)
            .wizard(wizard)
            .to(system32directory)
            .extract();

        new CabExtract()
            .archive(`${system32directory}/i386/atmlib.dl_`)
            .wizard(wizard)
            .to(system32directory)
            .extract();

        remove(`${system32directory}/i386/`);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "atmlib", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Atmlib(wine).go();

        wizard.close();
    }
}

module.default = Atmlib;
