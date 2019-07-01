include("engines.wine.engine.object");
include("utils.functions.net.resource");
include("utils.functions.filesystem.files");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2003
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2003 = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("https://sourceforge.net/projects/bzflag/files/bzedit%20win32/1.6.5/BZEditW32_1.6.5.exe")
        .checksum("bdd1b32c4202fd77e6513fd507c8236888b09121")
        .name("BZEditW32_1.6.5.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2003 Redistributable (x86)"));
    this.run(setupFile, "/S", null, false, true);

    var dlls = [
        "msvcp71",
        "mfc71"
    ];

    var that = this;
    dlls.forEach(function (dll) {
        cp(that.programFiles() + "/BZEdit1.6.5/" + dll, this.system32directory());
    });

    return this;
};

/**
 * Verb to install vcrun2003
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2003Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2003", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2003();
        wizard.close();
    }
}
