const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
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
module.default = class Crypt32Verb {
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
