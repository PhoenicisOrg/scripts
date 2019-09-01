const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2012
 */
class Vcrun2012 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url(
                "http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x86.exe"
            )
            .checksum("96b377a27ac5445328cbaae210fc4f0aaa750d3f")
            .name("vcredist_x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2012 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "http://download.microsoft.com/download/1/6/B/16B06F60-3B20-4FF2-B699-5E9B7962F9AE/VSU_4/vcredist_x64.exe"
                )
                .checksum("1a5d93dddbc431ab27b1da711cd3370891542797")
                .name("vcredist_x64")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2012 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        this.wine
            .overrideDLL()
            .set("native, builtin", ["atl110", "msvcp110", "msvcr110", "vcomp110"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2012", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2012(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2012;
