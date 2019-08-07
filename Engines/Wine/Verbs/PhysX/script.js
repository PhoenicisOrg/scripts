const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
const Resource = include("utils.functions.net.resource");
include("engines.wine.verbs.luna");

/**
 * Verb to install Nvidia PhysX
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.physx = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("http://uk.download.nvidia.com/Windows/9.14.0702/PhysX-9.14.0702-SystemSoftware.msi")
        .checksum("81e2d38e2356e807ad80cdf150ed5acfff839c8b")
        .name("PhysX-9.14.0702-SystemSoftware.msi")
        .get();

    this.wizard().wait(tr("Please wait while {0} is installed...", "PhysX"));
    this.run("msiexec", ["/i", setupFile, "/q"], null, false, true);

    return this;
};

/**
 * Verb to install Nvidia PhysX
 */
// eslint-disable-next-line no-unused-vars
module.default = class PhysXVerb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "physx", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.physx();
        wizard.close();
    }
}
