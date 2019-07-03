include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2015
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2015 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x86.exe")
        .checksum("bfb74e498c44d3a103ca3aa2831763fb417134d1")
        .name("vc_redist.x86.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2015 Redistributable (x86)"));
    this.run(setupFile32, "/q", null, false, true);

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x64.exe")
            .checksum("3155cb0f146b927fcc30647c1a904cd162548c8c")
            .name("vc_redist.x64.exe")
            .get();

        this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2015 Redistributable (x64)"));
        this.run(setupFile64, "/q", null, false, true);
    }

    var dlls = [
        "api-ms-win-crt-conio-l1-1-0",
        "api-ms-win-crt-heap-l1-1-0",
        "api-ms-win-crt-locale-l1-1-0",
        "api-ms-win-crt-math-l1-1-0",
        "api-ms-win-crt-runtime-l1-1-0",
        "api-ms-win-crt-stdio-l1-1-0",
        "api-ms-win-crt-time-l1-1-0",
        "atl140",
        "concrt140",
        "msvcp140",
        "msvcr140",
        "ucrtbase",
        "vcomp140",
        "vcruntime140"
    ];
    this.overrideDLL()
        .set("native, builtin", dlls)
        .do();

    return this;
};

/**
 * Verb to install vcrun2015
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2015Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2015", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2015();
        wizard.close();
    }
}
