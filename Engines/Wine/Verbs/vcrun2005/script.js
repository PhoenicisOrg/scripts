const Wine = include("engines.wine.engine.object");
const Resource = include("utils.functions.net.resource");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");

/**
 * Verb to install vcrun2005
 */
class Vcrun2005 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        const wizard = this.wine.wizard();

        const setupFile = new Resource()
            .wizard(wizard)
            .url("http://download.microsoft.com/download/8/B/4/8B42259F-5D70-43F4-AC2E-4B208FD8D66A/vcredist_x86.EXE")
            .checksum("b8fab0bb7f62a24ddfe77b19cd9a1451abd7b847")
            .name("vcredist_x86.EXE")
            .get();

        wizard.wait(tr("Please wait while {0} is installed...", "Microsoft Visual C++ 2005 Redistributable (x86)"));

        this.wine.run(setupFile, "/q", null, false, true);

        this.wine
            .overrideDLL()
            .set("native, builtin", ["atl80", "msvcm80", "msvcp80", "msvcr80", "vcomp"])
            .do();
    }

    install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "vcrun2005", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Vcrun2005(wine).go();

        wizard.close();
    }
}

module.default = Vcrun2005;
