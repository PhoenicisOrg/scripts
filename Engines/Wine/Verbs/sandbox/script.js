const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
const Resource = include("utils.functions.net.resource");

/**
 * Verb to install a sandbox
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.sandbox = function () {
    var tmp = Bean("propertyReader").getProperty("application.user.tmp");
    var resources = Bean("propertyReader").getProperty("application.user.resources");

    remove(this.prefixDirectory() + "/dosdevices/z:");
    remove(this.prefixDirectory() + "/dosdevices/y:");

    lns(tmp, this.prefixDirectory() + "/dosdevices/z:");
    lns(resources, this.prefixDirectory() + "/dosdevices/y:");

    return this;
};

/**
 * Verb to install a sandbox
 */
// eslint-disable-next-line no-unused-vars
module.default = class SandboxVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "sandbox", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.sandbox();
        wizard.close();
    }
}
