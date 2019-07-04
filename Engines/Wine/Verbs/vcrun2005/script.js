include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2005
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2005 = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.EXE")
        .checksum("b8fab0bb7f62a24ddfe77b19cd9a1451abd7b847")
        .name("vcredist_x86.EXE")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2005 Redistributable (x86)"));
    this.run(setupFile, "/q", null, false, true);

    var dlls = [
        "atl80",
        "msvcm80",
        "msvcp80",
        "msvcr80",
        "vcomp"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};

/**
 * Verb to install vcrun2005
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2005Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2005", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2005();
        wizard.close();
    }
}
