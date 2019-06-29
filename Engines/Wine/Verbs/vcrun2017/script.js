include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2017
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2017 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("https://download.visualstudio.microsoft.com/download/pr/11100229/78c1e864d806e36f6035d80a0e80399e/VC_redist.x86.exe")
        .checksum("370583c380c26064885289037380af7d8d5f4e81")
        .name("vc_redist.x86.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2017 Redistributable (x86)"));
    this.run(setupFile32, "/q", null, false, true);

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("https://download.visualstudio.microsoft.com/download/pr/11100230/15ccb3f02745c7b206ad10373cbca89b/VC_redist.x64.exe")
            .checksum("bdb645ebaf3c91eceb1a143be6793ca57e6435c3")
            .name("vc_redist.x64.exe")
            .get();

        this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2017 Redistributable (x64)"));
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
 * Verb to install vcrun2017
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2017Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2017", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2017();
        wizard.close();
    }
}
