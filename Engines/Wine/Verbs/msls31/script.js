const Wine = include("engines.wine.engine.object");
const {LATEST_STABLE_VERSION, LATEST_DEVELOPMENT_VERSION, LATEST_STAGING_VERSION, LATEST_DOS_SUPPORT_VERSION} = include("engines.wine.engine.versions");
const Resource = include("utils.functions.net.resource");

/**
 * Verb to install msls31.dll
 *
 * @returns {Wine} Wine object
 */
Wine.prototype.msls31 = function () {
    var setupFile = new Resource()
        .wizard(this.wizard())
        .url("ftp://ftp.hp.com/pub/softlib/software/msi/InstMsiW.exe")
        .checksum("4fc3bf0dc96b5cf5ab26430fac1c33c5c50bd142")
        .name("InstMsiW.exe")
        .get();

    remove(this.system32directory() + "/msls31.dll");

    new CabExtract()
        .archive(setupFile)
        .wizard(this.wizard())
        .to(this.system32directory())
        .extract(["-F", "msls31.dll"]);

    return this;
};

/**
 * Verb to install msls31.dll
 */
// eslint-disable-next-line no-unused-vars
module.default = class Msls31Verb {
    constructor() {
        // do nothing
    }

    install(container) {
        var wine = new Wine();
        wine.prefix(container);
        var wizard = SetupWizard(InstallationType.VERBS, "msls31", java.util.Optional.empty());
        wine.wizard(wizard);
        wine.msls31();
        wizard.close();
    }
}
