include("engines.wine.engine.object");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * Verb to install atmlib
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.atmlib = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://ftp.gnome.org/mirror/archive/ftp.sunet.se/pub/security/vendor/microsoft/win2000/Service_Packs/usa/W2KSP4_EN.EXE")
        .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
        .name("W2ksp4_EN.exe")
        .get();

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    new CabExtract()
        .archive(this.system32directory() + "/i386/atmlib.dl_")
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    remove(this.system32directory() + "/i386/");

    return this;
};

/**
 * Verb to install atmlib
 */
// eslint-disable-next-line no-unused-vars
class AtmlibVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "atmlib", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.atmlib();
        wizard.close();
    }
}
