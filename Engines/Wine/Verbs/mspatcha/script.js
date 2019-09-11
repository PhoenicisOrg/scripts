const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install mspatcha
 */
class Mspatcha {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const system32directory = this.wine.system32directory();

        //Inspired from winetricks mspatcha, but with a link Phoenicis can understand
        const setupFile = new Resource()
            .wizard(wizard)
            .url(
                "https://ftp.gnome.org/mirror/archive/ftp.sunet.se/pub/security/vendor/microsoft/win2000/Service_Packs/usa/W2KSP4_EN.EXE"
            )
            .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
            .name("W2ksp4_EN.exe")
            .get();

        remove(`${system32directory}/mspatcha.dll`);

        new CabExtract()
            .wizard(wizard)
            .archive(setupFile)
            .to(system32directory)
            .extract();

        new CabExtract()
            .wizard(wizard)
            .archive(`${system32directory}/i386/mspatcha.dl_`)
            .to(system32directory)
            .extract();

        remove(`${system32directory}/i386/`);

        this.wine
            .overrideDLL()
            .set("native, builtin", ["mspatcha"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "mspatcha", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Mspatcha(wine).go();

        wizard.close();
    }
}

module.default = Mspatcha;
