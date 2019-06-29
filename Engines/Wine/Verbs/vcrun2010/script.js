include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2010
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2010 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/5/B/C/5BC5DBB3-652D-4DCE-B14A-475AB85EEF6E/vcredist_x86.exe")
        .checksum("372d9c1670343d3fb252209ba210d4dc4d67d358")
        .name("vcredist_x86.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2010 Redistributable (x86)"));
    this.run(setupFile32, "/q", null, false, true);

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("http://download.microsoft.com/download/A/8/0/A80747C3-41BD-45DF-B505-E9710D2744E0/vcredist_x64.exe")
            .checksum("027d0c2749ec5eb21b031f46aee14c905206f482")
            .name("vcredist_x64.exe")
            .get();

        this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2010 Redistributable (x64)"));
        this.run(setupFile64, "/q", null, false, true);
    }

    var dlls = [
        "atl100",
        "msvcp100",
        "msvcr100",
        "vcomp100",
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};

/**
 * Verb to install vcrun2010
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2010Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2010", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2010();
        wizard.close();
    }
}
