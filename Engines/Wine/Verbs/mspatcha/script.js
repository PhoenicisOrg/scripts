include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");

/**
 * Verb to install mspatcha
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.mspatcha = function () {
    //Inspired from winetricks mspatcha, but with a link Phoenicis can understand
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://ftp.gnome.org/mirror/archive/ftp.sunet.se/pub/security/vendor/microsoft/win2000/Service_Packs/usa/W2KSP4_EN.EXE")
        .checksum("fadea6d94a014b039839fecc6e6a11c20afa4fa8")
        .name("W2ksp4_EN.exe")
        .get();

    remove(this.system32directory() + "/mspatcha.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    new CabExtract()
        .archive(this.system32directory() + "/i386/mspatcha.dl_")
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract();

    remove(this.system32directory() + "/i386/");

    this.overrideDLL()
        .set("native, builtin", ["mspatcha"])
        .do();

    return this;
};

/**
 * Verb to install mspatcha
 */
// eslint-disable-next-line no-unused-vars
class MspatchaVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "mspatcha", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.mspatcha();
        wizard.close();
    }
}
