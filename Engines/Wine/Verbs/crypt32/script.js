const Wine = include("engines.wine.engine.object");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
const WindowsXPSP3 = include("engines.wine.verbs.sp3extract");

/**
 * Verb to install crypt32
 */
class Crypt32 {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        new WindowsXPSP3(this.wine).withFileToExtract("crypt32.dll").go();
        new WindowsXPSP3(this.wine).withFileToExtract("msasn1.dll").go();

        this.wine
            .overrideDLL()
            .set("native, builtin", ["crypt32"])
            .do();
    }

    static install(container) {
        const wine = new Wine();
        const wizard = SetupWizard(InstallationType.VERBS, "crypt32", Optional.empty());

        wine.prefix(container);
        wine.wizard(wizard);

        new Crypt32(wine).go();

        wizard.close();
    }
}

module.default = Crypt32;
