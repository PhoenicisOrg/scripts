include("engines.wine.engine.object");
include("engines.wine.plugins.override_dll");
include("engines.wine.verbs.sp3extract");

/**
 * Verb to install crypt32
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.crypt32 = function () {
    this.sp3extract("crypt32.dll");
    this.sp3extract("msasn1.dll");

    this.overrideDLL()
        .set("native, builtin", ["crypt32"])
        .do();
};

/**
 * Verb to install crypt32
 */
// eslint-disable-next-line no-unused-vars
class Crypt32Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "crypt32", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.crypt32();
        wizard.close();
    }
}
