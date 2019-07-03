include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2012
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2012 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe")
        .checksum("96b377a27ac5445328cbaae210fc4f0aaa750d3f")
        .name("vcredist_x86.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2012 Redistributable (x86)"));
    this.run(setupFile32, "/q", null, false, true);

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe")
            .checksum("1a5d93dddbc431ab27b1da711cd3370891542797")
            .name("vcredist_x64")
            .get();

        this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2012 Redistributable (x64)"));
        this.run(setupFile64, "/q", null, false, true);
    }

    var dlls = [
        "atl110",
        "msvcp110",
        "msvcr110",
        "vcomp110"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};

/**
 * Verb to install vcrun2012
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2012Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2012", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2012();
        wizard.close();
    }
}
