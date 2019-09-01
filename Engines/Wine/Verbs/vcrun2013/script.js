const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2013
 */
class Vcrun2013 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url("http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x86.exe")
            .checksum("df7f0a73bfa077e483e51bfb97f5e2eceedfb6a3")
            .name("vcredist_x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2013 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "http://download.microsoft.com/download/2/E/6/2E61CFA4-993B-4DD4-91DA-3737CD5CD6E3/vcredist_x64.exe"
                )
                .checksum("8bf41ba9eef02d30635a10433817dbb6886da5a2")
                .name("vcredist_x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2013 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        this.wine
            .overrideDLL()
            .set("native, builtin", ["atl120", "msvcp120", "msvcr120", "vcomp120"])
            .do();
    }

    install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2013", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2013(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2013;
