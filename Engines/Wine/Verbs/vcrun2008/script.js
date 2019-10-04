const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2008
 */
class Vcrun2008 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url("http://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x86.exe")
            .checksum("470640aa4bb7db8e69196b5edb0010933569e98d")
            .name("vcredist_x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2008 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/5/D/8/5D8C65CB-C849-4025-8E95-C3966CAFD8AE/vcredist_x64.exe"
                )
                .checksum("a7c83077b8a28d409e36316d2d7321fa0ccdb7e8")
                .name("vcredist_x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2008 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        new OverrideDLL(this.wine)
            .withMode("native, builtin", ["atl90", "msvcm90", "msvcp90", "msvcr90", "vcomp90"])
            .go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2008", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2008(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2008;
