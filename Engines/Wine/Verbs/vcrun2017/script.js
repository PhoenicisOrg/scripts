const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2017
 */
class Vcrun2017 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url(
                "https://download.visualstudio.microsoft.com/download/pr/11100229/78c1e864d806e36f6035d80a0e80399e/VC_redist.x86.exe"
            )
            .checksum("370583c380c26064885289037380af7d8d5f4e81")
            .name("vc_redist.x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2017 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.visualstudio.microsoft.com/download/pr/11100230/15ccb3f02745c7b206ad10373cbca89b/VC_redist.x64.exe"
                )
                .checksum("bdb645ebaf3c91eceb1a143be6793ca57e6435c3")
                .name("vc_redist.x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2017 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        this.wine
            .overrideDLL()
            .set("native, builtin", [
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
            ])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2017", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2017(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2017;
