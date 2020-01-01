const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");
const { CabExtract } = include("utils.functions.filesystem.extract");
const { remove } = include("utils.functions.filesystem.files");

const Optional = Java.type("java.util.Optional");

/**
 * Verb to install vcrun6sp6
 */
class Vcrun6SP6 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();
        const prefixDirectory = this.wine.prefixDirectory();
        const system32directory = this.wine.system32directory();

        const toBeCabExtracted = new Resource()
            .wizard(wizard)
            .url("https://download.microsoft.com/download/1/9/f/19fe4660-5792-4683-99e0-8d48c22eed74/Vs6sp6.exe")
            .checksum("2292437a8967349261c810ae8b456592eeb76620")
            .name("Vs6sp6.exe")
            .get();

        const setupFile = new CabExtract()
            .wizard(wizard)
            .archive(toBeCabExtracted)
            .to(`${prefixDirectory}/drive_c/vcrun6sp6/`)
            .extract(["-L", "-F", "vcredist.exe"]);

        remove(`${system32directory}/comcat.dll`);
        remove(`${system32directory}/msvcrt.dll`);
        remove(`${system32directory}/oleaut32.dll`);
        remove(`${system32directory}/olepro32.dll`);
        remove(`${system32directory}/stdole2.tlb`);

        wizard.wait(tr("Please wait while {0} is installed...", "vcrun6sp6"));

        this.wine.run(setupFile, "/q", null, false, true);
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun6sp6", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun6SP6(wine).go();

        wizard.close();
    }
}

module.default = Vcrun6SP6;
