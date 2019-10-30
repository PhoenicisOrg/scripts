const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

const OverrideDLL = include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2015
 */
class Vcrun2015 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url("https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x86.exe")
            .checksum("bfb74e498c44d3a103ca3aa2831763fb417134d1")
            .name("vc_redist.x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2015 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "https://download.microsoft.com/download/9/3/F/93FCF1E7-E6A4-478B-96E7-D4B285925B00/vc_redist.x64.exe"
                )
                .checksum("3155cb0f146b927fcc30647c1a904cd162548c8c")
                .name("vc_redist.x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2015 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        new OverrideDLL(this.wine)
            .withMode("native, builtin", [
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
            .go();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2015", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2015(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2015;
