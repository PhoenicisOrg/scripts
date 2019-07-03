include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install vcrun2013
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.vcrun2013 = function () {
    var setupFile32 = new Resource()
        .wizard(this.wizard())
        .url("http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe")
        .checksum("df7f0a73bfa077e483e51bfb97f5e2eceedfb6a3")
        .name("vcredist_x86.exe")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2013 Redistributable (x86)"));
    this.run(setupFile32, "/q", null, false, true);

    if (this.architecture() == "amd64") {
        var setupFile64 = new Resource()
            .wizard(this.wizard())
            .url("http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe")
            .checksum("8bf41ba9eef02d30635a10433817dbb6886da5a2")
            .name("vcredist_x64.exe")
            .get();

        this.wizard().wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2013 Redistributable (x64)"));
        this.run(setupFile64, "/q", null, false, true);
    }

    this.overrideDLL()
        .set("native, builtin", ["atl120", "msvcp120", "msvcr120", "vcomp120"])
        .do();

    return this;
};

/**
 * Verb to install vcrun2013
 */
// eslint-disable-next-line no-unused-vars
class Vcrun2013Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "vcrun2013", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.vcrun2013();
        wizard.close();
    }
}
