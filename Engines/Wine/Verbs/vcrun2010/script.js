const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2010
 */
class Vcrun2010 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile32 = new Resource()
            .wizard(wizard)
            .url("http://download.microsoft.com/download/5/B/C/5BC5DBB3-652D-4DCE-B14A-475AB85EEF6E/vcredist_x86.exe")
            .checksum("372d9c1670343d3fb252209ba210d4dc4d67d358")
            .name("vcredist_x86.exe")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2010 Redistributable (x86)"));

        this.wine.run(setupFile32, "/q", null, false, true);

        if (this.wine.architecture() == "amd64") {
            const setupFile64 = new Resource()
                .wizard(wizard)
                .url(
                    "http://download.microsoft.com/download/A/8/0/A80747C3-41BD-45DF-B505-E9710D2744E0/vcredist_x64.exe"
                )
                .checksum("027d0c2749ec5eb21b031f46aee14c905206f482")
                .name("vcredist_x64.exe")
                .get();

            wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2010 Redistributable (x64)"));

            this.wine.run(setupFile64, "/q", null, false, true);
        }

        this.wine
            .overrideDLL()
            .set("native, builtin", ["atl100", "msvcp100", "msvcr100", "vcomp100"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2010", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2010(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2010;
