include("engines.wine.engine.object");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun6sp6
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun6sp6 = function () {
    var toBeCabExtracted = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/1/9/f/19fe4660-5792-4683-99e0-8d48c22eed74/Vs6sp6.exe")
        .checksum("2292437a8967349261c810ae8b456592eeb76620")
        .name("Vs6sp6.exe")
        .get();

    var setupFile = new CabExtract()
        .archive(toBeCabExtracted)
        .to(this.prefixDirectory() + "/drive_c/vcrun6sp6/")
        .extract(["-L", "-F", "vcredist.exe"]);

    remove(this.system32directory() + "comcat.dll");
    remove(this.system32directory() + "msvcrt.dll");
    remove(this.system32directory() + "oleaut32.dll");
    remove(this.system32directory() + "olepro32.dll");
    remove(this.system32directory() + "stdole2.dll");

    this.wizard().wait(tr("Please wait while {0} is installed...", "vcrun6sp6"));
    this.run(setupFile, "/q", null, false, true);

    return this;
};

/**
 * Verb to install vcrun6sp6
 */
// eslint-disable-next-line no-unused-vars
class Vcrun6SP6Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun6sp6", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun6sp6();
        wizard.close();
    }
}
