const Wine = include("engines.wine.engine.object");

const Optional = Java.type("java.util.Optional");

include("engines.wine.plugins.override_dll");
include("engines.wine.verbs.sp3extract");

/**
 * Verb to install crypt32
 */
class Crypt32Verb {
    constructor(wine) {
        this.wine = wine;
    }

    go() {
        this.wine.sp3extract("crypt32.dll");
        this.wine.sp3extract("msasn1.dll");

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

        new Crypt32Verb(wine).go();

        wizard.close();
    }
}

module.default = Crypt32Verb;
