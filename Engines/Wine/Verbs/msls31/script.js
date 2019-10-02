const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install msls31.dll
 */
class Msls31 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("ftp://ftp.hp.com/pub/softlib/software/msi/InstMsiW.exe")
            .checksum("4fc3bf0dc96b5cf5ab26430fac1c33c5c50bd142")
            .name("InstMsiW.exe")
            .get();

        remove(`${system32directory}/msls31.dll`);

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(system32directory)
            .extract(["-F", "msls31.dll"]);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "msls31", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Msls31(wine).go();

        wizard.close();
    }
}

module.default = Msls31;
